const express = require('express'),
      passport = require('passport'),
      passportStrategies = require('../passport/passport.js'),
      VKontakteStrategy = require('passport-vkontakte').Strategy;

let app = express();

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index');
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
