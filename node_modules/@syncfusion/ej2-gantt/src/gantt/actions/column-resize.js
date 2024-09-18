var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { TreeGrid, Resize as TreeGridResize } from '@syncfusion/ej2-treegrid';
/**
 * Column resize action related code goes here
 */
var Resize = /** @class */ (function () {
    function Resize(gantt) {
        this.parent = gantt;
        TreeGrid.Inject(TreeGridResize);
        this.parent.treeGrid.allowResizing = this.parent.allowResizing;
        this.bindEvents();
    }
    /**
     * Get module name
     *
     * @returns {void} .
     */
    Resize.prototype.getModuleName = function () {
        return 'resize';
    };
    /**
     * To bind resize events.
     *
     * @returns {void} .
     * @private
     */
    Resize.prototype.bindEvents = function () {
        var _this = this;
        this.parent.treeGrid.resizeStart = function (args) {
            if (_this.parent.undoRedoModule && _this.parent['isUndoRedoItemPresent']('ColumnResize')) {
                _this.parent.undoRedoModule['createUndoCollection']();
                var details = {};
                details['action'] = 'ColumnResize';
                details['resizedColumn'] = __assign({}, args.column);
                _this.parent.undoRedoModule['getUndoCollection'][_this.parent.undoRedoModule['getUndoCollection'].length - 1] = details;
            }
            _this.parent.trigger('resizeStart', args);
        };
        this.parent.treeGrid.resizing = function (args) {
            _this.parent.trigger('resizing', args);
        };
        this.parent.treeGrid.resizeStop = function (args) {
            _this.parent.trigger('resizeStop', args);
        };
    };
    /**
     * To destroy the column-resizer.
     *
     * @returns {void} .
     * @private
     */
    Resize.prototype.destroy = function () {
        // Destroy Method
    };
    return Resize;
}());
export { Resize };
