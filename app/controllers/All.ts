$.tasksTable.dataTransform = (m: models.Todo)
    => _.extend(m.toJsonExtended(), {'stateVisible': true});