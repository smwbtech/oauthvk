const express = require('express'),
      passport = require('passport'),
      VKontakteStrategy = require('passport-vkontakte').Strategy,
      cookieParser = require('cookie-parser'),
      bodyParser = require('body-parser'),
      expressSession = require('express-session');

let app = express();

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'pug');

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

//Настроим стратегию авторизации passport-vkontakte
passport.use(new VKontakteStrategy(
  {
    clientID: '6253665',
    clientSecret: 'L21nWQJckiAE0PzdHsD8',
    callbackURL: 'http://localhost:3000/auth/vk/callback',
    scope: ['email'],
    profileFields: ['email'],
  },
  function verify(accessToken, refreshToken, params, profile, done) {

    // asynchronous verification, for effect...
    process.nextTick(function () {

      // To keep the example simple, the user's VK profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the VK account with a user record in your database,
      // and return that user instead.
      console.log(profile);
      return done(null, profile);
    });
  }
));

//Настройка express
app.use(require('cookie-parser')());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(require('express-session')({ secret: 'put the secret here' }));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/auth/vk', passport.authenticate('vkontakte'));

app.get('/auth/vk/callback',
  passport.authenticate('vkontakte', { failureRedirect: '/error' }),
  function(req, res) {
    console.log('Авторизовались!');
    res.redirect('/');
  });

app.use(express.static(__dirname + '/public'));

//Ошибка 404
app.use( (req, res) => {
    res.status(404);
    res.render('index', {title: '404 Page', messageHeader: 'Ooops, it is 404 page!', messageText: 'This is my test express app 404 page'});
});

//Ошибка 500
app.use( (err, req, res, next) => {
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Ошибка сервера');
});

app.listen(app.get('port'), () => {
    console.log('Exptress is runnin on http//localhost' + app.get('port') + '; Press Cntl+C for ending!');
});
