// declarations
const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const http = require("http");

require("dotenv").config();

const app = express();

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
