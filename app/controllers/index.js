/**
 * tabOpen event handler
 */
function tabOpen(e) {
    // Android だったらアクションバーにメニューを表示する
    if (OS_ANDROID) {
        const activity = $.index.getActivity();
        activity.onCreateOptionsMenu = function (evt) {
            evt.menu.add({
                title: 'Add',
                icon: '',
                showAsAction: Ti.Android.SHOW_AS_ACTION_IF_ROOM
            }).addEventListener('click', $.tasks.openAddTask);
        };
        activity.invalidateOptionsMenu();
    } else {
        $.tasks.addButton.addEventListener('click', $.tasks.openAddTask);
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

// Trigger the synchronization
Alloy.Collections.Todo.fetch();
