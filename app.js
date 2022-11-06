// declarations
const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const http = require("http");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(bodyparser.json());
app.use(cors);

// mongo connection
const mongouri = process.env.MONGODBURI;

mongoose
  .connect(mongouri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("Kudos your database got connected!");
    console.log("----------------------------------------------------");
  })
  .catch((err) => {
    console.log("something went wrong! in DB connection");
    console.log("err: ", err);
  });

// start server

app.get("/", (req, res) => {
  res.json({ status: 200, success: "Server is running" });
  console.log("server is running");
});

const server = http.createServer(app);

const port = process.env.port || 4000;

server.listen(port, () => {
  console.log(` Server is running on port : ${port} `);
});
