/// <reference path="../declarations/reference.d.ts"/>

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
                icon: '',
                showAsAction: Ti.Android.SHOW_AS_ACTION_IF_ROOM
            }).addEventListener('click', () => $.tasks.openWindow('Add', 'addWin'));
            
            // User Button
            evt.menu.add({
                title: 'User',
                icon: '',
                showAsAction: Ti.Android.SHOW_AS_ACTION_IF_ROOM
            }).addEventListener('click', () => $.tasks.openWindow('User', 'userWin'));
            
        };
        activity.invalidateOptionsMenu();
    } else {
        $.tasks.addButton.addEventListener('click',  () => $.tasks.openWindow('Add', 'addWin'));
        $.tasks.userButton.addEventListener('click', () => $.tasks.openWindow('User', 'userWin'));
    }
}

/**
 * tabFocus event handler
 */
function tabFocus(e) {
  // タブを切り替えたらそのタブをグローバルに参照できるようにする
  Alloy.Globals.currentTab = e.tab;
}

/**
 * close event handler
 */
$.index.addEventListener('close', function() {
    $.destroy();
});

$.index.open();