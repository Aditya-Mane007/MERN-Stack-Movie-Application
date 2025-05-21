const Auth = require("../model/authModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = asyncHandler(async (req, res) => {
  const { email, password, role } = req.body || {};

  if (!email || !password || !role) {
    return res.status(404).json({
      message: "Please add the fields",
    });
  }

  const userExists = await Auth.findOne({ email: email });

  if (userExists) {
    return res.status(400).json({
      message: "User already exists, please login",
    });
  }

  const hashpassword = await bcrypt.hash(password, 10);

  const newUser = await Auth.create({
    email,
    password: hashpassword,
    username: email.split("@")[0],
    role: role || "user",
  });

  if (!newUser) {
    return res.status(500).json({
      message: "Something went wrong , please try again lator",
    });
  }

  const token = generateToken(newUser._id);

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 3 * 24 * 60 * 60 * 1000,
  });

  return res.status(201).json({
    message: "User created successfully",
    user: {
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
      token: token,
    },
  });
});

const getUser = asyncHandler(async (req, res) => {
  return res.status(200).json({
    user: req.user,
    admin: req.admin,
  });
});

const generateToken = (data) => {
  return jwt.sign({ id: data }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
};

module.exports = {
  register,
  getUser,
};
