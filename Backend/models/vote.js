const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema(
  {
    candidate: {
      type: String,
      required: true,
    },
    election: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// Prevent same user voting twice in the same election
voteSchema.index({ user: 1, election: 1 }, { unique: true });

module.exports = mongoose.model("Vote", voteSchema);
