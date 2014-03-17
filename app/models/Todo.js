const moment = require('alloy/moment');

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
                return moment(Number(this.get(columnName))).format(format);
            },
            
            /**
             * テーブル出力用に整形した値を持ったオブジェクトを返します。
             * @return Object
             */
            getTableViewFormattedJson: function() {
                const obj = this.toJSON();
                obj.limitTime = this.formatted('limitTime', 'YYYY/MM/DD h:mm');
                return obj;
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