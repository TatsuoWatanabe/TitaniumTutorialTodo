/**
 * filter the Tasks model collection data.
 */ 
$.tasksTable.dataFilter = (c: any) => c.where({ done: true.toString() });
