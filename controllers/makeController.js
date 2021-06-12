var Make = require("../models/make");
var Model = require("../models/model");
var ModelInstance = require("../models/modelinstance");
const { body, validationResult } = require("express-validator");

var async = require("async");

exports.index = function (req, res) {
  async.parallel(
    {
      model_count: function (callback) {
        Model.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
      },
      model_instance_count: function (callback) {
        ModelInstance.countDocuments({}, callback);
      },
      make_count: function (callback) {
        Make.countDocuments({}, callback);
      },
    },
    function (err, results) {
      res.render("index", {
        title: "Luxury Car Sales",
        error: err,
        data: results,
      });
    }
  );
};

// Display list of all Makes.
exports.make_list = function (req, res) {
  res.send("NOT IMPLEMENTED: Make list");
};

// Display detail page for a specific Make.
exports.make_detail = function (req, res) {
  res.send("NOT IMPLEMENTED: Make detail: " + req.params.id);
};

// Display Make create form on GET.
exports.make_create_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Make create GET");
};

// Handle Make create on POST.
exports.make_create_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Make create POST");
};

// Display Make delete form on GET.
exports.make_delete_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Make delete GET");
};

// Handle Make delete on POST.
exports.make_delete_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Make delete POST");
};

// Display Make update form on GET.
exports.make_update_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Make update GET");
};

// Handle Make update on POST.
exports.make_update_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Make update POST");
};
