let express = require("express");
let bodyParser = require("body-parser");
let cors = require("cors");
let Models = require('./db');
let session = require("express-session");
let config = require('./config');
let MongoStore = require('connect-mongo')(session);
let app = express();
app.use(
    cors({
        origin: ['http://localhost:3000'],
        credentials: true,
        allowedHeaders: "Content-Type,Authorization",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS"
    })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
    session({
        secret: config.secret,
        resave: false,
        saveUninitialized: true,
        store: new MongoStore({
            url: config.dbUrl,
            mongoOptions: {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        })
    })
);
app.get('/api/users', async (req, res) => {
    let users = await Models.UserModel.find();
    res.send({ code: 0, data: users });
});
app.get('/api/users/:id', async (req, res) => {
    let user = await Models.UserModel.findById(req.params.id);
    res.send({ code: 0, data: user });
});
app.post('/api/register', async (req, res) => {
    let user = req.body;
    user = await Models.UserModel.create(user);
    res.send({ code: 0, data: user });
});
app.post('/api/login', async (req, res) => {
    let user = req.body;
    let dbUser = await Models.UserModel.findOne(user);
    if (dbUser) {
        req.session.currentUser = dbUser;
        res.send({ code: 0, data: dbUser });
    } else {
        res.send({ code: 1, error: '登录失败' });
    }
});

app.get('/api/currentUser', async (req, res) => {
    let currentUser = req.session.currentUser;
    if (currentUser) {
        res.send({ code: 0, data: currentUser });
    } else {
        res.send({ code: 1, error: '当前用户未登录' });
    }
});
app.listen(4000, () => {
    console.log('服务器在4000端口启动!');
});