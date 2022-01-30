const express = require('express');
const cors = require('cors')
const router = require('./router/route.js');

const port = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/', router);


app.listen(port, () => {
  console.log('listening on ', port)
})

