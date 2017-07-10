var nodeMailer = require('nodemailer')

var transporter = nodeMailer.createTransport({
  service: 'gmail',
  auth: {

    user: 'don00272@gmail.com',
    pass: 'ravi00272'

  }})

var mailOptions = {

  from: 'Amit Kumar Shrivastava',
  to: 'amit00272@hotmail.com',
  subject: 'sending mail using node js',
  text: 'Reply me if you got this'

}

transporter.sendMail(mailOptions, (err, info) => {
  if (err) {
    return console.log('Not send', err)
  }
  console.log(info)
})
