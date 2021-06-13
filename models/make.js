var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var MakeSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  country: { type: String, required: true, maxLength: 100 },
});

// Virtual for model's URL
MakeSchema.virtual("url").get(function () {
  return "/inventory/make/" + this._id;
});

//Export model
module.exports = mongoose.model("Make", MakeSchema);
