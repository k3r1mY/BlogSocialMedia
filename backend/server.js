require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogs");

const app = express();

//Middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/blogs", blogRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Connected to db & listening on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log(err));
