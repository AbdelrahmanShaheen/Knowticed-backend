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
