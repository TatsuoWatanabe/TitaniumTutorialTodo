function Controller() {
    function __alloyId11(e) {
        if (e && e.fromAdapter) return;
        __alloyId11.opts || {};
        var models = dataFilter(__alloyId10);
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId2 = models[i];
            __alloyId2.__transform = dataTransform(__alloyId2);
            var __alloyId4 = Ti.UI.createTableViewRow({
                _id: "undefined" != typeof __alloyId2.__transform["alloy_id"] ? __alloyId2.__transform["alloy_id"] : __alloyId2.get("alloy_id")
            });
            rows.push(__alloyId4);
            var __alloyId6 = Ti.UI.createView({
                layout: "horizontal",
                width: Ti.UI.FILL,
                height: "45dp",
                top: "6dp",
                bottom: "6dp",
                right: "11dp",
                left: "11dp"
            });
            __alloyId4.add(__alloyId6);
            var __alloyId7 = Ti.UI.createLabel({
                width: Ti.UI.FILL,
                height: Ti.UI.SIZE,
                textAlign: "left",
                font: {
                    fontSize: "18sp",
                    fontWeight: "bold"
                },
                text: "undefined" != typeof __alloyId2.__transform["task"] ? __alloyId2.__transform["task"] : __alloyId2.get("task")
            });
            __alloyId6.add(__alloyId7);
            var __alloyId8 = Ti.UI.createLabel({
                width: "50%",
                height: Ti.UI.SIZE,
                textAlign: "left",
                font: {
                    fontSize: "14sp"
                },
                text: "undefined" != typeof __alloyId2.__transform["lastModifiedAtFormatted"] ? __alloyId2.__transform["lastModifiedAtFormatted"] : __alloyId2.get("lastModifiedAtFormatted")
            });
            __alloyId6.add(__alloyId8);
            var __alloyId9 = Ti.UI.createLabel({
                width: "50%",
                height: Ti.UI.SIZE,
                textAlign: "right",
                font: {
                    fontWeight: "bold"
                },
                text: "undefined" != typeof __alloyId2.__transform["stateText"] ? __alloyId2.__transform["stateText"] : __alloyId2.get("stateText"),
                color: "undefined" != typeof __alloyId2.__transform["stateColor"] ? __alloyId2.__transform["stateColor"] : __alloyId2.get("stateColor")
            });
            __alloyId6.add(__alloyId9);
        }
        $.__views.tasksTable.setData(rows);
    }
    function dataTransform(m) {
        return $.dataTransform ? $.dataTransform(m) : m.toJsonExtended();
    }
    function dataFilter(c) {
        return $.dataFilter ? $.dataFilter(c) : c.models;
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
    Alloy.Collections.Todo.fetch();
    $.tasksTable.addEventListener("click", function(e) {
        var dialogs = require("alloy/dialogs");
        var todo = Alloy.Collections.Todo.where({
            alloy_id: e.rowData._id
        })[0];
        var isDone = todo.get("done") === true.toString();
        dialogs.confirm({
            message: "[" + todo.get("task") + "] " + (isDone ? "Todo?" : "Done?"),
            callback: function() {
                todo.save({
                    lastModifiedAt: new Date().getTime(),
                    done: (!isDone).toString()
                });
            }
        });
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;