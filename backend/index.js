const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const userRouter = require("./routes/user");

const index = express();
const cors = require('cors');
index.use(cors());
index.use(bodyParser.json());

index.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
  next();
});
index.use("/user", userRouter);
index.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});


mongoose
  .connect(
    'mongodb://localhost:27017/recycling'
  )
  .then(result => {
    index.listen(3002);
  })
  .catch(err => console.log(err));