require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const requireAuth = async (req, res, next) => {
  // verify authentication
  const {authorization} = req.headers;

  if (!authorization) {
    return res.status(401).json({error: "User not authorized"});
  }

  const token = authorization.split(" ")[1];
  
  try {
    const {_id} = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.user = await User.findOne({_id}).select("_id");
    next();
  } catch(err) {
    console.log(err);
    res.status(401).json({error: "Request is not authorized"});
  }
};

module.exports = requireAuth;

