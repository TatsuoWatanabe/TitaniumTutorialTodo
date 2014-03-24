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
$.saveTask.addEventListener('click', function saveTask() {
    var todo = <models.Todo>Alloy.createModel('Todo', {
        task: $.inputTask.value,
        limitTime: $.todoLimit.value.getTime(),
        done: false.toString()
    });
     
    if (todo.isValid()) {
        todo.save();
        $.addWin.close({animated: true});
        alert($.inputTask.value + ': saved.');
        Alloy.Collections.Todo.fetch();
    } else {
        todo.destroy();
        alert($.inputTask.value + ' failed.');
    }
});
