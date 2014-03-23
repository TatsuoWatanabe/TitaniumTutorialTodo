void 0;

var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("IExportableModel.d", exports.definition, []);

collection = Alloy.C("IExportableModel.d", exports.definition, model);

exports.Model = model;

exports.Collection = collection;