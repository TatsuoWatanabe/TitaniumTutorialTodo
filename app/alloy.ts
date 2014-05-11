// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

Alloy.Collections.Todo = Alloy.createCollection("Todo");

module Util {
    export module TI {
        export module App {
            export var Properties: Ti.App.Properties = Ti.App['Properties'];
        }
        export var API: Ti.API = Ti['API'];
        export var Locale: Ti.Locale = Ti['Locale'];
        export var Cloud: typeof Ti.Cloud = require('ti.cloud');
        export var CloudUsers: Ti.Cloud.Users = Cloud['Users'];
        export var CloudSocialIntegrations: Ti.Cloud.SocialIntegrations = Cloud['SocialIntegrations'];
    }
    
    // Application setting module
    export module Settings {
        module PropertyNames {
            export var sessionId = 'sessionId';
            export var login     = 'login';
            export var useCloud  = 'useCloud';
        }
        
        // user's cloud sessionId.
        export class SessionId {
            public static get value() { return TI.App.Properties.getString(PropertyNames.sessionId); }
            public static set value(v: string) { TI.App.Properties.setString(PropertyNames.sessionId, v); }
            
            // set the saved sessionId to Cloud Object.
            public static restore() { TI.Cloud.sessionId = SessionId.value; }
            
            // save the sessionId from Cloud Object to titanium property.
            public static update() { SessionId.value = TI.Cloud.sessionId; }
            
            // clear the session values.
            public static clear() {
                TI.Cloud.sessionId = '';
                TI.App.Properties.removeProperty(PropertyNames.sessionId);
            }
        }
        
        // user's twitter information.
        export class Login {
            public static get value() { return TI.App.Properties.getString(PropertyNames.login); }
            public static set value(v: string) { TI.App.Properties.setString(PropertyNames.login, v); }
            public static get username(): string { return Login.getProperty('username') || ''; }  
            public static get userid(): string { return Login.getProperty('userid') || ''; }
            public static get isLoggedIn() { return Login.username ? true : false; }
            public static clear() { TI.App.Properties.removeProperty(PropertyNames.login); }
            private static getProperty(key: string) {
                var user = JSON.parse(Login.value) || {};
                return user[key];
            }
        }
        
        // setting of use cloud.
        export class UseCloud {
            public static get enable() { return true; /* return TI.App.Properties.getBool(PropertyNames.useCloud); */ }
            public static set enable(v: boolean) { TI.App.Properties.setBool(PropertyNames.useCloud, v); }
        }
    }
    
    // user management module.
    export class User {
        private static params = {
            site          : 'twitter',
            consumerKey   : 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
            consumerSecret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
        };
        private static social = require('alloy/social').create(User.params);
    
        public static twitterAccountLogin(callback?: () => void) {
            var login = () => {
                User.externalAccountLogin({
                    type:  User.params.site,
                    id  :  Settings.Login.username,
                    token: TI.App.Properties.getString('Social.js-AccessToken-' + User.params.site)
                }, callback);
            };
            
            // If not authorized, get authorization from the user
            if(User.social.isAuthorized()) { login(); }
            else {
                User.social.authorize((user) => {
                    Settings.Login.value = JSON.stringify(user);
                    login();
                });
            }
        }
        
        // login by saved sessionId.
        public static loginBySavedSessionId() {
            Settings.SessionId.restore();
            TI.CloudUsers.showMe((e) => {
                if (e.success) { Settings.SessionId.update(); }
                else { User.logout() }
            });
        }
        
        // logout and clear user information.
        public static logout(callback?: () => void) {
            TI.CloudUsers.logout(() => {
                Settings.SessionId.clear();
                Settings.Login.clear();
                User.social.deauthorize();
                callback && callback();
            });
        }
        
        private static externalAccountLogin(params: {type: string; id: string; token: string}, callback?: () => void) {
            TI.CloudSocialIntegrations.externalAccountLogin(params, (e) => {
                if (e.success) { Settings.SessionId.update(); callback && callback(); }
                else { alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e))); }
            });
        }
    }
}