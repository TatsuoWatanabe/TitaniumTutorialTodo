class Todo extends Backbone.Model {
    config = {
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
    
    definition = {
        config: this.config,
        extendModel: function (Model: Backbone.Model) {
            _.extend(Model.prototype, this);
            return Model;
        },
        extendCollection: function(Collection: Backbone.Collection) {
            _.extend(Collection.prototype, {
                // extended functions and properties go here
            });
            return Collection;
        }
    }
    
    /**
     * modelのデータをJSONオブジェクトに変換して返します。
     */
    toJSON(options?: any) {
        var obj = this.config.columns; //型推論によりデータ型取得
        obj = super.toJSON(options); //代入による型変換
        return obj; //返却値の型推論によりtoJSONメソッドの型をconfig.columnsと同期
    }
            
    /**
     * toJSONで返却されるオブジェクトに拡張メンバを追加して返します。
     * @return Object
     */
    toJsonExtended() {
        var obj = this.config.columns; //型推論によりデータ型取得
        obj = _.extend(this.toJSON(), {
            limitTimeFormatted: this.formatted('limitTime', 'YYYY/MM/DD h:mm')
        });
        return obj;
    }
    
    /**
     * use moment.js format function
     * @return String
     */
    formatted(columnName: string, format: string) {
        var moment: MomentStatic = require('alloy/moment');
        return moment(Number(this.get(columnName))).format(format);
    }
}

declare var exports: {definition: any};
var entity = new Todo();
exports.definition = entity.definition;