const asyncHandler = require("express-async-handler")
const Goal = require("../models/goalsModel")

// @desc    Get goals
// @desc    GET /api/goals
// access   Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find()
  res.status(200).json(goals)
})

// @desc    Set goals
// @desc    POST /api/goals
// access   Private
const setGoals = asyncHandler(async (req, res) => {
  if (!req.body.goal) {
    res.status(400)
    throw new Error("Please add a goal field")
  }

  const goal = await Goal.create({
    goal: req.body.goal,
  })

  res.status(200).json(goal)
})

// @desc    update goals
// @desc    PUT /api/goals/:id
// access   Private
const updateGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)

  if (!goal) {
    res.status(400)
    throw new Error("Goal not found")
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedGoal)
})

// @desc    delete goals
// @desc    DELETE /api/goals/:id
// access   Private
const deleteGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)

  if (!goal) {
    res.status(400)
    throw new Error("Goal not found")
  }

  await goal.remove()
  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoals,
}
