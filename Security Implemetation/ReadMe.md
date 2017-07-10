##Security Instructions For NodeJs Application

###Use TLS (Transport Layer Security)
  * We can Use Free class 1 certificates to implements Https from [StartSSL]('http://www.startssl.com/')
###Cookies Should be Secure
   * Http Only
    `res.cookie('sessionid', '1', { httpOnly: true });`
   * Secure 
    `res.cookie('sessionid', '1', { secure: true });`  
   * Domain
     `res.cookie('sessionid', '1', { domain : `example.com` });`
   * Path 
     `res.cookie('sessionid', '1', { path : `foo/bar` });`
   * Expire
      `res.cookie('sessionid', '1', { expires : expiryDate });`
###Set HTTP headers appropriately
   * Install Package like Helmet
     `$ npm install --save helmet`
   * Use this to manage and hide your <b>headers</b> like <b>x-powered-by</b>  
     `var helmet = require('helmet')`<br>
     `app.use(helmet())`

      `Note: Disabling the X-Powered-By header does not prevent a sophisticated attacker from determining that an app is running Express. It may discourage a casual exploit, but there are other ways to determine an app is running Express.`    
   
   * <b>Strict-Transport-Security</b> enforces secure (HTTP over SSL/TLS) connections to the server
   * <b>X-Frame-Options </b> provides clickjacking protection
   * <b>X-XSS-Protection</b> enables the Cross-site scripting (XSS) filter built into most recent web browsers
   * <b>X-Content-Type-Options</b>prevents browsers from MIME-sniffing a response away from the declared content-type
   * <b>Content-Security-Policy</b>prevents a wide range of attacks, including Cross-site scripting and other cross-site injections
   
###Ensure Your dependencies are secure   
  * By instating <b>NSP(Node Security Project)</b> and using .We can check our dependency.<br> 
   `$ npm i nsp -g`<br>
   `$ nsp check`<br>
   `$ npm install -g snyk`<br>
   `$ cd your-app`<br>
   `$ snyk test`<br>
   `$ snyk wizard`<br>
   
###Authentication for Brute Force Protection
   * To prevent your application from these kind of attacks .We can use [RateLimiter]('https://www.npmjs.com/package/ratelimiter')  
     ````javascript
     var limit = new Limiter({ id: email, db: db });
     
     limit.get(function(err, limit) {
     
     });
     ````    
###Secure Session Management
  * You can use `express-session` package for the same.
###Command Injection 
  * User can inject command like:-
  ````javascript
  https://example.com/downloads?file=user1.txt
  https://example.com/downloads?file=%3Bcat%20/etc/passwd
  ````
  * To prevent command injection you should always filter and sanitize user input.
  
  
###Secure Data Transmission
 * Check the followiing
   - SSL Version
   - Algorithms
   - Key length
###Regular Expression
 * Evil like regular expression which contains:-
   - Grouping With repeation
   - Inside the repeated group
     - Repetition
     - Alternation with overlapping<br>
      `([a-zA-Z]+)*, (a+)+ or (a|a?)+`
      
      
###Error Handling
   - Dont Show server side Error codes and stack traces.
   
###SQL Injection
  * Stop Injection like :-
    `select title, author from books where id=2 or 1=1`
   
###CSRF (Cross-Site Request Forgery) 
  * It is an attack that forces a user to execute unwanted actions on a web application in which they're currently logged in. These attacks specifically target state-changing requests, not theft of data, since the attacker has no way to see the response to the forged request.
  
  * In Node.js to mitigate this kind of attacks you can use the csrf module. As it is quite low-level, there are wrappers for different frameworks as well.
  
  * One example for this is the [csurf](https://www.npmjs.com/package/csurf) module: an express middleware for CSRF protection.
  
  ````javascript 1.8
  var cookieParser = require('cookie-parser');  
  var csrf = require('csurf');  
  var bodyParser = require('body-parser');  
  var express = require('express');
  
  // setup route middlewares 
  var csrfProtection = csrf({ cookie: true });  
  var parseForm = bodyParser.urlencoded({ extended: false });
  
  // create express app 
  var app = express();
  
  // we need this because "cookie" is true in csrfProtection 
  app.use(cookieParser());
  
  app.get('/form', csrfProtection, function(req, res) {  
    // pass the csrfToken to the view 
    res.render('send', { csrfToken: req.csrfToken() });
  });
  
  app.post('/process', parseForm, csrfProtection, function(req, res) {  
    res.send('data is being processed');
  });
  ````
  
  
  And on the view Layer you have do something like :-
  
  ````javascript 1.8
  <form action="/process" method="POST">  
    <input type="hidden" name="_csrf" value="{{csrfToken}}">
  
    Favorite color: <input type="text" name="favoriteColor">
    <button type="submit">Submit</button>
  </form> 
  ````