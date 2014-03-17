const moment = require("alloy/moment");

exports.definition = {
    config: {
        columns: {
            task: "text",
            limitTime: "numeric",
            done: "text"
        },
        adapter: {
            type: "sql",
            collection_name: "Todo"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {
            validate: function(attr) {
                if (!attr.task) return "Error: Task is not input.";
                if (!attr.limitTime) return "Error: Limit time is not set.";
            },
            formatted: function(columnName, format) {
                return moment(Number(this.get(columnName))).format(format);
            },
            getTableViewFormattedJson: function() {
                const obj = this.toJSON();
                obj.limitTime = this.formatted("limitTime", "YYYY/MM/DD h:mm");
                return obj;
            }
        });
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {});
        return Collection;
    }
};

var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("Todo", exports.definition, []);

collection = Alloy.C("Todo", exports.definition, model);

exports.Model = model;

exports.Collection = collection;