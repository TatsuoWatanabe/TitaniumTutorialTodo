var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("_Todo", exports.definition, []);

collection = Alloy.C("_Todo", exports.definition, model);

exports.Model = model;

exports.Collection = collection;