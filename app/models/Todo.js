exports.definition = {
    config: {
        columns: {
            "task": "text",
            "limitTime": "numeric",
            "done": "text"
        },
        adapter: {
            type: "sql",
            collection_name: "Todo"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {
            // extended functions and properties go here
            validate: function(attr) {
                if (!attr.task) { return 'Error: Task is not input.'; }
                if (!attr.limitTime) { return 'Error: Limit time is not set.'; }
            },
            
            /**
             * use moment.js format function
             * @return String
             */
            formatted: function(columnName, format) {
                var moment = require('alloy/moment');
                return moment(Number(this.get(columnName))).format(format);
            },
            
            /**
             * attributesプロパティの複製を拡張したオブジェクトを返します。
             * @return Object
             */
            toJsonExtended: function() {
                return _.extend(this.toJSON(), {
                    limitTimeFormatted: this.formatted('limitTime', 'YYYY/MM/DD h:mm')
                });
            }
        });

        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {
            // extended functions and properties go here
        });

        return Collection;
    }
};