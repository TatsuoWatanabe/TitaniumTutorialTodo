declare var $;
$.todoLimit.minDate = new Date();

/**
 * テキストエリアからフォーカスを外します。
 */
$.addWrap.addEventListener('click', () => {
    $.inputTask.blur();
});

/**
 * saveTask
 */
$.saveTask.addEventListener('click', () => {
    var todo = <models.Todo>Alloy.createModel('Todo', {
        task: $.inputTask.value,
        lastModifiedAt: new Date().getTime(),
        createdAt     : new Date().getTime(),
        done: false.toString()
    });
   
    if (todo.isValid()) {
        todo.save();
        $.addWin.close({animated: true});
        Alloy.Collections.Todo.fetch();
        alert($.inputTask.value + ': saved.');
    } else {
        var validResult = todo.validate(todo.toJSON());
        todo.destroy();
        alert($.inputTask.value + '\n' + validResult);
    }
});
