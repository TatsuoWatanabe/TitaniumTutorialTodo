/**
 * filter the Tasks model collection data.
 */
$.tasksTable.dataFilter = function(collection) {
    return collection.where({ done: true.toString() });
};