//app.js
const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
var http = require('http');
const path = require('path');
const morgan = require('morgan');
const { nextTick } = require('process');
const Router = require(__dirname + '/router_files/router');

const app = express();
app.set('port', process.env.PORT || 3005);


app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({  // 2
    secret: 'randomafaskljgvbwaerilu',  // 암호화
    resave: false,
    saveUninitialized: true,
    store: new FileStore({logFn: function(){}})
}));

http.createServer(app).listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});
app.get('/', (req, res) => {
    res.send("라우팅")
})
app.use('/api', Router) //use ./router.js file as router
