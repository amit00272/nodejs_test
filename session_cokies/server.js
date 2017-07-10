const express = require('express')
const cookieParser = require('cookie-parser')
var session = require('express-session')
var helmet = require('helmet')


var app = express()


app.use(cookieParser())
app.use(helmet())
app.use(session({
  secret: 'Secret Mantra',
  proxy: true,
  resave: true,
  saveUninitialized: true,
  cookie: { secure: true , httpOnly: true }
}))



app.get('/sessiontest', (req, res) => {
  if (req.session.page_view) {
    req.session.page_view++
    res.send(`You have visited this page ${req.session.page_view} times`)
  } else {
    req.session.page_view = 1
    res.send('Welcome to this page for the first time!')
  }
})

app.get('/', (req, res) => {
  /******
   *Checking Cookies in express
  */
  console.log('Cookies: ', req.cookies);// Show all cookies as object array
  // res.clearCookie('name');// clear cookie which name is 'name'
  // res.cookie('name', 'value', {expire: 360000 + Date.now()});// Set cookie name which expires after 360000 miliseconds from now.
  // res.cookie('name', 'value', {maxAge: 360000});// set cookie name which expires after 360000 miliseconds.
  // res.cookie('testing secure cookies', 'express',{maxAge: 360000});// set cookie name with default expiration time

  res.send('hi this is session page')
})

app.listen(3000, () => {
  console.log('Server is fired up on port 3000')
})
