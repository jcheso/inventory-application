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
        title: "CarSales",
        error: err,
        data: results,
      });
    }
  );
};

// Display list of all Makes.
exports.make_list = function (req, res) {
  Make.find({}, "name").exec(function (err, list_makes) {
    if (err) {
      return next(err);
    }
    //Successful, so render
    res.render("make_list", { title: "Make List", make_list: list_makes });
  });
};

// Display detail page for a specific Make.
exports.make_detail = function (req, res) {
  async.parallel(
    {
      make: function (callback) {
        Make.findById(req.params.id).exec(callback);
      },
      model_instance: function (callback) {
        ModelInstance.find({ make: req.params.id }).exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      if (results.make == null) {
        // No results.
        var err = new Error("Make not found");
        err.status = 404;
        return next(err);
      }
      // Successful, so render.
      res.render("make_detail", {
        title: results.make.name,
        make: results.make,
      });
    }
  );
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
