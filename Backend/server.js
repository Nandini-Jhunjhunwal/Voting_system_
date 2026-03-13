const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const connectDB = require("./config/db");

dotenv.config();
const app = express();
connectDB();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/votes", require("./routes/voteRoutes"));

app.get("/", (req, res) => {
  res.send("Voting System Backend is Running...");
});
const voteRoutes = require('./routes/voteRoutes');
app.use('/api/votes', voteRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
