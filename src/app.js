const express = require("express");
require("./db/conn")
const Student = require("./models/students");

const app = express();
const port = process.env.PORT || 8000;

app.get("/" , (req,res) => {
    res.send("hello");
})    //we need to call it to get a response on webpage

app.use(express.json());  //it is a method inbuilt in express to recognize the incoming request object as a json object. This method is called as middleware in your application.


//creating a new students data
app.post("/students" , (req, res) => {
    const user  = new Student(req.body); //we use req.body to access the data sent by user to api in body
    console.log(user);
    res.send("hello from the other side by shubhi");
})

app.listen(port , () => {
    console.log(`connection is successful at ${port}`);
});