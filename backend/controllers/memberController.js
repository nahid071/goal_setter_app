const asyncHandler = require("express-async-handler")
const Member = require("../models/memberModel")

// Get Members
const getMembers = asyncHandler(async (req, res) => {
  const members = await Member.find()
  res.status(200).json(members)
})

// Set Member
const setMember = asyncHandler(async (req, res) => {
  const { name, phone, email, address } = req.body
  if (!name) {
    res.status(400)
    throw new Error("please add a name field")
  } else if (!phone) {
    res.status(400)
    throw new Error("please add a phone field")
  } else if (!email) {
    res.status(400)
    throw new Error("please add an email field")
  } else if (!address) {
    res.status(400)
    throw new Error("please add an address field")
  }

  const member = await Member.create({
    name,
    phone,
    email,
    address,
  })

  res.status(200).json(member)
})

// Update Member
const updateMember = asyncHandler(async (req, res) => {
  const member = await Member.findById(req.params.id)
  if (!member) {
    res.status(400)
    throw new Error("Member not found")
  }

  const updatedMember = await Member.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )
  res.status(200).json(updatedMember)
})

// Delete Member
const deleteMember = asyncHandler(async (req, res) => {
  const member = await Member.findById(req.params.id)
  if (!member) {
    res.status(400)
    throw new Error("Member not found")
  }

  await member.remove()
  res.status(200).json({ id: req.params.id })
})

module.exports = { getMembers, setMember, updateMember, deleteMember }
