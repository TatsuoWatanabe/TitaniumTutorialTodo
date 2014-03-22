declare var $:any;

/**
 * filter the Tasks model collection data.
 */ 
$.tasksTable.dataFilter = (c: Backbone.Collection) => c.where({ done: true.toString() });
