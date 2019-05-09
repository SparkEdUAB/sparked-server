// at the top with imports:
let mongoose = require("mongoose");

// somewhere in the middle:
mongoose.Promise = global.Promise;

// in production change this to an mlab link
mongoose.connect("mongodb://localhost:27017/sparked", {
  useMongoClient: true
});
