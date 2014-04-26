var Cloud = require('ti.cloud');
var CloudUsers: Ti.Cloud.Users = Cloud.Users;
var TiApi: Ti.API = Ti['API'];
var TiProperties: Ti.App.Properties = Ti.App['Properties'];

// Create User
$.btnCreate.addEventListener('click', function() {
    CloudUsers.create({
        username: $.txtUserName.value,
        password: $.txtPassword.value,
        password_confirmation: $.txtPassword.value,
        first_name: $.txtUserName.value,
        last_name: $.txtUserName.value,
        email: $.txtMailAddress.value
    }, function (e) {
        if (e.success) {
            var user = e.users[0];
            alert('Created! You are now logged in as ' + user.id);
            $.txtUserName.value = $.txtPassword.value = '';
        } else {
            var msg: string = (e.error && e.message) || JSON.stringify(e);
            if (e.code) { 
                alert(msg);
            } else { TiApi.error(msg); }
        }
    });
});

// Login
$.btnLogin.addEventListener('click', function() {
    
    Util.TI.CloudUsers.login({
        login:    $.txtUserName.value,
        password: $.txtPassword.value
    }, function (e) {
        if (e.success) {
            var user = e.users[0];
            
            alert('Success:\n' +
                'id: ' + user.id + '\n' +
                'sessionId: ' + Cloud.sessionId + '\n' +
                'first name: ' + user.first_name + '\n' +
                'last name: ' + user.last_name);
        } else {
            alert('Error:\n' +
                ((e.error && e.message) || JSON.stringify(e)));
        }
    });
});

// Close
$.btnClose.addEventListener('click', function() {
    $.userWin.close({animated: true});
});