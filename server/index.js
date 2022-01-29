const express = require('express');
const cors = require('cors')
const router = require('./router/route')

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.use('/', router);

app.listen(port, () => {
  console.log('listening on ', port)
})

