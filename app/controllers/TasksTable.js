/**
 * table click event handler.
 */
$.tasksTable.addEventListener('click', function(e) {
    const dialogs = require('alloy/dialogs');
    const model = Alloy.Collections.Todo.where({
        alloy_id: e.rowData._id
    })[0];
    const isDone = model.get('done') === true.toString();

    dialogs.confirm({
        message: '[' + model.get('task') + '] ' + (isDone ? 'not Done?' : 'Done?'),
        callback: function() {
            model.set({done: (!isDone).toString()}).save();
        }
    });
});

/**
 * format the Tasks model data.
 */
function dataTransform(model) {
    return model.getTableViewFormattedJson();
}

/**
 * filter the Tasks model collection data.
 */
function dataFilter(collection) {
    if ($.dataFilter) {
        return $.dataFilter(collection);
    } else {
        return collection.models;
    }
}
