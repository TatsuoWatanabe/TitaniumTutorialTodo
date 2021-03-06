declare var $;

$.inputTask.addEventListener('change', (e) => {
    $.strlen.text = $.inputTask.value.length;
});

// save the task
$.btnSave.addEventListener('click', () => {
    var todo = <models.Todo>Alloy.createModel('Todo', {
        task          : $.inputTask.value,
        lastModifiedAt: new Date().getTime(),
        createdAt     : new Date().getTime(),
        done          : false.toString()
    });
   
    if (todo.isValid()) {
        todo.save();
        $.addWin.close({animated: true});
        Alloy.Collections.Todo.fetch();
        alert($.inputTask.value + ': saved.');
    } else {
        var reason = todo.validate(todo.toJSON());
        todo.destroy();
        alert(reason);
    }
});

// Close
$.btnClose.addEventListener('click', () => {
    $.addWin.close({animated: true});
});