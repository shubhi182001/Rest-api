const express = require("express");
require("./db/conn")
const studentRouter = require("./routers/student")

const app = express();
const port = process.env.PORT || 8000;
//it is a method inbuilt in express to recognize the incoming request object as a json object. This method is called as middleware in your application.
app.use(express.json());  
//-> we need to register our router
app.use(studentRouter);
app.listen(port , () => {
    console.log(`connection is successful at ${port}`);
});