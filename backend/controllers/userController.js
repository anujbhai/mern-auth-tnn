require("dotenv").config();
const User = require("../models/UserModel")
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15d" });
};

// login user
const loginUser = async (req, res) => {
  res.json({message: "login user"});
};

// signup user
const signupUser = async (req, res) => {
  const {email, password} = req.body;

  try {
    const user = await User.signup(email, password);

    // create a create
    const token = createToken(user._id)

    res.status(200).json({email, token});
  } catch (err) {
    res.status(400).json({error: err.message});
  }
};

module.exports = {loginUser, signupUser};
