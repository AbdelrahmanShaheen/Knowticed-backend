require("./db/connection");
const Form = require("./models/form");
const express = require("express");
const app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});
app.use(express.json());
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
