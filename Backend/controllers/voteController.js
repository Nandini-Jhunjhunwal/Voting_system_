const Vote = require("../models/Vote");

// Cast vote
exports.castVote = async (req, res) => {
  try {
    const { electionName, candidate } = req.body;
    const userId = req.user.id;

    // Check if user already voted
    const existingVote = await Vote.findOne({ userId, electionName });
    if (existingVote) return res.status(400).json({ message: "You already voted!" });

    const vote = await Vote.create({ userId, electionName, candidate });
    res.status(201).json({ message: "Vote cast successfully", vote });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Get election results
exports.getResults = async (req, res) => {
  try {
    const votes = await Vote.aggregate([
      { $group: { _id: "$candidate", totalVotes: { $sum: 1 } } }
    ]);
    res.status(200).json(votes);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
