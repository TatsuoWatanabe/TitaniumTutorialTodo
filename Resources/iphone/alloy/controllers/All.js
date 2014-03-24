function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "All";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.All = Ti.UI.createWindow({
        title: "AllTasksWindowTitle",
        id: "All"
    });
    $.__views.All && $.addTopLevelView($.__views.All);
    $.__views.tasksTable = Alloy.createController("TasksTable", {
        id: "tasksTable",
        __parentSymbol: $.__views.All
    });
    $.__views.tasksTable.setParent($.__views.All);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.tasksTable.dataTransform = function(m) {
        return _.extend(m.toJsonExtended(), {
            stateVisible: true
        });
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;