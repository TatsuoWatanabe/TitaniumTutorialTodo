function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Add";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.addWin = Ti.UI.createWindow({
        backgroundColor: "#FFFFFF",
        id: "addWin",
        title: "Add Task",
        tabBarHidden: "false",
        layout: "horizontal"
    });
    $.__views.addWin && $.addTopLevelView($.__views.addWin);
    $.__views.inputTask = Ti.UI.createTextArea({
        font: {
            fontSize: "16sp"
        },
        width: Ti.UI.FILL,
        height: "96dp",
        top: "11dp",
        bottom: "11dp",
        left: "11dp",
        right: "11dp",
        borderWidth: 1,
        borderColor: "#CCCCCC",
        id: "inputTask",
        hintText: L("hint.todo")
    });
    $.__views.addWin.add($.__views.inputTask);
    $.__views.btnSave = Ti.UI.createButton({
        top: "11dp",
        bottom: "11dp",
        left: "11dp",
        right: "11dp",
        height: Ti.UI.SIZE,
        id: "btnSave",
        title: L("btn.save"),
        width: Ti.UI.FILL
    });
    $.__views.addWin.add($.__views.btnSave);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.btnSave.addEventListener("click", function() {
        var todo = Alloy.createModel("Todo", {
            task: $.inputTask.value,
            lastModifiedAt: new Date().getTime(),
            createdAt: new Date().getTime(),
            done: false.toString()
        });
        if (todo.isValid()) {
            todo.save();
            $.addWin.close({
                animated: true
            });
            Alloy.Collections.Todo.fetch();
            alert($.inputTask.value + ": saved.");
        } else {
            var validResult = todo.validate(todo.toJSON());
            todo.destroy();
            alert($.inputTask.value + "\n" + validResult);
        }
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;