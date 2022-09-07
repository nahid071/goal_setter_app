import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { createGoal } from "../features/goals/goalSlice"

const GoalForm = () => {
  const [goal, setGoal] = useState("")

  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(createGoal({ goal }))
    setGoal("")
  }
  return (
    <>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="goal">Goal</label>
            <input
              type="text"
              name="goal"
              value={goal}
              id="goal"
              onChange={(e) => setGoal(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block" type="submit">
              Add Goal
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default GoalForm
