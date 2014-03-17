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
    const todoEntity = Alloy.createModel('Todo', {
        task: $.inputTask.value,
        limitTime: $.todoLimit.value.getTime(),
        done: false.toString()
    });
    
    if (todoEntity.isValid()) {
        todoEntity.save();
        $.addWin.close({animated: true});
        alert($.inputTask.value + ': saved.');
        Alloy.Collections.Todo.fetch();
    } else {
        todoEntity.destroy();
        alert($.inputTask.value + ' failed.');
    }
});
