const express = require('express');
var bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
let fetchuser = require("../middleware/auth")
const router = express.Router();
const mongoose = require('mongoose')
let user = require('../models/User')

router.post('/signup',async (req , res) =>
{
    let privatekey = "shhhhitsfortoken"
    let result = req.body
    let newpassword = result.password
    var salt =  bcrypt.genSaltSync(10);
    var hash = await bcrypt.hash(newpassword, salt);
    let uniqueemail = await user.findOne({email : result.email});
    if(uniqueemail)
    {
        success = false
        return res.status(500).json({error : "email already exit"})
    }
    if( !result ||
        !result.name ||
        !result.email||
        !hash)
        {
            return res.status(400).json({ success ,  mag : "all field must filed"})
        }
    let body = await user.create({
        name : result.name,
        email: result.email,
        password: hash
    })
       let data = {
        new:{
            id : body.id
        }
    }
    var token = jwt.sign(data, privatekey);
    success = true
    res.json({"result": success, "auth-token": token})
})

router.post('/login' , async(req , res)=>
{
    // let data = await user.find({})
    // res.status(200).send(data)
    let privatekey = "shhhhitsfortoken"
    let result = req.body
    let password = result.password
    
    if( !result ||
        !result.email||
        !password)
        {
            return res.status(400).json({mag : "all field must filed"})
        }
   
    console.log(req.body)
    let User = await user.findOne({email: result.email});
    if(!User)
        return res.status(500).json({error : "email did not  exit"})
    let passwordcompare = await bcrypt.compare(password , User.password)
    if(!passwordcompare){
        success = false
    return res.status(500).json({success , error : "password did not  exit"})}


    let data = {
        new:{
            id : User.id
        }
    }
    var token = jwt.sign(data, privatekey);
    success = true
    res.json({"result": success, "auth-token": token})
    console.log( success , token)
})

router.post('/getuser' ,fetchuser, async(req , res)=>
{
    let userid = req.user.id
    getuser = await user.findById(userid).select("-password")
    if(!getuser) {return "user is not available"}
    res.status(200).send(getuser)
})
module.exports = router