const mongoose = require("mongoose");
const fs = require("fs");
const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");


const port = 8080;
const host = "127.0.0.1";


const app = express();


mongoose.connect('mongodb://localhost:27017/nsp',{useNewUrlParser:true,useUnifiedTopology:true});

var db = mongoose.connection;

db.on('error',console.error.bind(console,'connection error : '));
db.once('open',function(){
    console.log("We are connected bro/sis....");
});

// Create Schema 

const kittySchema = new mongoose.Schema({
    name: String,
    mobile:Number,
    email:String,
    message:String
  });

// kittySchema.methods.speak = function speak() {
//     const greeting = this.name;
//     console.log(greeting);
// };


//lock the Schema

const Kitten = mongoose.model('contact', kittySchema);


// Objects 

// var tarakitty = new Kitten({name:"Tara Chand Kitty"})
// console.log(tarakitty);
// tarakitty.speak();

// tarakitty.save(function(err,tarakitty){
//     if(err){
//         return console.error(err);
//     }
//     else{
//         tarakitty.speak();
//     }
// })

// for static file 

app.use("/static",express.static("static"));
app.use(express.urlencoded());


// Set Pug 

app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));


app.get("/",(req,res)=>{
    res.status(200).render("index");
})


app.post("/",(req,res)=>{
    var myData = new Kitten(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(404).send("item was not saved to the databse")
    })
    // res.status(200).render("index");
});


// Server Listen

app.listen(port,host,()=>{
    console.log(`Server has been started on part ${port} on the server ${host} .`);
});