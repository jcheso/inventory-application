#! /usr/bin/env node

console.log(
  "This script populates some test makes, models, and modelinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true"
);

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require("async");
var Make = require("./models/make");
var Model = require("./models/model");
var ModelInstance = require("./models/modelinstance");

var mongoose = require("mongoose");
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var makes = [];
var models = [];
var modelinstances = [];

function makeCreate(name, country, cb) {
  var make = new Make({ name, country });

  make.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Make: " + make);
    makes.push(make);
    cb(null, make);
  });
}

function modelCreate(make, name, year, description, cb) {
  var model = new Model({ make, name, year, description });
  model.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Model: " + model);
    models.push(model);
    cb(null, model);
  });
}

function modelInstanceCreate(make, model, price, mileage, cb) {
  var modelinstance = new ModelInstance({
    make,
    model,
    price,
    mileage,
  });
  modelinstance.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Model Instance: " + modelinstance);
    modelinstances.push(modelinstance);
    cb(null, modelinstance);
  });
}

function createMakes(cb) {
  async.series(
    [
      function (callback) {
        makeCreate("Ferrari", "Italy", callback);
      },
      function (callback) {
        makeCreate("Lamborghini", "Italy", callback);
      },
      function (callback) {
        makeCreate("Porsche", "Germany", callback);
      },
      function (callback) {
        makeCreate("Mclaren", "Britain", callback);
      },
    ],
    // optional callback
    cb
  );
}

function createModels(cb) {
  async.parallel(
    [
      function (callback) {
        modelCreate(
          makes[0],
          "SF90 Stradale",
          "2021",
          "The car’s name encapsulates the true significance of all that has been achieved in terms of performance. The reference to the 90th anniversary of the foundation of Scuderia Ferrari underscores the strong link that has always existed between Ferrari’s track and road cars. A brilliant encapsulation of the most advanced technologies developed in Maranello, the SF90 Stradale is also the perfect demonstration of how Ferrari immediately transitions the knowledge and skills it acquires in competition to its production cars.",
          callback
        );
      },
      function (callback) {
        modelCreate(
          makes[1],
          "Aventador SVJ",
          "2021",
          "Lamborghini created the Aventador SVJ to embrace challenges head-on, combining cutting-edge technology with extraordinary design, while always refusing to compromise. In a future driven by technology, it’s easy to lose the genuine thrill of driving. But in the future shaped by Lamborghini, this won’t be left behind, because there will always be a driver behind the wheel.",
          callback
        );
      },
      function (callback) {
        modelCreate(
          makes[2],
          "918 Spyder",
          "2015",
          "It took Porsche years to develop a worthy successor to the vaunted Carrera GT supercar, but at last, the 918 is here—and it’s a plug-in hybrid! With a combined 887 hp and 944 lb-ft of torque from its mid-mounted V-8 and electric motors—one at each axle—the 918 delivers Bugatti-like acceleration, tenacious handling, and a 211-mph top end. And of course, it’s every bit as exotic-looking as any near-million-dollar supercar should be, with a low-slung, targa body, and ultra-futuristic cabin.",
          callback
        );
      },
      function (callback) {
        modelCreate(
          makes[3],
          "Senna",
          "2021",
          "It is the most track-focused road car we have ever built, and it will set the fastest lap times of any McLaren to date. That is what has driven us to build a track car that is unashamedly without compromise. One that is legalised for road use, but not sanitised to suit it. Nothing else matters but to deliver the most intense driving experience around a circuit. Inspired by one of McLaren’s greatest racing drivers, the McLaren Senna is utterly dedicated to allowing the driver to be the best they can possibly be.",
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

function createModelInstances(cb) {
  async.parallel(
    [
      function (callback) {
        modelInstanceCreate(
          makes[0],
          models[0],
          "$1,500,000",
          "2,332km",
          callback
        );
      },
      function (callback) {
        modelInstanceCreate(
          makes[1],
          models[1],
          "$800,000",
          "14,432km",
          callback
        );
      },
      function (callback) {
        modelInstanceCreate(
          makes[2],
          models[2],
          "$2,000,000",
          "142km",
          callback
        );
      },
      function (callback) {
        modelInstanceCreate(
          makes[3],
          models[3],
          "$4,300,000",
          "13km",
          callback
        );
      },
    ],
    // Optional callback
    cb
  );
}

async.series(
  [createMakes, createModels, createModelInstances],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    } else {
      console.log("ModelInstances: " + modelinstances);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
