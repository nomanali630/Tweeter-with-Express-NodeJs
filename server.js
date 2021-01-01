let users = [
    {
        userEmail: "azhar40@live.co.uk",
        userPassword: "azharkhan",
        userName: "Azhar khan",
        userPosts: [],
    },
]


var currentUser;

var express = require("express");
var bodyParser = require('body-parser');
var cors = require("cors");
var path = require("path");
var morgan = require("morgan");
var http = require("http");
var socketIO = require("socket.io");

var app = http.createServer(server);
var io = socketIO(app);




var server = express();
server.use(bodyParser.json());
server.use(cors());
server.use(morgan('dev'))

const PORT = process.env.PORT || 3000;


server.use("/", express.static(path.resolve(path.join(__dirname, "public"))));


server.post("/signup", (req, res, next) => {

    var currEmail = req.body.userEmail;
    var isFound = false;

    for (var i = 0; i < users.length; i++) {
        if (users[i].userEmail === currEmail) {
            isFound = true;
            break;
        }
    }
    if (isFound) {
        res.send(
            {
                message: "Email already exsist",
                status: 400,
            })
    }
    else {
        users.push({
            userEmail: req.body.userEmail,
            userPassword: req.body.userPassword,
            userName: req.body.userName,
            userPosts: [],
        });
        res.send({
            message: "signup successfully",
            status: 200,
        });
    };


});

server.post("/login", function (req, res, next) {


    let email = req.body.userEmail;
    let password = req.body.userPassword
    let isFound = false;

    for (var i = 0; i < users.length; i++) {
        if (users[i].userEmail === email) {
            isFound = i;
            break;
        }
    }
    if (isFound) {
        if (users[isFound].userPassword === password) {
            res.send({
                message: "sign in successfully",
                status: 400,
                currentUser: {
                    userName: users[isFound].userName,
                    userEmail: users[isFound].userEmail,
                }
            });
        } else {
            res.send({
                message: "password is incorrect",
                status: 400,
            });
        }
    } else {
        res.send({
            message: "User not found",
            status: 400,
        });

    };
});

io.on("connection",function(user){
    console.log("a user connected");
});


server.post("/tweet", (req, res, next) => {

    tweet.push({
        userName: req.body.userName,
        tweetText: req.body.tweetText,
     
    });
    res.send(tweets);
    io.emit("NEW_POST",JSON.stringify(tweets[tweets.length - 1]))


});

server.post("/tweets", (req, res, next) => {

    res.send(tweets);


})


server.listen(PORT, () => {
    console.log("server is runnin on port " + PORT);

})
