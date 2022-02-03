const express = require('express');
const cors = require('cors');
const router = require('./router/route');
const path = require('path');

const port = process.env.PORT || 3001;

const app = express();
// const app2 = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//localhost:3001 for user routes
app.use('/', router);

//localhost:3002 for group routes

app.get('/loaderio-8ffa3667f6c98aa7fa9d1ff67fbe4f41.txt', (req, res) => {
  res.status(200).send('loaderio-8ffa3667f6c98aa7fa9d1ff67fbe4f41');
});

app.listen(port, () => {
  console.log('listening on ', port);
});

// app2.listen(port + 1, () => {
//   console.log('listening on ', port + 1)
// })
