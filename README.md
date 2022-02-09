# Blue Ocean AdjacentDoor Application

## About The Project
AdjacentDoor is a mobile/web application for users to connect to the neighborhoods and receive information relative to the safety, sells, and everything they are interested in.

## Installation

1. Get a free API Key/Token at
* [REACT_APP_GOOGLE_CLIENT_ID: https://console.developers.google.com/](https://console.developers.google.com/)
* [REACT_APP_MAPBOX_APP_TOKEN: https://account.mapbox.com/access-tokens/](https://account.mapbox.com/access-tokens/)
* [REACT_APP_CLOUDINARY/REACT_APP_CLOUDINARY_PRESET: https://cloudinary.com/](https://cloudinary.com/)

2. Clone the repo

   ```sh
   git clone https://github.com/your_username/AdjacentDoor.git
   ```
3. Install NPM packages

   ```sh
   npm install
   ```
4. Enter your API Key/Token in `.env`
5. Run webpack

   ```sh
   npm start
   ```
6. Connect to server and database

   ```sh
   npm run server
   ```

## Component Details

### Login
Users can log in through their Google account.
![Login](https://user-images.githubusercontent.com/91348196/152655974-c95771d2-7bfb-45d5-8e39-2a1a0e74ed9e.gif)

### Post
Users can post in private groups or public groups with photo upload capabilities.
![Posts](https://user-images.githubusercontent.com/91348196/152655977-35ef9875-46c0-4b07-bec4-fe5b05b44588.gif)

### Comment
Users can comment on a post.
![Comment](https://user-images.githubusercontent.com/91348196/152655983-cfd0eab8-d220-420e-be5a-cbdbd577cb11.gif)

### Like/Share
Users can like or share posts.
![Share](https://user-images.githubusercontent.com/91348196/152655991-827cff20-e4d3-40a3-94ed-8bfc3621a210.gif)

### Group
Users can search groups within a certain distance.
![Group (1)](https://user-images.githubusercontent.com/91348196/152656648-0370c1f8-8479-40c0-8388-f47553625eea.gif)

### Map
View postings based on a map.
![Map (3)](https://user-images.githubusercontent.com/91348196/152657504-1fb71b5b-ac4f-428a-9bb2-dd28c83eff64.gif)

### Create Group
Users can create groups and join groups.
![Create group1](https://user-images.githubusercontent.com/91348196/152656633-517cd1cf-b8d5-4715-986c-5bee4ea2c908.gif)
![Create group2 (2)](https://user-images.githubusercontent.com/91348196/152656854-6aa6ced7-1563-4a4b-b13c-74b669d1d6fb.gif)
![Create group3](https://user-images.githubusercontent.com/91348196/152656858-e4b4bc0d-480c-4e33-b853-4b7544c09167.gif)

### Search
Users can search the posts or groups they are interested in.
![Search](https://user-images.githubusercontent.com/91348196/152656002-5083c069-45bd-4fe4-9df3-b55b0d147b1b.gif)

### Leaderboard
Users are able to view their contribution scores which are based on the quality and quantity of the posts.
![Leaderboard](https://user-images.githubusercontent.com/91348196/152656004-5c335e62-ddc4-48b6-89d7-7649a16cb9fc.gif)


## Mobile Mode
<p float="left">
  <img width="200" alt="Signup" src="https://user-images.githubusercontent.com/91348196/152653759-a3c00654-f5b5-434a-9e9e-0cc031bb9d14.png">
  <img width="200" alt="Login" src="https://user-images.githubusercontent.com/91348196/152653954-e55f60ad-f69d-4b7b-9c6e-245b293876d4.png">
  <img width="200" alt="Navbar" src="https://user-images.githubusercontent.com/91348196/152653773-5f59919c-ad6f-46b5-a2fc-582973f37c41.png">
  <img width="200" alt="Post" src="https://user-images.githubusercontent.com/91348196/152654109-809f18f7-da92-4622-b24c-ea9ef262ea38.png">
  <img width="200" alt="AddPost" src="https://user-images.githubusercontent.com/91348196/152653784-e03ae2ca-4f49-49a3-a756-8a101d43d702.png">
  <img width="200" alt="GroupList" src="https://user-images.githubusercontent.com/91348196/152653789-c135bfde-ef42-4763-8e49-cd0b917d1254.png">
  <img width="200" alt="Group" src="https://user-images.githubusercontent.com/91348196/152653791-4f5f8e11-98a6-4691-bd90-12cd296921e8.png">
  <img width="200" alt="Map" src="https://user-images.githubusercontent.com/91348196/152654114-7d9d3134-7eb7-4ced-a6e7-c767257dc091.png">
</p>

## Technologies

* [React](https://reactjs.org/)
* [Node](https://nodejs.dev/)
* [ExpressJS](https://expressjs.com/)
* [PostgreSQL](https://www.postgresql.org/)
* [Webpack](https://webpack.js.org/)
* [AWS]()
* [MUI](https://mui.com/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Moment.js](https://momentjs.com/)
* [Grafana k6](https://k6.io/)

## Endpoints
<details>
  <summary>View Users Endpoints</summary>

`GET: /user/:id` Retrieve single user's information
| Parameter | Type  | Description                           |
| ----------| ------| --------------------------------------|
| id        | text  | Required network ID of user           |

`GET: /:zip/users` Retrieve all users' information in a default group
| Parameter | Type     | Description                    |
| ----------| ---------| -------------------------------|
| zip       | integer  | Required zip for default group |

`GET: /user_group/users/:user_group_id` Retrieve all users' information in a user group
| Parameter           | Type     | Description                    |
| --------------------| ---------| -------------------------------|
| user_group_id       | integer  | Required ID for user group     |

`POST: /user/signup` New user signup
| Body Parameter  | Type    | Description            |
| ----------------| --------| -----------------------|
| firstName       | text    | first name for user    |
| lastName        | text    | last name for user     |
| username        | text    | display name for user  |
| email           | text    | Email address for user |
| network_id      | text    | Unique ID for user     |
| admin           | boolean | Default false          |
| city            | text    | city                   |
| state           | text    | state                  |
| zip             | text    | zipcode                |
| privacy         | boolean | Default false          |
| profile_img     | text    | profile photo for user |

`PUT: /user/:id/photo` Update User's Profile Image
| Parameter | Type  | Description                    |
| ----------| ------| -------------------------------|
| id        | text  | Required network_id for user   |

| Body Parameter  | Type    | Description            |
| ----------------| --------| -----------------------|
| photo           | text    | image url              |

`PUT: /user/:id/updateLocation` Update User’s Location
| Parameter | Type  | Description                    |
| ----------| ------| -------------------------------|
| id        | text  | Required network_id for user   |

| Body Parameter  | Type    | Description            |
| ----------------| --------| -----------------------|
| city            | text    | city                   |
| state           | text    | state                  |
| zip             | text    | zipcode                |

`PUT: /user/:id/displayName` Update User's Display Name
| Parameter | Type  | Description                    |
| ----------| ------| -------------------------------|
| id        | text  | Required network_id for user   |

| Body Parameter  | Type    | Description            |
| ----------------| --------| -----------------------|
| username        | text    | display name for user  |

`PUT: /user/:id/contribution/add` Add User's Contribution Score
| Parameter | Type  | Description                    |
| ----------| ------| -------------------------------|
| id        | text  | Required network_id for user   |

`PUT: /user/:id/contribution/subtract` Subtract User's Contribution Score
| Parameter | Type  | Description                    |
| ----------| ------| -------------------------------|
| id        | text  | Required network_id for user   |

`PUT:  /user/:id/privacy` Toggle User Privacy Setting
| Parameter | Type  | Description                    |
| ----------| ------| -------------------------------|
| id        | text  | Required network_id for user   |

`DELETE:  /user/:id/deleteUser` Delete User Account
| Parameter | Type  | Description                    |
| ----------| ------| -------------------------------|
| id        | text  | Required network_id for user   |

`GET: /leaderboard` For Global Leaderboard
| Query Parameter | Type     | Description                                         |
| ----------------| ---------| ----------------------------------------------------|
| count           | integer  | Specifies how many results want displayed           |

`GET: /leaderboard/:zip` For Local Leaderboard
| Parameter | Type     | Description                    |
| ----------| ---------| -------------------------------|
| zip       | integer  | Required zip for default group |

| Query Parameter | Type     | Description                                         |
| ----------------| ---------| ----------------------------------------------------|
| count           | integer  | Specifies how many results want displayed           |

</details>

<details>
  <summary>View Groups Endpoints</summary>

`GET /groups/default/:group_id` Retrieve singular default group information
| Parameter | Type     | Description                    |
| ----------| ---------| -------------------------------|
| group_id  | integer  | Required ID for default group  |

`GET /groups/user` Retrieve singular user group information
| Query Parameter | Type     | Description                    |
| ----------------| ---------| -------------------------------|
| group_id        | integer  | Required ID for user group     |

`GET /groups/lists` Retrieve lists of user groups information by location coordinates
| Query Parameter | Type     | Description                                                               |
| ----------------| ---------| --------------------------------------------------------------------------|
| latitude        | float    | Required latitude of location                                             |
| longitude       | float    | Required longitude of location                                            |
| mi              | integer  | Optional specifies how many miles to search from coordinates. Default 10  |

`POST /groups/user` Create a User Group
| Body Parameter  | Type    | Description                                               |
| ----------------| --------| ----------------------------------------------------------|
| name            | text    | Required group name                                       |
| network_id      | text    | Required Unique ID for user to identify who created group |
| city            | text    | Required city for group located                           |
| state           | text    | Required state for group located                          |
| zip             | text    | Required zipcode for group located                        |
| latitude        | float   | Required latitude of location                             |
| longitude       | float   | Required longitude of location                            |
| privacy         | boolean | Optional Default false                                    |
| photo           | text    | Required photo for group                                  |
| description     | text    | Required photo for group                                  |

`POST /groups/user/:group_id/join` User send request to join a user group
| Parameter | Type     | Description                    |
| ----------| ---------| -------------------------------|
| group_id  | integer  | Required ID for user group     |

| Query Parameter | Type     | Description                                    |
| ----------------| ---------| -----------------------------------------------|
| network_id      | text     | Required network ID for user                   |
| accepted        | boolean  | Specifies true for public group. Default false |

`PUT /groups/user/:group_id/accept` Accept Join request to add user in group (For Admin User)
| Parameter | Type     | Description                    |
| ----------| ---------| -------------------------------|
| group_id  | integer  | Required ID for user group     |

| Query Parameter | Type     | Description                                    |
| ----------------| ---------| -----------------------------------------------|
| network_id      | text     | Required network ID for user                   |

`DELETE /groups/user/:group_id/left` User left a user group
| Parameter | Type     | Description                    |
| ----------| ---------| -------------------------------|
| group_id  | integer  | Required ID for user group     |

| Query Parameter | Type     | Description                                    |
| ----------------| ---------| -----------------------------------------------|
| network_id      | text     | Required network ID for user                   |

`PUT /groups/user/:group_id/photo` Update Group's Profile Image
| Parameter | Type  | Description                    |
| ----------| ------| -------------------------------|
| group_id  | text  | Required ID for user group     |

| Body Parameter  | Type    | Description            |
| ----------------| --------| -----------------------|
| photo           | text    | image url              |

`PUT /groups/user/:group_id/privacy` Toggle Group Privacy Setting
| Parameter | Type  | Description                    |
| ----------| ------| -------------------------------|
| group_id  | text  | Required ID for user group     |

`POST /groups/rating` User vote for safety and friendliness rating score
| Body Parameter              | Type    | Description                            |
| ----------------------------| --------| ---------------------------------------|
| group_id / default_group_id | integer | Specifies one particular type of group |
| network_id                  | text    | Required network ID for user           |
| safety                      | integer | safety score for group                 |
| friendliness                | integer | friendliness score for group           |

`PUT /groups/rating/safety` User edit voted safety rating score
| Body Parameter              | Type    | Description                            |
| ----------------------------| --------| ---------------------------------------|
| group_id / default_group_id | integer | Specifies one particular type of group |
| network_id                  | text    | Required network ID for user           |
| safety                      | integer | safety score for group                 |

`PUT /groups/rating/friendliness` User edit voted safety rating score
| Body Parameter              | Type    | Description                            |
| ----------------------------| --------| ---------------------------------------|
| group_id / default_group_id | integer | Specifies one particular type of group |
| network_id                  | text    | Required network ID for user           |
| friendliness                | integer | friendliness score for group           |

</details>

<details>
  <summary>View Posts Endpoints</summary>

`GET /posts/usergroup` Retrieve all posts for a user group, including users info relative to post
| Query Parameter | Type     | Description                    |
| ----------------| ---------| -------------------------------|
| user_group_id   | integer  | Required ID for user group     |

`GET /posts/defaultgroup` Retrieve all posts for a default group, including users info relative to post
| Query Parameter | Type     | Description                    |
| ----------------| ---------| -------------------------------|
| group_id        | integer  | Required ID for user group     |

`POST /posts/usergroup` Add a post for a particular user group
| Body Parameter | Type    | Description                                         |
| ---------------| --------| ----------------------------------------------------|
| user_group_id  | integer | Required ID for user group                          |
| user_id        | integer | Required ID for user                                |
| body           | text    | Text of post                                        |
| tag            | text    | Support values: General, Safety, Selling            |
| privacy        | boolean | Specifies if true. Default false                    |
| latitude       | float   | Required latitude of location                       |
| longitude      | float   | Required longitude of location                      |
| photos         | [text]  | An array of urls corresponding to images to display |

`PUT /posts/like/:post_id` Like a Post
| Parameter | Type     | Description                    |
| ----------| ---------| -------------------------------|
| post_id   | integer  | Required ID for post           |

`PUT /posts/unlike/:post_id` Unlike a Post
| Parameter | Type     | Description                    |
| ----------| ---------| -------------------------------|
| post_id   | integer  | Required ID for post           |

`PUT /posts/report/:post_id` Report a Post
| Parameter | Type     | Description                    |
| ----------| ---------| -------------------------------|
| post_id   | integer  | Required ID for post           |

`DELETE /posts/delete/:post_id` Delete a Reported Post (For Admin User)
| Parameter | Type     | Description                    |
| ----------| ---------| -------------------------------|
| post_id   | integer  | Required ID for post           |

`PUT /posts/:post_id/reset` Reset a reported post (For Admin User)
| Parameter | Type     | Description                    |
| ----------| ---------| -------------------------------|
| post_id   | integer  | Required ID for post           |

</details>

<details>
  <summary>View Replies Endpoints</summary>

`GET: /posts/:post_id/replies` Retrieves all replies for a particular post
| Parameter | Type     | Description                    |
| ----------| ---------| -------------------------------|
| post_id   | integer  | Required ID for post           |

`POST: /posts/:post_id/replies` Post a Reply to a Post
| Parameter | Type     | Description                    |
| ----------| ---------| -------------------------------|
| post_id   | integer  | Required ID for post           |

| Body Parameter | Type    | Description                       |
| ---------------| --------| ----------------------------------|
| user_id        | integer | Required ID for user              |
| username       | text    | Required display name for user    |
| latitude       | float   | Required latitude of location     |
| longitude      | float   | Required longitude of location    |
| reply          | text    | Text of reply                     |

`PUT: /reply/:reply_id/report` Like a Reply
| Parameter | Type     | Description                    |
| ----------| ---------| -------------------------------|
| reply_id  | integer  | Required ID for reply          |

`PUT: /reply/:reply_id/report` Report a Reply
| Parameter | Type     | Description                    |
| ----------| ---------| -------------------------------|
| reply_id  | integer  | Required ID for reply          |

`DELETE: /reply/:reply_id/delete` Delete a Reply
| Parameter | Type     | Description                    |
| ----------| ---------| -------------------------------|
| reply_id  | integer  | Required ID for reply          |

</details>

## Contributors

* Emily (Zhiying) Hu
  * https://github.com/emilyhu08

* Miles Maroney
  * https://github.com/milesmaroney

* Ernest Zhang
  * https://github.com/ernestzhang97

* Weiran (Rebecca) Cheng
  * https://github.com/weiranc

* David Sung
  * https://github.com/dks99455

* Cynthia Xu
  * https://github.com/cynthia2604

* Ben Pintel
  * https://github.com/bpintel
