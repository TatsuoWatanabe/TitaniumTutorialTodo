/**
 * set global current tab to back from other window.
 */
function initializeGlobalCurrentTab() {
    if (Alloy.Globals.currentTab === undefined) {
        Alloy.Globals.currentTab = Alloy.createController('index').getView('tasksTab');
    }
}

/**
 * open other window.
 */
$.openWindow = function(controllerName: string, viewId: string) {
    initializeGlobalCurrentTab();
    var window = Alloy.createController(controllerName).getView(viewId);
    Alloy.Globals.currentTab.open(window);
};

/**
 * filter the Tasks model collection data.
 */
$.tasksTable.dataFilter = (c: Backbone.Collection) => c.where({ done: false.toString() });