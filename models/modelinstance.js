var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ModelInstanceSchema = new Schema({
  make: { type: Schema.Types.ObjectId, ref: "Make", required: true },
  model: { type: Schema.Types.ObjectId, ref: "Model", required: true },
  price: { type: String, required: true },
  mileage: { type: String, required: true },
});

// Virtual for model's URL
ModelInstanceSchema.virtual("url").get(function () {
  return "/make/modelinstance/" + this._id;
});

//Export model
module.exports = mongoose.model("ModelInstance", ModelInstanceSchema);
