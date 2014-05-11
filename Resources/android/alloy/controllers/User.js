function Controller() {
    function onLoginStateChanged() {
        var isLoggedIn = Util.Settings.Login.isLoggedIn;
        $.cloudStatusBar.visible = isLoggedIn;
        $.btnTwitterLogin.visible = !isLoggedIn;
        $.btnLogout.visible = isLoggedIn;
        $.lblUsername.text = Util.Settings.Login.username;
    }
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
    $.__views.__alloyId15 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        layout: "vertical",
        left: "20dp",
        right: "20dp",
        id: "__alloyId15"
    });
    $.__views.userWin.add($.__views.__alloyId15);
    $.__views.cloudStatusBar = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "cloudStatusBar",
        layout: "vertical",
        left: "10dp"
    });
    $.__views.__alloyId15.add($.__views.cloudStatusBar);
    $.__views.__alloyId16 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        layout: "horizontal",
        id: "__alloyId16"
    });
    $.__views.cloudStatusBar.add($.__views.__alloyId16);
    $.__views.__alloyId17 = Ti.UI.createLabel({
        font: {
            fontSize: "16sp",
            fontWeight: "bold"
        },
        color: "#FFFFFF",
        width: Ti.UI.SIZE,
        text: L("lbl.username") + L("", ":"),
        id: "__alloyId17"
    });
    $.__views.__alloyId16.add($.__views.__alloyId17);
    $.__views.lblUsername = Ti.UI.createLabel({
        font: {
            fontSize: "16sp",
            fontWeight: "bold"
        },
        color: "#FFFFFF",
        width: Ti.UI.SIZE,
        id: "lblUsername",
        left: "10dp"
    });
    $.__views.__alloyId16.add($.__views.lblUsername);
    $.__views.__alloyId18 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        layout: "vertical",
        top: "50%",
        id: "__alloyId18"
    });
    $.__views.__alloyId15.add($.__views.__alloyId18);
    $.__views.__alloyId19 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "__alloyId19"
    });
    $.__views.__alloyId18.add($.__views.__alloyId19);
    $.__views.btnTwitterLogin = Ti.UI.createButton({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "btnTwitterLogin",
        title: L("btn.twitterLogin")
    });
    $.__views.__alloyId19.add($.__views.btnTwitterLogin);
    $.__views.btnLogout = Ti.UI.createButton({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "btnLogout",
        title: L("btn.logout")
    });
    $.__views.__alloyId19.add($.__views.btnLogout);
    $.__views.btnClose = Ti.UI.createButton({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "btnClose",
        title: L("btn.close")
    });
    $.__views.__alloyId18.add($.__views.btnClose);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var dialogs = require("alloy/dialogs");
    onLoginStateChanged();
    $.btnTwitterLogin.addEventListener("click", function() {
        Util.User.twitterAccountLogin(function() {
            return onLoginStateChanged();
        });
    });
    $.btnLogout.addEventListener("click", function() {
        dialogs.confirm({
            message: Util.TI.Locale.getString("confirm.logout"),
            callback: function() {
                Util.User.logout(function() {
                    return onLoginStateChanged();
                });
            }
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