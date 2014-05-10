function Controller() {
    function tabOpen() {
        $.tasks.btnAdd.addEventListener("click", function() {
            return $.tasks.openWindow("Add", "addWin");
        });
        $.tasks.btnUser.addEventListener("click", function() {
            return $.tasks.openWindow("User", "userWin");
        });
    }
    function tabFocus(e) {
        Alloy.Globals.currentTab = e.tab;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    var __alloyId17 = [];
    $.__views.tasks = Alloy.createController("Tasks", {
        id: "tasks"
    });
    $.__views.tasksTab = Ti.UI.createTab({
        window: $.__views.tasks.getViewEx({
            recurse: true
        }),
        title: "Tasks",
        id: "tasksTab"
    });
    __alloyId17.push($.__views.tasksTab);
    $.__views.done = Alloy.createController("Done", {
        id: "done"
    });
    $.__views.doneTab = Ti.UI.createTab({
        window: $.__views.done.getViewEx({
            recurse: true
        }),
        title: "Done",
        id: "doneTab"
    });
    __alloyId17.push($.__views.doneTab);
    $.__views.all = Alloy.createController("All", {
        id: "all"
    });
    $.__views.allTab = Ti.UI.createTab({
        window: $.__views.all.getViewEx({
            recurse: true
        }),
        title: "All",
        id: "allTab"
    });
    __alloyId17.push($.__views.allTab);
    $.__views.index = Ti.UI.createTabGroup({
        tabs: __alloyId17,
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    tabOpen ? $.__views.index.addEventListener("open", tabOpen) : __defers["$.__views.index!open!tabOpen"] = true;
    tabFocus ? $.__views.index.addEventListener("focus", tabFocus) : __defers["$.__views.index!focus!tabFocus"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var isNetworkConnected = true;
    Util.Settings.UseCloud.enable && isNetworkConnected && Util.User.loginBySavedSessionId();
    $.index.addEventListener("close", function() {
        $.destroy();
    });
    $.index.open();
    __defers["$.__views.index!open!tabOpen"] && $.__views.index.addEventListener("open", tabOpen);
    __defers["$.__views.index!focus!tabFocus"] && $.__views.index.addEventListener("focus", tabFocus);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;