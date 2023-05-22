const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcrypt');
const JWT_SECRET = "vIKDS@24";
var fetchuser = require('../middleware/fetchuser');
var jwt = require('jsonwebtoken');

router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    //If there are errors , return Bad req and the errors
    let success = false;
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ success , result: result.array() });
    }
    try {
      //check if the user has already this email existing
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success ,error: "Sorry a user with this email already exists" });
      }
      var salt = await bcrypt.genSalt(10);
      var secPass = await bcrypt.hash(req.body.password , salt);

      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      const data={
        user:{
          id:user.id
        }
      }
      success=true;
      const authToken = jwt.sign(data , JWT_SECRET);
      res.json({success , authToken});
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error has occured");
    }
  }
);

//for login
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password can't be blank").exists()
  ],
  async (req, res) => {
    let success = false;
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ result: result.array() });
    }
    const {email,password} = req.body;
    try {
      let user = await User.findOne({email});
      if(!user){
        success=false;
        return res.status(400).json({result: "Please try to login with correct credentials"});
      }
      const passCompare = await bcrypt.compare(password , user.password);
      if(!passCompare){
        success=false;
        return res.status(400).json({success , result: "Please try to login with correct credentials"});
        
      }
     
      const data={
        user:{
          id:user.id
        }
      }
      const authToken = jwt.sign(data , JWT_SECRET);
      success=true;
      res.json({success,authToken});
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Internal Error has occured");
    }
  }
)


//get loggedin User details
router.post( "/getuser",fetchuser,async (req, res) => 
  {
    try {
      userId = req.user.id;
     const user = await User.findById(userId).select("-password")
     res.send(user);
    
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Internal Error has occured");
    }
  }
)
module.exports = router;