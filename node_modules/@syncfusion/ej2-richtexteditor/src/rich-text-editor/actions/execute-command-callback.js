import * as events from '../base/constant';
import { isNullOrUndefined as isNOU } from '@syncfusion/ej2-base';
/**
 * `ExecCommandCallBack` module is used to run the editor manager command
 */
var ExecCommandCallBack = /** @class */ (function () {
    function ExecCommandCallBack(parent) {
        this.parent = parent;
        this.addEventListener();
    }
    ExecCommandCallBack.prototype.addEventListener = function () {
        this.parent.on(events.execCommandCallBack, this.commandCallBack, this);
        this.parent.on(events.destroy, this.removeEventListener, this);
    };
    ExecCommandCallBack.prototype.commandCallBack = function (args) {
        var formatPainterCopy = !isNOU(args.requestType) && args.requestType === 'FormatPainter' && args.action === 'format-copy';
        if (!isNOU(args) && !isNOU(args.requestType) && args.requestType !== 'Undo' && args.requestType !== 'Redo' && !formatPainterCopy) {
            this.parent.formatter.saveData();
        }
        this.parent.notify(events.toolbarRefresh, { args: args });
        this.parent.notify(events.count, {});
    };
    ExecCommandCallBack.prototype.removeEventListener = function () {
        this.parent.off(events.execCommandCallBack, this.commandCallBack);
        this.parent.off(events.destroy, this.removeEventListener);
    };
    return ExecCommandCallBack;
}());
export { ExecCommandCallBack };
