require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");

const port = process.env.PORT || 3001;

mongoose
  .connect(
    "mongodb+srv://mike2424:mike2424@cluster0.rcdbl8g.mongodb.net/fittrackr?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
