var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ModelSchema = new Schema({
  make: { type: Schema.Types.ObjectId, ref: "Make", required: true },
  name: { type: String, required: true },
  year: { type: String, required: true },
  description: { type: String, required: true },
});

// Virtual for model's URL
ModelSchema.virtual("url").get(function () {
  return "/inventory/make/model/" + this._id;
});

//Export model
module.exports = mongoose.model("Model", ModelSchema);
