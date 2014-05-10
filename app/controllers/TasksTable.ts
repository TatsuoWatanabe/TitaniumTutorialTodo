// Trigger the synchronization
Alloy.Collections.Todo.fetch();

// table click event handler.
$.tasksTable.addEventListener('click', (e) => {
    var dialogs = require('alloy/dialogs');
    var todo: models.Todo = Alloy.Collections.Todo.where({
        alloy_id: e.rowData._id
    })[0];
    var isDone = todo.get('done') === true.toString();
    
    dialogs.confirm({
        message: '[' + todo.get('task') + '] ' + (isDone ? 'Todo?' : 'Done?'),
        callback: () => {
            todo.save({
                lastModifiedAt: new Date().getTime(),
                done: (!isDone).toString()
            });
        }
    });
});

// format the Tasks model data.
function dataTransform(m: models.Todo) {
    return ($.dataTransform) ? $.dataTransform(m) : m.toJsonExtended();
}

// filter the Tasks model collection data.
function dataFilter(c: Backbone.Collection) {
    return ($.dataFilter) ? $.dataFilter(c) : c.models;
}
