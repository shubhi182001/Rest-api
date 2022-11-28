const express = require("express");
//adding express router :
//-> create a new router
const router = new express.Router();
const Student = require("../models/students")


//-> we need to define the router
//creating a new students data -> using then catch
// app.post("/students" , (req, res) => {
//     const user  = new Student(req.body); //we use req.body to access the data sent by user to api in body
//     console.log(user);
//     user.save().then(() => {     //to save the data in database
//         res.status(201).send(user);
//     }).catch((e) => {
//         res.status(400).send(e);
//     }); 
// })

//We mostly use async await. It is more effective way.
router.post("/students", async(req, res) => {
    try{
        const user = new Student(req.body);
        console.log(user);
        const createUser = await user.save();
        res.status(201).send(createUser);
    }
    catch(e){
        res.status(400).send(e); 
    }

})

//to get the data from backend:
router.get("/students" , async(req, res) => {
    try{
        const studentdata =await Student.find();
        res.send(studentdata);
    }
    catch(e){
        res.send(e);
    }
})

//to get individual student data:
router.get("/students/:id" , async (req, res) => {
    try{
        const _id = req.params.id;
        const studentdatabyid = await Student.findById({_id : _id});
        console.log(studentdatabyid);
        if(!studentdatabyid){
            return res.status(404).send();
        }else{
            res.send(studentdatabyid);
        }
    }
    catch(e){
        res.status(500).send(e);
        console.log(e);
    }
})
//update students by id:

router.patch("/students/:id", async(req, res) =>{
    try{
        const _id = req.params.id;
        const updateStudent = await Student.findByIdAndUpdate({_id:_id}, req.body, {
            new: true  //it will show new data in response without it , it displays old data without updation.
        });
        res.send(updateStudent);
    }
    catch(e){
        res.status(404).send(e);
    }
})


//update students by name or email:
router.patch("/students/:name", async(req, res) =>{
    try{
        const name = req.params.name;
        const updateStudent = await Student.findOneAndUpdate({name: name}, req.body, {
            new: true  //it will show new data in response without it , it displays old data without updation.
        });
        res.send(updateStudent);
    }
    catch(e){
        res.status(404).send(e);
    }
})


//delete api (by id):
router.delete("/students/:id", async(req, res) => {
    try{
        const _id = req.params.id;
        const deleteStudent = await Student.findByIdAndDelete({_id: _id});
        if(!_id){
            return res.status(400).send("id not found")
        }
        res.send(deleteStudent);
    }
    catch(e){
        res.status(500).send(e);
    }
})
//We can  use findOneAndDelete to use name and email to delete the data



module.exports = router;