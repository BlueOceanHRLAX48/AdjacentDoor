const express = require('express');
const cors = require('cors')
const router = require('./router/route')

const port = process.env.PORT || 3001;

const app = express();
// const app2 = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors())

//localhost:3001/home
app.use('/users', router);
app.use('/groups/', router);
app.use('/posts', router);

//app2.use()

/**
 *
 * user -> everything user info in user_account + what groups they are apart of -> component that shows all their groups
 * user selects a specific group -> get request on that group_id -> all the information from users_groups + all the users in that group
 * {
 * users....
 * groups: {groupId: groupName, groupID: groupName} -> [...groupIds] or [...groupNames]
 * }
 *
 *
 */


app.listen(port, () => {
  console.log('listening on ', port)
})

// app2.listen(port + 2, () => {
//   console.log('listening on ', port + 2)
// })
