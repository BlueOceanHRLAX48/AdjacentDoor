const pool = require('../../database/index.js');

module.exports = {
  getUser: (req, res) => {
    let { id } = req.params

    let userStr =
    `select
    user_id, firstName, lastName,
    network_id, email, admin, address, city, state,
    zip, privacy, profile_img, contribution,
    (select json_build_object('id', id, 'name', name)
    from default_groups
    where default_groups.id = user_account.default_groupID) as default_group
    from user_account where network_id = $1;`

    let userGroup =
    `select user_groups.id, user_groups.name
    from user_groups
    join user_group_list on user_group_list.user_group_id = user_groups.id
    left join user_account on user_group_list.network_id = user_account.network_id
    where user_account.network_id = $1
    ;`

    let promiseQuery = [pool.query(userStr, [id]), pool.query(userGroup, [id])]

    Promise.all(promiseQuery)
      .then((result) => {
        let userInfo = result[0].rows[0]
        let groupRes = result[1].rows

        userInfo.user_group = groupRes

        res.json(userInfo)
      })
      .catch((err)=> res.status(500).send(err))
  },

  createUser: async (req, res) => {
    let {
      firstName,
      lastName,
      username,
      email,
      network_id,
      admin,
      address,
      city,
      state,
      zip,
      privacy,
      profile_img
    } = req.body

    let groupParams = [
      city,
      city,
      state,
      zip,
    ]


    let findDefault =
    `select id from default_groups
    where zip = $1`

    let newDefault =
    `insert into default_groups(
      name,
      city,
      state,
      zip,
      photo,
      safety,
      friendliness
      ) values($1)`

    let groupRes = await pool.query(findDefault, [zip])

    let groupId;

    if (!groupRes.rows.length) {
      pool.query(newDefault, [zip])
        .then(result => groupId = result.rows[0].id)
    } else {
      groupId = groupRes.rows[0].id
    }


    console.log(groupId)


    let createStr =
    `insert into user_account values(
      firstName, lastName, username,
      email, network_id, admin, address,
      city, state, zip, privacy, profile_img,
      default_groupID
    )`

    // pool.query(createStr)
    //  .then((res) => res.status(201).send('account created'))
    //  .catch(err => res.status(500).send('could not create account'))
  },

  updatePhoto: (req, res) => {
    let photo = req.params.photo
    let id = req.params.network_id
    let photoStr = `
      update user_account set profile_img = $1
      where network_id = $2;
    `
    pool.query(photoStr, [photo, id])
      .then(res => res.status(201).send('updated photo'))
      .catch(err => res.status(500).send('could not update photo'))
  },

  updateLocation: (req, res) => {

  },

  updateContribution: (req, res) => {
    let { id } = req.params
    let scoreStr =
    `update user_account set contribution = contribution + 1
      where network_id = $1;
    `
    pool.query(scoreStr , [id])
      .then(res => res.status(201).send('updated score'))
      .catch(err => res.status(500).send('did not update score'))
  },

  deleteUser: (req, res) => {
    let { id } = req.params
    let deleteStr =
    `delete user_account where network_id = $1;`

    pool.query(deleteStr, [id])
      .then(res => res.status(201).send('deleted acount'))
      .catch(err => res.status(500).send('error deleting account'))
  },

  updateNickname: (req, res) => {
    let { id } = req.params
    let { nickname } = req.params

    let nicknameStr =
    `update user_account set nickname = $1
      where network_id = $2;
    `
    pool.query(nicknameStr , [id, nickname ])
      .then(res => res.status(201).send('nickname updated'))
      .catch(err => res.status(500).send('error updating nickname'))
  }
}