const express = require("express");
const Vote = require("../models/Vote");
const { verifyToken } = require("../middleware/auth");
const router = express.Router();

// Cast Vote API
router.post("/cast", verifyToken, async (req, res) => {
  try {
    const { candidate, election } = req.body;

    if (!candidate || !election) {
      return res
        .status(400)
        .json({ message: "Candidate and election are required." });
    }

    // Check if user already voted in THIS election
    const existingVote = await Vote.findOne({ user: req.user.id, election });
    if (existingVote) {
      return res
        .status(400)
        .json({ message: "❌ You have already voted in this election." });
    }

    // Save the new vote
    const newVote = new Vote({
      candidate,
      election,
      user: req.user.id,
    });

    await newVote.save();
    res.status(201).json({ message: "✅ Your vote has been successfully submitted!" });
  } catch (error) {
    console.error("Vote Error:", error);
    res.status(500).json({ message: "Server error while submitting vote." });
  }
});

module.exports = router;
