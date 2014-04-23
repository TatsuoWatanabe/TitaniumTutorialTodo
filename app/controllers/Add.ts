declare var $;
$.todoLimit.minDate = new Date();

/**
 * テキストエリアからフォーカスを外します。
 */
$.addWrap.addEventListener('click', function() {
    $.inputTask.blur();
});

/**
 * saveTask
 */
$.saveTask.addEventListener('click', function () {
    var todo = <models.Todo>Alloy.createModel('Todo', {
        task: $.inputTask.value,
        limitTime: $.todoLimit.value.getTime(),
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
