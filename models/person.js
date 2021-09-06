const { Number } = require("mongoose");
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const url = process.env.MONGO_URI;

mongoose
  .connect(url)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB", error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [3, "must be at least 3 characters"],
    require: true,
    unique: true,
  },
  number: {
    type: Number,
    min: [10000000, "must be at least 8 digits"],
    required: true,
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
personSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Person", personSchema);
