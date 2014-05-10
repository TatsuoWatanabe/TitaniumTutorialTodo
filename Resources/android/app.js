var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Alloy.Collections.Todo = Alloy.createCollection("Todo");

var Util;

(function(Util) {
    (function(TI) {
        (function(App) {
            App.Properties = Ti.App["Properties"];
        })(TI.App || (TI.App = {}));
        TI.App;
        TI.API = Ti["API"];
        TI.Locale = Ti["Locale"];
        TI.Cloud = require("ti.cloud");
        TI.CloudUsers = TI.Cloud["Users"];
        TI.CloudSocialIntegrations = TI.Cloud["SocialIntegrations"];
    })(Util.TI || (Util.TI = {}));
    var TI = Util.TI;
    (function(Settings) {
        var PropertyNames;
        (function(PropertyNames) {
            PropertyNames.sessionId = "sessionId";
            PropertyNames.login = "login";
            PropertyNames.useCloud = "useCloud";
        })(PropertyNames || (PropertyNames = {}));
        var SessionId = function() {
            function SessionId() {}
            Object.defineProperty(SessionId, "value", {
                get: function() {
                    return TI.App.Properties.getString(PropertyNames.sessionId);
                },
                set: function(v) {
                    TI.App.Properties.setString(PropertyNames.sessionId, v);
                },
                enumerable: true,
                configurable: true
            });
            SessionId.restore = function() {
                TI.Cloud.sessionId = SessionId.value;
            };
            SessionId.update = function() {
                SessionId.value = TI.Cloud.sessionId;
            };
            SessionId.clear = function() {
                TI.Cloud.sessionId = "";
                TI.App.Properties.removeProperty(PropertyNames.sessionId);
            };
            return SessionId;
        }();
        Settings.SessionId = SessionId;
        var Login = function() {
            function Login() {}
            Object.defineProperty(Login, "value", {
                get: function() {
                    return TI.App.Properties.getString(PropertyNames.login);
                },
                set: function(v) {
                    TI.App.Properties.setString(PropertyNames.login, v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Login, "username", {
                get: function() {
                    return Login.getProperty("username") || "";
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Login, "userid", {
                get: function() {
                    return Login.getProperty("userid") || "";
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Login, "isLoggedIn", {
                get: function() {
                    return Login.username ? true : false;
                },
                enumerable: true,
                configurable: true
            });
            Login.clear = function() {
                TI.App.Properties.removeProperty(PropertyNames.login);
            };
            Login.getProperty = function(key) {
                var user = JSON.parse(Login.value) || {};
                return user[key];
            };
            return Login;
        }();
        Settings.Login = Login;
        var UseCloud = function() {
            function UseCloud() {}
            Object.defineProperty(UseCloud, "enable", {
                get: function() {
                    return true;
                },
                set: function(v) {
                    TI.App.Properties.setBool(PropertyNames.useCloud, v);
                },
                enumerable: true,
                configurable: true
            });
            return UseCloud;
        }();
        Settings.UseCloud = UseCloud;
    })(Util.Settings || (Util.Settings = {}));
    var Settings = Util.Settings;
    var User = function() {
        function User() {}
        User.twitterAccountLogin = function(callback) {
            var login = function() {
                User.externalAccountLogin({
                    type: User.params.site,
                    id: Settings.Login.username,
                    token: TI.App.Properties.getString("Social.js-AccessToken-" + User.params.site)
                }, callback);
            };
            User.social.isAuthorized() ? login() : User.social.authorize(function(user) {
                Settings.Login.value = JSON.stringify(user);
                login();
            });
        };
        User.loginBySavedSessionId = function() {
            Settings.SessionId.restore();
            TI.CloudUsers.showMe(function(e) {
                e.success ? Settings.SessionId.update() : User.logout();
            });
        };
        User.logout = function(callback) {
            TI.CloudUsers.logout(function() {
                Settings.SessionId.clear();
                Settings.Login.clear();
                User.social.deauthorize();
                callback && callback();
            });
        };
        User.externalAccountLogin = function(params, callback) {
            TI.CloudSocialIntegrations.externalAccountLogin(params, function(e) {
                if (e.success) {
                    Settings.SessionId.update();
                    callback && callback();
                } else alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
            });
        };
        User.params = {
            site: "twitter",
            consumerKey: "WL1kfLxbaR8ARMCJYSd1YUSfS",
            consumerSecret: "M4i5TKFPTu5bUJ0U8eqZVqPVXp1UcL9L02PXaFndLG66WYkrqM"
        };
        User.social = require("alloy/social").create(User.params);
        return User;
    }();
    Util.User = User;
})(Util || (Util = {}));

Alloy.createController("index");