function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "User";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.userWin = Ti.UI.createWindow({
        id: "userWin",
        title: "User Setting",
        tabBarHidden: "true",
        layout: "vertical"
    });
    $.__views.userWin && $.addTopLevelView($.__views.userWin);
    $.__views.__alloyId13 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        top: "20dp",
        bottom: "20dp",
        left: "20dp",
        right: "20dp",
        layout: "vertical",
        id: "__alloyId13"
    });
    $.__views.userWin.add($.__views.__alloyId13);
    $.__views.__alloyId14 = Ti.UI.createLabel({
        font: {
            fontSize: "16sp",
            fontWeight: "bold"
        },
        textAlign: "left",
        color: "#FFFFFF",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        top: "10dp",
        left: "0dp",
        text: "User Name",
        id: "__alloyId14"
    });
    $.__views.__alloyId13.add($.__views.__alloyId14);
    $.__views.txtUserName = Ti.UI.createTextField({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "txtUserName",
        hintText: "User Name"
    });
    $.__views.__alloyId13.add($.__views.txtUserName);
    $.__views.__alloyId15 = Ti.UI.createLabel({
        font: {
            fontSize: "16sp",
            fontWeight: "bold"
        },
        textAlign: "left",
        color: "#FFFFFF",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        top: "10dp",
        left: "0dp",
        text: "Password",
        id: "__alloyId15"
    });
    $.__views.__alloyId13.add($.__views.__alloyId15);
    $.__views.txtPassword = Ti.UI.createTextField({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "txtPassword",
        passwordMask: "true",
        hintText: "Password"
    });
    $.__views.__alloyId13.add($.__views.txtPassword);
    $.__views.__alloyId16 = Ti.UI.createLabel({
        font: {
            fontSize: "16sp",
            fontWeight: "bold"
        },
        textAlign: "left",
        color: "#FFFFFF",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        top: "10dp",
        left: "0dp",
        text: "Mail Address",
        id: "__alloyId16"
    });
    $.__views.__alloyId13.add($.__views.__alloyId16);
    $.__views.txtMailAddress = Ti.UI.createTextField({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "txtMailAddress",
        hintText: "Mail Address"
    });
    $.__views.__alloyId13.add($.__views.txtMailAddress);
    $.__views.__alloyId17 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        top: "20dp",
        bottom: "20dp",
        left: "20dp",
        right: "20dp",
        layout: "vertical",
        id: "__alloyId17"
    });
    $.__views.userWin.add($.__views.__alloyId17);
    $.__views.btnCreate = Ti.UI.createButton({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        title: "Create",
        id: "btnCreate"
    });
    $.__views.__alloyId17.add($.__views.btnCreate);
    $.__views.btnShowMe = Ti.UI.createButton({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        title: "ShowMe",
        id: "btnShowMe"
    });
    $.__views.__alloyId17.add($.__views.btnShowMe);
    $.__views.btnLogin = Ti.UI.createButton({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        title: "Login",
        id: "btnLogin"
    });
    $.__views.__alloyId17.add($.__views.btnLogin);
    $.__views.btnClose = Ti.UI.createButton({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        title: "Close",
        id: "btnClose"
    });
    $.__views.__alloyId17.add($.__views.btnClose);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var Cloud = require("ti.cloud");
    var CloudUsers = Cloud.Users;
    var TiApi = Ti["API"];
    var TiProperties = Ti.App["Properties"];
    $.btnCreate.addEventListener("click", function() {
        CloudUsers.create({
            username: $.txtUserName.value,
            password: $.txtPassword.value,
            password_confirmation: $.txtPassword.value,
            first_name: $.txtUserName.value,
            last_name: $.txtUserName.value,
            email: $.txtMailAddress.value
        }, function(e) {
            if (e.success) {
                var user = e.users[0];
                alert("Created! You are now logged in as " + user.id);
                $.txtUserName.value = $.txtPassword.value = "";
            } else {
                var msg = e.error && e.message || JSON.stringify(e);
                e.code ? alert(msg) : TiApi.error(msg);
            }
        });
    });
    $.btnShowMe.addEventListener("click", function() {
        Util.User.login();
        Cloud.sessionId = TiProperties.getString("sessionId");
        CloudUsers.showMe(function(e) {
            if (e.success) {
                var user = e.users[0];
                alert("Success:\nid: " + user.id + "\n" + "first name: " + user.first_name + "\n" + "last name: " + user.last_name);
            } else alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
        });
    });
    $.btnLogin.addEventListener("click", function() {
        CloudUsers.login({
            login: $.txtUserName.value,
            password: $.txtPassword.value
        }, function(e) {
            if (e.success) {
                var user = e.users[0];
                TiProperties.setString("sessionId", Cloud.sessionId);
                alert("Success:\nid: " + user.id + "\n" + "sessionId: " + Cloud.sessionId + "\n" + "first name: " + user.first_name + "\n" + "last name: " + user.last_name);
            } else alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
        });
    });
    $.btnClose.addEventListener("click", function() {
        $.userWin.close({
            animated: true
        });
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;