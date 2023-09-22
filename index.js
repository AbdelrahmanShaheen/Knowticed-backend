require("./db/connection");
// const Form = require("./models/form");
const express = require("express");
const app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});
app.use(express.json());
const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [6, "Name must be at least 6 characters long"],
    maxLength: 100,
  },
  email: {
    type: String,
    required: true,
    minLength: [5, "Email must be at least 5 characters long"],
    maxLength: 100,
    validate: {
      validator: function (value) {
        // Use a regular expression to validate email format
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(value);
      },
      message: "Invalid email format",
    },
  },
  phone: {
    type: String,
    required: true,
    minLength: [10, "Phone number must be at least 10 characters long"],
    maxLength: 15,
    validate: {
      validator: function (value) {
        // Use a regular expression to validate phone number format
        const phoneRegex = /^\d{10,15}$/;
        return phoneRegex.test(value);
      },
      message: "Invalid phone number format",
    },
  },
  subject: {
    type: String,
    required: true,
    minLength: [1, "Subject must be at least 1 characters long"],
    maxLength: 100,
  },
  message: {
    type: String,
    required: true,
    minLength: [1, "Message must be at least 1 characters long"],
    maxLength: 500,
  },
});

const Form = mongoose.model("Form", formSchema);

module.exports = Form;

//make a post request to create a form data
app.post("/form", async (req, res) => {
  try {
    const form = await Form.create(req.body);
    res.status(201).send({ form });
  } catch (e) {
    res.status(400).send(e);
  }
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
