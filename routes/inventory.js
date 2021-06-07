var express = require("express");
var router = express.Router();

// Require controller modules.
var make_controller = require("../controllers/makeController");
var model_controller = require("../controllers/modelController");
var model_instance_controller = require("../controllers/modelinstanceController");

/// MAKE ROUTES ///

// GET inventory home page.
router.get("/", make_controller.index);

// GET request for creating a Make. NOTE This must come before routes that display Model (uses id).
router.get("/make/create", make_controller.make_create_get);

// POST request for creating Make.
router.post("/make/create", make_controller.make_create_post);

// GET request to delete Make.
router.get("/make/:id/delete", make_controller.make_delete_get);

// POST request to delete Make.
router.post("/make/:id/delete", make_controller.make_delete_post);

// GET request to update Make.
router.get("/make/:id/update", make_controller.make_update_get);

// POST request to update Make.
router.post("/make/:id/update", make_controller.make_update_post);

// GET request for one Make.
router.get("/make/:id", make_controller.make_detail);

// GET request for list of all Make items.
router.get("/makes", make_controller.make_list);

/// MODEL ROUTES ///

// GET request for creating Model.
router.get("/model/create", model_controller.model_create_get);

// POST request for creating Model.
router.post("/model/create", model_controller.model_create_post);

// GET request to delete Model.
router.get("/model/:id/delete", model_controller.model_delete_get);

// POST request to delete Model.
router.post("/model/:id/delete", model_controller.model_delete_post);

// GET request to update Model.
router.get("/model/:id/update", model_controller.model_update_get);

// POST request to update Model.
router.post("/model/:id/update", model_controller.model_update_post);

// GET request for one Model.
router.get("/model/:id", model_controller.model_detail);

// GET request for list of all Authors.
router.get("/models", model_controller.model_list);

/// MODEL INSTANCE ROUTES ///

// GET request for creating a Model Instances. NOTE This must come before route that displays Model Instances (uses id).
router.get(
  "/modelinstance/create",
  model_instance_controller.modelinstance_create_get
);

//POST request for creating Model Instances.
router.post(
  "/modelinstance/create",
  model_instance_controller.modelinstance_create_post
);

// GET request to delete Model Instances.
router.get(
  "/modelinstance/:id/delete",
  model_instance_controller.modelinstance_delete_get
);

// POST request to delete Model Instances.
router.post(
  "/modelinstance/:id/delete",
  model_instance_controller.modelinstance_delete_post
);

// GET request to update Model Instances.
router.get(
  "/modelinstance/:id/update",
  model_instance_controller.modelinstance_update_get
);

// POST request to update Model Instances.
router.post(
  "/modelinstance/:id/update",
  model_instance_controller.modelinstance_update_post
);

// GET request for one Model Instances.
router.get(
  "/modelinstance/:id",
  model_instance_controller.modelinstance_detail
);

// GET request for list of all Model Instances.
router.get("/modelinstances", model_instance_controller.modelinstance_list);

module.exports = router;
