/// <reference path="IExportableModel.d.ts"/>

module models {
    export class Todo extends Backbone.Model implements IExportableModel {
        public config = Todo.config;
        public exportsDefinition = Todo.exportsDefinition
        static config = {
            columns: { 
                "task": "text",
                "limitTime": "numeric",
                "done": "text"
            },
            adapter: {
                type: "sql",
                collection_name: "Todo"
            }
        };
        static exportsDefinition = {
            config: Todo.config,
            extendModel: function(Model: Backbone.Model) {
                _.extend(Model.prototype, Todo.prototype);
                return Model;
            },
            extendCollection: function(Collection: Backbone.Collection) {
                _.extend(Collection.prototype, {
                    // extended functions and properties go here
                });
                return Collection;
            }
        };
        
        constructor(attributes?: any, options?: any) { 
            super(attributes, options);
        }
        
        /**
         * モデルの属性を操作する直前に呼ばれるメソッドで、値を検証する処理を記述します。
         */
        public validate(attr: any) {
          if (attr.task.length <= 0) { return "Error: Task is not input."; }
          else if (String(attr.limitTime).length <= 0) { return "Error: Limit time is not set."; }
          else { return; }
        }
        
        /**
         * modelのデータをJSONオブジェクトに変換して返します。
         */
        public toJSON(options?: any) /* :typeof Todo.config.columns +TypeScript 0.9.1 */ {
            var obj = Todo.config.columns; //型推論
            obj = super.toJSON(options);
            return obj;
        }

        /**
         * toJSONで返却されるオブジェクトに拡張メンバを追加して返します。
         * @return Object
         */
        public toJsonExtended() /* :typeof Todo.config.columns +TypeScript 0.9.1 */ {
            var obj = this.toJSON(); //型推論
            obj = _.extend(obj, {
                limitTimeFormatted: this.formatted('limitTime', 'YYYY/MM/DD h:mm'),
                stateText:  obj.done === true.toString() ? 'Done' : 'Todo',
                stateColor: obj.done === true.toString() ? 'blue' : 'red',
                stateVisible: false
            });
            return obj;
        }
        
        /**
         * use moment.js format function
         */
        private formatted(columnName: string, format: string) {
            var moment: MomentStatic = require('alloy/moment'); 
            return moment(Number(this.get(columnName))).format(format);
        }
    }
}

declare var exports: { definition: any };
exports.definition = models.Todo.exportsDefinition;