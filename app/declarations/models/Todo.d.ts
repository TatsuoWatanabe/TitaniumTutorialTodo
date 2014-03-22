declare module models {
    interface Todo extends Backbone.Model {
        toJSON(): {
            task: string;
            limitTime: number;
            done: string;
        };
        toJsonExtended(): {
            task: string;
            limitTime: number;
            done: string;
            limitTimeFormatted: string;
        }
    }
}