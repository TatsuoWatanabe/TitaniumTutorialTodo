/// <reference path="../typings/reference.d.ts"/>

var isNetworkConnected = true; // TODO: ネットワーク接続判定

// initialise Cloud User
if (Util.Settings.UseCloud.enable && isNetworkConnected)  {
    Util.User.loginBySavedSessionId();
}

/**
 * tabOpen event handler
 */
function tabOpen(e) {
    // Android だったらアクションバーにメニューを表示する
    if (OS_ANDROID) {
        var activity: Ti.Android.Activity = $.index.getActivity(); 
        activity.onCreateOptionsMenu = function (evt) {
            
            // Add Button
            evt.menu.add({
                title: 'Add',
                icon: Ti.Android.R.drawable.ic_menu_edit,
                showAsAction: Ti.Android.SHOW_AS_ACTION_IF_ROOM
            }).addEventListener('click', () => $.tasks.openWindow('Add', 'addWin'));
            
            // User Button
            evt.menu.add({
                title: 'User',
                icon: Ti.Android.R.drawable.ic_lock_idle_charging,
                showAsAction: Ti.Android.SHOW_AS_ACTION_IF_ROOM
            }).addEventListener('click', () => $.tasks.openWindow('User', 'userWin'));
            
        };
        activity.invalidateOptionsMenu();
    } else {
        $.tasks.btnAdd.addEventListener('click',  () => $.tasks.openWindow('Add', 'addWin'));
        $.tasks.btnUser.addEventListener('click', () => $.tasks.openWindow('User', 'userWin'));
    }
}

// tabFocus event handler
function tabFocus(e) {
  // タブを切り替えたらそのタブをグローバルに参照できるようにする
  Alloy.Globals.currentTab = e.tab;
}

// close event handler
$.index.addEventListener('close', function() {
    $.destroy();
});

$.index.open();