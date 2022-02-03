const express = require('express');
const cors = require('cors');
const router = require('./router/route');
const path = require('path');

const port = process.env.PORT || 3002;

const app = express();
// const app2 = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//localhost:3001 for user routes
app.use('/', router);

//localhost:3002 for group routes

app.get('/loaderio-e3322f20e4c37ccfb13f9c62393bd71e.txt', (req, res) => {
  res.status(200).send('loaderio-e3322f20e4c37ccfb13f9c62393bd71e');
});

app.listen(port, () => {
  console.log('listening on ', port);
});

// app2.listen(port + 1, () => {
//   console.log('listening on ', port + 1)
// })
