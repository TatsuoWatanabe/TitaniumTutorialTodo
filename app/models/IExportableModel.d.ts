interface IExportableModel {
    config: {
        columns: any;
        adapter: {
            type: any;
            collection_name: any
        }
    };
    
    exportsDefinition: {
        config: typeof config;
        extendModel: (Model: Backbone.Model) => Backbone.Model;
        extendCollection: (Collection: Backbone.Collection) => Backbone.Collection;
    };
}