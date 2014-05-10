function Controller() {
    function __alloyId12(e) {
        if (e && e.fromAdapter) return;
        __alloyId12.opts || {};
        var models = dataFilter(__alloyId11);
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId3 = models[i];
            __alloyId3.__transform = dataTransform(__alloyId3);
            var __alloyId5 = Ti.UI.createTableViewRow({
                _id: "undefined" != typeof __alloyId3.__transform["alloy_id"] ? __alloyId3.__transform["alloy_id"] : __alloyId3.get("alloy_id")
            });
            rows.push(__alloyId5);
            var __alloyId7 = Ti.UI.createView({
                layout: "horizontal",
                width: Ti.UI.FILL,
                height: "45dp",
                top: "6dp",
                bottom: "6dp",
                right: "11dp",
                left: "11dp"
            });
            __alloyId5.add(__alloyId7);
            var __alloyId8 = Ti.UI.createLabel({
                width: Ti.UI.FILL,
                height: Ti.UI.SIZE,
                textAlign: "left",
                font: {
                    fontSize: "18sp",
                    fontWeight: "bold"
                },
                text: "undefined" != typeof __alloyId3.__transform["task"] ? __alloyId3.__transform["task"] : __alloyId3.get("task")
            });
            __alloyId7.add(__alloyId8);
            var __alloyId9 = Ti.UI.createLabel({
                width: "50%",
                height: Ti.UI.SIZE,
                textAlign: "left",
                font: {
                    fontSize: "14sp"
                },
                text: "undefined" != typeof __alloyId3.__transform["lastModifiedAtFormatted"] ? __alloyId3.__transform["lastModifiedAtFormatted"] : __alloyId3.get("lastModifiedAtFormatted")
            });
            __alloyId7.add(__alloyId9);
            var __alloyId10 = Ti.UI.createLabel({
                width: "50%",
                height: Ti.UI.SIZE,
                textAlign: "right",
                font: {
                    fontWeight: "bold"
                },
                text: "undefined" != typeof __alloyId3.__transform["stateText"] ? __alloyId3.__transform["stateText"] : __alloyId3.get("stateText"),
                color: "undefined" != typeof __alloyId3.__transform["stateColor"] ? __alloyId3.__transform["stateColor"] : __alloyId3.get("stateColor")
            });
            __alloyId7.add(__alloyId10);
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
    var __alloyId11 = Alloy.Collections["Todo"] || Todo;
    __alloyId11.on("fetch destroy change add remove reset", __alloyId12);
    $.__views.tasksTable && $.addTopLevelView($.__views.tasksTable);
    exports.destroy = function() {
        __alloyId11.off("fetch destroy change add remove reset", __alloyId12);
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