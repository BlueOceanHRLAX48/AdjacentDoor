const pool = require('../../database');

module.exports = {
  getUser: (req, res) => {
    let { id } = req.params
    let userStr =
    `select
    user_id, firstName, lastName, username,
    network_id, email, admin, city, state,
    zip, privacy, profile_img, contribution,
    (select json_build_object('id', id, 'name', name)
    from default_groups
    where default_groups.id = user_account.default_groupID) as default_group
    from user_account where network_id = $1;`

    let userGroup =
    `select user_groups.id, user_groups.name, user_group_list.accepted
    from user_groups
    join user_group_list on user_group_list.user_group_id = user_groups.id
    left join user_account on user_group_list.network_id = user_account.network_id
    where user_account.network_id = $1;
    ;`

    let promiseQuery = [pool.query(userStr, [id]), pool.query(userGroup, [id])]

    Promise.all(promiseQuery)
      .then((result) => {
        let userInfo = result[0].rows[0]
        let groupRes = result[1].rows

        userInfo.user_group = groupRes

        res.json(userInfo)
      })
    .catch((err)=> res.status(500).send('Could not find user'))
  },

  createUser: async (req, res) => {
    let {
      firstName,
      lastName,
      username,
      email,
      network_id,
      admin,
      city,
      state,
      zip,
      privacy,
      profile_img
    } = req.body

    let groupParams = [ city, city, state, zip]

    let findDefault =
    `select id from default_groups
    where zip = $1`

    let newDefault =
    `insert into default_groups(
      name,
      city,
      state,
      zip,
      photo
      ) values($1, $2, $3, $4,'https://www.placebear.com/200/300' )
      returning id`

    let groupRes = await pool.query(findDefault, [zip])

    let groupId;

    if (!groupRes.rows.length) {
      let newGroupRes = await pool.query(newDefault, groupParams)
      groupId = newGroupRes.rows[0].id
    } else {
      groupId = groupRes.rows[0].id
    }

    let adminValue = admin || false;

    let userParams = [
      firstName,
      lastName,
      username,
      email,
      network_id,
      adminValue,
      city,
      state,
      zip,
      privacy,
      profile_img,
      groupId
    ]

    let createStr =
    `insert into user_account(
      firstName, lastName, username,
      email, network_id, admin,
      city, state, zip, privacy, profile_img,
      default_groupID)
      values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      `

    pool.query(createStr, userParams)
     .then((result) => res.status(201).send('Your account has been created'))
     .catch(err => console.log(err))
  },

  globalUserScore: (req, res) => {
    let { count } = req.query

    let globalStr =
    `select
    user_id, firstName, lastName, username,
    network_id, email, admin, city, state,
    zip, privacy, profile_img, contribution,
    (select json_build_object('id', id, 'name', name)
    from default_groups
    where default_groups.id = user_account.default_groupID) as default_group
    from user_account ORDER BY contribution DESC LIMIT $1;`

    pool.query(globalStr, [count])
      .then(result=> res.json(result.rows))
      .catch(err => res.status(500).send('Could not get all global scores'))
  },

  localUserScore: (req, res) => {
    let { count } = req.query
    let { zip } = req.params

    let globalStr =
    `select
    user_id, firstName, lastName, username,
    network_id, email, admin, city, state,
    zip, privacy, profile_img, contribution,
    (select json_build_object('id', id, 'name', name)
    from default_groups
    where default_groups.id = user_account.default_groupID) as default_group
    from user_account where zip = $1 ORDER BY contribution DESC LIMIT $2;`

    pool.query(globalStr, [zip, count])
      .then(result=> res.json(result.rows))
      .catch(err => res.status(500).send('Could not get all local scores'))
  },

  getLeaderBoardByUserGroup: async (req, res) => {
    let { count } = req.query

    let { user_group_id } = req.params

    let getUsers =
    `select array_agg(network_id) as id from user_group_list where user_group_id = $1 and accepted = true;`

    let userList = await pool.query(getUsers, [user_group_id])

    let array = userList.rows[0].id
    let promiseQ = []

    let getScores =
    `select
    user_id, firstName, lastName, username,
    network_id, email, admin, city, state,
    zip, privacy, profile_img, contribution,
    (select json_build_object('id', id, 'name', name)
    from default_groups
    where default_groups.id = user_account.default_groupID) as default_group
    from user_account where network_id = $1 ORDER BY contribution DESC LIMIT $2`

    if (!array.length) {
      res.status(500).send('Could not find users in this group')
    } else {
      array.forEach(id => promiseQ.push(pool.query(getScores, [id, count])))
    }

    Promise.all(promiseQ)
      .then(result => {
        let userArray = result[0].rows
        if (result.length > 1) {
          for (var i=1; i < result.length ; i++) {
            userArray.push(result[i].rows[0])
          }
        }
        res.json(userArray)
      })
      .catch(err => res.status(500).send('Error getting a user score'))
  },


  getAllUsersBasedOnLocation: (req, res) => {
    let { zip } = req.params

    let getAll =
    `select
    user_id, firstName, lastName, username,
    network_id, email, admin, city, state,
    zip, privacy, profile_img, contribution
    from user_account where zip = $1;`

    pool.query(getAll, [zip])
      .then(result => res.json(result.rows))
      .catch(err => res.status(500).send('Could not get all users'))
  },

  getAllUsersBasedOnGroup: async (req, res) => {
    let { user_group_id } = req.params

    let getUserId =
    `select array_agg(network_id) as id from user_group_list where user_group_id = $1 and accepted = true;`

    let userList = await pool.query(getUserId, [user_group_id])

    let array = userList.rows[0].id

    let promiseQ = []

    let getUsers =
    `select
    user_id, firstName, lastName, username,
    network_id, email, admin, city, state,
    zip, privacy, profile_img, contribution,
    (select json_build_object('id', id, 'name', name)
    from default_groups
    where default_groups.id = user_account.default_groupID) as default_group
    from user_account where network_id = $1`

    if (!array.length) {
      res.status(500).send('Could not find users in this group')
    } else {
      array.forEach(id => promiseQ.push(pool.query(getUsers, [id])))
    }

    Promise.all(promiseQ)
      .then(result => {
        let userArray = result[0].rows
        if (result.length > 1) {
          for (var i=1; i < result.length ; i++) {
            userArray.push(result[i].rows[0])
          }
        }
        res.json(userArray)
      })
      .catch(err => res.status(500).send('Error getting all users'))
  },

  updatePhoto: (req, res) => {
    let photo = req.body.photo
    let { id } = req.params

    let photoStr = `
      update user_account set profile_img = $1
      where network_id = $2;
    `
    pool.query(photoStr, [photo, id])
      .then(result => res.status(201).send('Profile photo updated'))
      .catch(err => res.status(500).send('Could not update photo'))
  },

  updateLocation: async (req, res) => {
    let { id } = req.params
    let locationParams = [req.body.city,  req.body.state,  req.body.zip, id ]

    let locationStr =
    `update user_account set city = $1, state = $2, zip= $3 where network_id = $4;`

    await pool.query(locationStr, locationParams)
      .catch(err => res.status(500).send('Could not update your location'))

    let findDefault =
    `select id from default_groups
    where zip = $1;`

    let newDefault =
    `insert into default_groups(
      name,
      city,
      state,
      zip,
      photo
      ) values($1, $2, $3, $4, 'https://www.placebear.com/200/300')
      returning id;`

    let groupRes = await pool.query(findDefault, [req.body.zip])

    let groupId;

    if (!groupRes.rows.length) {
      let newGroupRes = await pool.query(newDefault, [req.body.city, req.body.city, req.body.state, req.body.zip])
      groupId = newGroupRes.rows[0].id
    } else {
      groupId = groupRes.rows[0].id
    }

    let changeDefaultGroup =
    `update user_account set default_groupID = $1 where network_id = $2;`

    pool.query(changeDefaultGroup, [groupId, id])
      .then(result => res.status(201).send('Your Default Group has been changed'))
      .catch(err => res.status(500).send('Could not update your Default Group'))
  },

  incrementContribution: (req, res) => {
    let { id } = req.params
    let scoreStr =
    `update user_account set contribution = contribution + 1
      where network_id = $1;
    `
    pool.query(scoreStr , [id])
      .then(result => res.status(201).send('Score has been updated'))
      .catch(err => res.status(500).send('Could not update score'))
  },

  decrementContribution: (req, res) => {
    let { id } = req.params
    let scoreStr =
    `update user_account set contribution = contribution - 1
      where network_id = $1;
    `
    pool.query(scoreStr , [id])
      .then(result => res.status(201).send('Score has been updated'))
      .catch(err => res.status(500).send('Could not update score'))
  },

  deleteUser: (req, res) => {
    let { id } = req.params
    let deleteStr =
    `delete from user_account where network_id = $1;`

    pool.query(deleteStr, [id])
      .then(result => res.status(201).send('Your account has been deleted'))
      .catch(err => res.status(500).send('Error deleting account'))
  },

  displayName: (req, res) => {
    let { id } = req.params
    let { username } = req.body

    let nicknameStr =
    `update user_account set username = $1
      where network_id = $2;
    `
    pool.query(nicknameStr , [username, id ])
      .then(result => res.status(201).send('Display name has been updated'))
      .catch(err => res.status(500).send('Error updating nickname'))
  },

  updatePrivacy: (req, res) => {
    let { id } = req.params

    let privacyStr =
    `update user_account set privacy = not privacy where network_id = $1`

    pool.query(privacyStr, [id])
      .then(result=> res.status(201).send('Your privacy setting has been changed'))
      .catch(err => res.status(500).send('Could not update privacy'))
  }
}