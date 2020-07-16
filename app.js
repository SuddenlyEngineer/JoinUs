var express = require('express');
//var mysql = require('mysql');
var mysql = require('mysql2'); // fix auth issue
// var faker = require('faker');
// var ejs = require('ejs');
var bodyParser = require('body-parser');
var app = express();


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"))

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    database : 'join_us',
    password : 'thomas01' //lmao hardcoded passwords
});

app.get("/", function(req, res){
    // Find count of users in db
    var q = "SELECT COUNT(*) AS count FROM users";
    connection.query(q, function(err, results){
        if (err) throw err;
        // if (results[0].count == 0){
        //     var data = [];
        //     for(var i = 0; i < 500; i++){
        //         data.push([
        //             faker.internet.email(),
        //             faker.date.past()
        //         ]);
        //     }
        //     connection.query('INSERT INTO users (email, created_at) VALUES ?', [data], function(err, result){
        //         console.log(err);
        //         console.log(result);
        //     });
        // }
        var count = results[0].count
        res.render('home.ejs', {count: count});
    });
});

app.post("/register", function(req, res){
    console.log("Post request received.")
    var person = {
        email: req.body.email
    };
    connection.query('INSERT INTO users SET ?', person, function(err, result) {
        if (err) throw err;
        res.redirect("/")
    })
})

app.listen(8080, function(){
    console.log("Server running on 8080!");
});