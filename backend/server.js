const express = require("express");
const notes = require("./data/notes");
const dotenv = require("dotenv");
const { connect } = require("mongoose");
const connectDB = require("./config/db");
const app = express();
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const path = require("path");
const fs=require('fs')
dotenv.config();
connectDB();

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);
app.use(notFound);
app.use(errorHandler);

// --------------------------deployment------------------------------
const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));  
  app.get('*', (req, res) => {
    try {
      console.log("get");
      res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"));
    } catch (err) {
      console.log("err");
    }
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}
// --------------------------deployment------------------------------

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on PORT ${PORT}`));
