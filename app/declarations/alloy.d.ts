declare module Alloy {
    var Globals: any;
    var Collections: any;
    function createCollection(name: string, ...args: Array<any>): Backbone.Collection;
    function createController(name: string, ...args: Array<any>);
}

declare module "alloy" {
    export = Alloy;
}