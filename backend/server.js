require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const workoutRutes = require("./routes/workouts");
const userRoutes = require("./routes/user");

// express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Cross Origin Resource Sharing
const whitelist = ["http://localhost:3000", "http://192.168.1.37:3000"];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionSuccessStatus: 200
};
app.use(cors(corsOptions));

// routes
app.use("/api/workouts", workoutRutes);
app.use("/api/user", userRoutes);

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log(`listening in port ${process.env.PORT}`);
      console.log("connected to mongodb");
    });
  })
  .catch(err => console.log(err));
