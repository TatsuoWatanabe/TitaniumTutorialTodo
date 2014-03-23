declare module Alloy {
    var Globals: any;
    var Collections: any;
    function createCollection(name: string, ...args: Array<any>): Backbone.Collection;
    function createController(name: string, ...args: Array<any>);
}

// ------------------------------------------------------------------------------------
// --- http://docs.appcelerator.com/titanium/3.0/#!/guide/Alloy_Controllers
// --- The following are the constants defined by Alloy for use in the controller code
// ------------------------------------------------------------------------------------
/**  true if the current compiler target is Android */
declare var OS_ANDROID : boolean;
/**  true if the current compiler target is BlackBerry */
declare var OS_BLACKBERRY: boolean;
/**  true if the current compiler target is iOS */
declare var OS_IOS : boolean;
/**  true if the current compiler target is Mobile Web */
declare var OS_MOBILEWEB : boolean;
/**  true if the current compiler target is Tizen */
declare var OS_TIZEN : boolean;
/**  true if the current compiler target is built for development (running in the simulator or emulator) */
declare var ENV_DEV : boolean;
/**  true if the current compiler target is built for testing on a device */
declare var ENV_TEST : boolean;
/**  true if the current compiler target is built for production (running after a packaged installation) */
declare var ENV_PRODUCTION : boolean;

declare module "alloy" {
    export = Alloy;
}