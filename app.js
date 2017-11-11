const express = require('express'),
      passport = require('passport'),
      vkStrategy = require('./passport/passport.js'),
      expressSession = require('express-session'),
      multer  = require('multer'),
      Vkapi = require('node-vkapi'),
      getFriends = require('./controllers/friends.js');

let app = express(),
    upload = multer();


console.log(getFriends);


app.set('port', process.env.PORT || 3000);
app.set('view engine', 'pug');

//Настроим passport и стратегию авторизации passport-vkontakte
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});
passport.use(vkStrategy);
app.use(passport.initialize());
app.use(passport.session());

//Обрабатываем маршруты
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/auth/vk', passport.authenticate('vkontakte'));

app.get('/auth/vk/callback',
  passport.authenticate('vkontakte', { failureRedirect: '/error' }),
  (req, res) => {
    // Cохраним объект пользователя и токен в переменной окружения, в реальном проекте будем сохранять в БД
    process.env.VK_USER = JSON.stringify(req.user.profile);
    process.env.VK_ACCESS_TOKEN = req.user.accessToken;
    res.status(301).redirect('/logged');
  });

  app.get('/logged', (req, res, err) => {
      if(err) console.log(err);
      getFriends(res, process.env.VK_ACCESS_TOKEN, process.env.VK_USER, 'logged');
  })

  app.post('/authorized', upload.array(), (req, res, err) => {
      if(err) console.log(err);
      getFriends(res, req.body.accessToken, req.body.profile, 'authorized');
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
    console.log('Server is running on http//localhost' + app.get('port') + '; Press Cntl+C for ending!');
});
