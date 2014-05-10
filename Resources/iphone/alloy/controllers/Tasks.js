function Controller() {
    function initializeGlobalCurrentTab() {
        void 0 === Alloy.Globals.currentTab && (Alloy.Globals.currentTab = Alloy.createController("index").getView("tasksTab"));
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Tasks";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.Tasks = Ti.UI.createWindow({
        title: "TasksWindowTitle",
        id: "Tasks"
    });
    $.__views.Tasks && $.addTopLevelView($.__views.Tasks);
    $.__views.btnUser = Ti.UI.createButton({
        systemButton: Ti.UI.iPhone.SystemButton.ORGANIZE,
        title: "User",
        id: "btnUser"
    });
    $.__views.Tasks.leftNavButton = $.__views.btnUser;
    $.__views.btnAdd = Ti.UI.createButton({
        systemButton: Ti.UI.iPhone.SystemButton.COMPOSE,
        title: "Add",
        id: "btnAdd"
    });
    $.__views.Tasks.rightNavButton = $.__views.btnAdd;
    $.__views.tasksTable = Alloy.createController("TasksTable", {
        id: "tasksTable",
        __parentSymbol: $.__views.Tasks
    });
    $.__views.tasksTable.setParent($.__views.Tasks);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.openWindow = function(controllerName, viewId) {
        initializeGlobalCurrentTab();
        var window = Alloy.createController(controllerName).getView(viewId);
        Alloy.Globals.currentTab.open(window);
    };
    $.tasksTable.dataFilter = function(c) {
        return c.where({
            done: false.toString()
        });
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;