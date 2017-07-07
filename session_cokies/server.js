const express = require('express')

var app = express()

app.get('/', (req, res) => {
  res.send('hi this is session page')
})

app.listen(3000, () => {
  console.log('Server is fired up on port 3000')
})
