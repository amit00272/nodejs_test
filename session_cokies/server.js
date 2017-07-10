const express = require('express')
const cookieParser = require('cookie-parser')

var app = express()

app.use(cookieParser())

app.get('/', (req, res) => {
  res.cookie('visited', 'true').send('hi this is session page')
})

app.listen(3000, () => {
  console.log('Server is fired up on port 3000')
})
