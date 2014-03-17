/**
 * open AddTask window.
 */
$.openAddTask = function() {
    if (Alloy.Globals.currentTab === undefined) {
        Alloy.Globals.currentTab = Alloy.createController('index').getView('tasksTab');
    }
    const addWin = Alloy.createController('Add').getView('addWin');
    Alloy.Globals.currentTab.open(addWin);
};

/**
 * filter the Tasks model collection data.
 */
$.tasksTable.dataFilter = function(collection) {
    return collection.where({ done: false.toString() });
};