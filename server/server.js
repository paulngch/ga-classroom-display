require("dotenv").config();
const path = require("path");
const express = require("express");

const morgan = require("morgan");
const mongoose = require("mongoose");

//Configuration
const app = express();
const PORT = process.env.PORT ?? 3000;

//MIDDLEWARE

app.use(express.json());
app.use(morgan("dev"));

const mongoURI = process.env.SECRET_KEY
