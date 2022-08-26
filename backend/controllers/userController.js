const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

// Register new user
const registerUser = asyncHandler(async (req, res) => {
  // Field Validation
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error("Please provide all field")
  }

  // Check if user exist
  const userExist = await User.findOne({ email })
  if (userExist) {
    res.status(400)
    throw new Error("User already exists")
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create the user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  })

  // Check if successful
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
    })
  } else {
    res.status(400)
    throw new Error("Invalid user data")
  }
})

// Authenticate user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // find the user
  const user = await User.findOne({ email })

  // Check if password is correct
  const passwordCheck = await bcrypt.compare(password, user.password)

  if (user && passwordCheck) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
    })
  } else {
    res.status(400)
    throw new Error("Invalid Credentials")
  }
})

// Get User data
const getMe = asyncHandler(async (req, res) => {
  res.json({ message: "user data display" })
})

module.exports = { registerUser, loginUser, getMe }
