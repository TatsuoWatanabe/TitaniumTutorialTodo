var dialogs = require('alloy/dialogs');

function onLoginStateChanged() {
    var isLoggedIn = Util.Settings.Login.isLoggedIn;
    $.cloudStatusBar.visible  = isLoggedIn;
    $.btnTwitterLogin.visible = !isLoggedIn;
    $.btnLogout.visible       = isLoggedIn;
    $.lblUsername.text        = Util.Settings.Login.username;
}

// Login state initialize.
onLoginStateChanged();

// Login
$.btnTwitterLogin.addEventListener('click', () => {
    Util.User.twitterAccountLogin(() => onLoginStateChanged());
});

// Logout
$.btnLogout.addEventListener('click', () => {
    dialogs.confirm({
        message: Util.TI.Locale.getString('confirm.logout'),
        callback: () => {
            Util.User.logout(() => onLoginStateChanged());
        }
    });
});

// Close
$.btnClose.addEventListener('click', () => {
    $.userWin.close({animated: true});
});