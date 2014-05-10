var __extends = this.__extends || function(d, b) {
    function __() {
        this.constructor = d;
    }
    for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
    __.prototype = b.prototype;
    d.prototype = new __();
};

var models;

(function(models) {
    var Todo = function(_super) {
        function Todo(attributes, options) {
            _super.call(this, attributes, options);
            this.config = Todo.config;
            this.exportsDefinition = Todo.exportsDefinition;
        }
        __extends(Todo, _super);
        Todo.prototype.validate = function(attr) {
            return 0 >= attr.task.length ? Util.TI.Locale.getString("validate.task.empty") : void 0;
        };
        Todo.prototype.toJSON = function(options) {
            return _super.prototype.toJSON.call(this, options);
        };
        Todo.prototype.toJsonExtended = function(options) {
            var obj = this.toJSON(options);
            var format = "YYYY/MM/DD H:mm";
            var extObj = _.extend(obj, {
                lastModifiedAtFormatted: this.formatted("lastModifiedAt", format),
                createdAtFormatted: this.formatted("createdAt", format),
                stateText: obj.done === true.toString() ? "Done" : "Todo",
                stateColor: obj.done === true.toString() ? "blue" : "red"
            });
            return extObj;
        };
        Todo.prototype.formatted = function(columnName, format) {
            var moment = require("alloy/moment");
            return moment(Number(this.get(columnName))).format(format);
        };
        Todo.config = {
            columns: {
                task: "text",
                lastModifiedAt: "numeric",
                createdAt: "numeric",
                done: "text"
            },
            adapter: {
                type: "sql",
                collection_name: "Todo"
            }
        };
        Todo.exportsDefinition = {
            config: Todo.config,
            extendModel: function(Model) {
                _.extend(Model.prototype, Todo.prototype);
                return Model;
            },
            extendCollection: function(Collection) {
                _.extend(Collection.prototype, {});
                return Collection;
            }
        };
        return Todo;
    }(Backbone.Model);
    models.Todo = Todo;
})(models || (models = {}));

exports.definition = models.Todo.exportsDefinition;

var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("Todo", exports.definition, []);

collection = Alloy.C("Todo", exports.definition, model);

exports.Model = model;

exports.Collection = collection;