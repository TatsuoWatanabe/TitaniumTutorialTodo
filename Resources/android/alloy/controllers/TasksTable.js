function Controller() {
    function __alloyId11(e) {
        if (e && e.fromAdapter) return;
        __alloyId11.opts || {};
        var models = dataFilter(__alloyId10);
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId4 = models[i];
            __alloyId4.__transform = dataTransform(__alloyId4);
            var __alloyId6 = Ti.UI.createTableViewRow({
                _id: "undefined" != typeof __alloyId4.__transform["alloy_id"] ? __alloyId4.__transform["alloy_id"] : __alloyId4.get("alloy_id")
            });
            rows.push(__alloyId6);
            var __alloyId7 = Ti.UI.createView({
                width: Ti.UI.FILL,
                height: Ti.UI.SIZE,
                top: "6dp",
                right: "11dp",
                bottom: "6dp",
                left: "11dp",
                layout: "horizontal"
            });
            __alloyId6.add(__alloyId7);
            var __alloyId8 = Ti.UI.createLabel({
                width: Ti.UI.FILL,
                height: Ti.UI.SIZE,
                textAlign: "left",
                font: {
                    fontSize: "18sp",
                    fontWeight: "bold"
                },
                text: "undefined" != typeof __alloyId4.__transform["task"] ? __alloyId4.__transform["task"] : __alloyId4.get("task")
            });
            __alloyId7.add(__alloyId8);
            var __alloyId9 = Ti.UI.createLabel({
                width: Ti.UI.FILL,
                height: Ti.UI.SIZE,
                textAlign: "left",
                font: {
                    fontSize: "14sp"
                },
                text: "undefined" != typeof __alloyId4.__transform["limitTime"] ? __alloyId4.__transform["limitTime"] : __alloyId4.get("limitTime")
            });
            __alloyId7.add(__alloyId9);
        }
        $.__views.tasksTable.setData(rows);
    }
    function dataTransform(model) {
        return model.getTableViewFormattedJson();
    }
    function dataFilter(collection) {
        return $.dataFilter ? $.dataFilter(collection) : collection.models;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "TasksTable";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.tasksTable = Ti.UI.createTableView({
        id: "tasksTable"
    });
    var __alloyId10 = Alloy.Collections["Todo"] || Todo;
    __alloyId10.on("fetch destroy change add remove reset", __alloyId11);
    $.__views.tasksTable && $.addTopLevelView($.__views.tasksTable);
    exports.destroy = function() {
        __alloyId10.off("fetch destroy change add remove reset", __alloyId11);
    };
    _.extend($, $.__views);
    $.tasksTable.addEventListener("click", function(e) {
        const dialogs = require("alloy/dialogs");
        const model = Alloy.Collections.Todo.where({
            alloy_id: e.rowData._id
        })[0];
        const isDone = model.get("done") === true.toString();
        dialogs.confirm({
            message: "[" + model.get("task") + "] " + (isDone ? "not Done?" : "Done?"),
            callback: function() {
                model.set({
                    done: (!isDone).toString()
                }).save();
            }
        });
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;