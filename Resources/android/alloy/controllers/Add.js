function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Add";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.addWin = Ti.UI.createWindow({
        id: "addWin",
        title: "Add Task",
        tabBarHidden: "true"
    });
    $.__views.addWin && $.addTopLevelView($.__views.addWin);
    $.__views.__alloyId0 = Ti.UI.createView({
        layout: "vertical",
        top: "5%",
        left: "5%",
        right: "5%",
        id: "__alloyId0"
    });
    $.__views.addWin.add($.__views.__alloyId0);
    $.__views.strlen = Ti.UI.createLabel({
        id: "strlen"
    });
    $.__views.__alloyId0.add($.__views.strlen);
    $.__views.inputTask = Ti.UI.createTextArea({
        font: {
            fontSize: "16sp"
        },
        id: "inputTask",
        width: Ti.UI.FILL,
        height: "20%",
        hintText: L("hint.todo")
    });
    $.__views.__alloyId0.add($.__views.inputTask);
    $.__views.btnSave = Ti.UI.createButton({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "btnSave",
        title: L("btn.save")
    });
    $.__views.__alloyId0.add($.__views.btnSave);
    $.__views.btnClose = Ti.UI.createButton({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "btnClose",
        title: L("btn.close")
    });
    $.__views.__alloyId0.add($.__views.btnClose);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.inputTask.addEventListener("change", function() {
        $.strlen.text = $.inputTask.value.length;
    });
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
            var reason = todo.validate(todo.toJSON());
            todo.destroy();
            alert(reason);
        }
    });
    $.btnClose.addEventListener("click", function() {
        $.addWin.close({
            animated: true
        });
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;