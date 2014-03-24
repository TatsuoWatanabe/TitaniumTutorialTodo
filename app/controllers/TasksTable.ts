declare var $;

/**
 * table click event handler.
 */
$.tasksTable.addEventListener('click', function(e) {
    var dialogs = require('alloy/dialogs');
    var model: models.Todo = Alloy.Collections.Todo.where({
        alloy_id: e.rowData._id
    })[0];
    var isDone = model.get('done') === true.toString();
    
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
function dataTransform(m: models.Todo) {
    return ($.dataTransform) ? $.dataTransform(m) : m.toJsonExtended();
}

/**
 * filter the Tasks model collection data.
 */
function dataFilter(c: Backbone.Collection) {
    return ($.dataFilter) ? $.dataFilter(c) : c.models;
}
