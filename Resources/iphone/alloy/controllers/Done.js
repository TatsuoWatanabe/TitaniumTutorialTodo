function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Done";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.Done = Ti.UI.createWindow({
        title: "DoneWindowTitle",
        id: "Done"
    });
    $.__views.Done && $.addTopLevelView($.__views.Done);
    $.__views.tasksTable = Alloy.createController("TasksTable", {
        id: "tasksTable",
        __parentSymbol: $.__views.Done
    });
    $.__views.tasksTable.setParent($.__views.Done);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.tasksTable.dataFilter = function(collection) {
        return collection.where({
            done: JSON.stringify(true)
        });
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;