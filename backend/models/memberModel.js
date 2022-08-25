const mongoose = require("mongoose")

const memberSchema = mongoose.Schema(
  {
    name: {
      type: String,
      rquired: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Member", memberSchema)
