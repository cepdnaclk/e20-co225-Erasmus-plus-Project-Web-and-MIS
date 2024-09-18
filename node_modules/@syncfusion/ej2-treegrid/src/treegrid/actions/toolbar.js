import { Grid, Toolbar as tool } from '@syncfusion/ej2-grids';
import * as events from '../base/constant';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
/**
 * Toolbar Module for TreeGrid
 *
 * @hidden
 */
var Toolbar = /** @class */ (function () {
    function Toolbar(parent) {
        Grid.Inject(tool);
        this.parent = parent;
        this.addEventListener();
    }
    /**
     * For internal use only - Get the module name.
     *
     * @private
     * @returns {string} - Returns Toolbar module name
     */
    Toolbar.prototype.getModuleName = function () {
        return 'toolbar';
    };
    /**
     * @hidden
     * @returns {void}
     */
    Toolbar.prototype.addEventListener = function () {
        this.parent.on(events.rowSelected, this.refreshToolbar, this);
        this.parent.on(events.rowDeselected, this.refreshToolbar, this);
        this.parent.on(events.toolbarClick, this.toolbarClickHandler, this);
    };
    /**
     * @hidden
     * @returns {void}
     */
    Toolbar.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off(events.rowSelected, this.refreshToolbar);
        this.parent.off(events.rowDeselected, this.refreshToolbar);
        this.parent.off(events.toolbarClick, this.toolbarClickHandler);
    };
    Toolbar.prototype.refreshToolbar = function (args) {
        var toolbarElement = this.parent.grid.toolbarModule.getToolbar();
        if (!isNullOrUndefined(toolbarElement)) {
            var tObj = this.parent;
            var indentElement = void 0;
            var outdentElement = void 0;
            var indentID = tObj.element.id + '_gridcontrol_indent';
            var outdentID = tObj.element.id + '_gridcontrol_outdent';
            var indentEle = toolbarElement.querySelector('#' + indentID);
            var outdentEle = toolbarElement.querySelector('#' + outdentID);
            var row = args.row;
            var selectedrow = tObj.getSelectedRows()[0];
            if (!isNullOrUndefined(row[0])) {
                row = row[0];
            }
            row = (!isNullOrUndefined(selectedrow) && selectedrow.rowIndex !== row.rowIndex) ? selectedrow : row;
            if (indentEle !== null && outdentEle !== null) {
                indentElement = toolbarElement.querySelector('#' + indentID).parentElement;
                outdentElement = toolbarElement.querySelector('#' + outdentID).parentElement;
                if (row.rowIndex === 0 || tObj.getSelectedRowIndexes().length > 1) {
                    indentElement.classList.add('e-hidden');
                    outdentElement.classList.add('e-hidden');
                }
                else if (args['name'] !== 'rowDeselected' || (!isNullOrUndefined(selectedrow) && tObj.grid.isCheckBoxSelection)) {
                    var selectedItem = tObj.getCurrentViewRecords()[row.rowIndex];
                    if (!isNullOrUndefined(selectedItem)) {
                        if ((selectedItem.level > tObj.getCurrentViewRecords()[row.rowIndex - 1].level)) {
                            indentElement.classList.add('e-hidden');
                        }
                        else {
                            indentElement.classList.remove('e-hidden');
                        }
                        if (selectedItem.level === tObj.getCurrentViewRecords()[row.rowIndex - 1].level) {
                            indentElement.classList.remove('e-hidden');
                        }
                        if (selectedItem.level === 0) {
                            outdentElement.classList.add('e-hidden');
                        }
                        if (selectedItem.level !== 0) {
                            outdentElement.classList.remove('e-hidden');
                        }
                    }
                }
                if (args['name'] === 'rowDeselected' && isNullOrUndefined(selectedrow) && !tObj.grid.isCheckBoxSelection) {
                    if (this.parent.toolbar['includes']('Indent')) {
                        indentElement.classList.add('e-hidden');
                    }
                    if (this.parent.toolbar['includes']('Outdent')) {
                        outdentElement.classList.add('e-hidden');
                    }
                }
            }
        }
    };
    Toolbar.prototype.toolbarClickHandler = function (args) {
        var tObj = this.parent;
        var indentOutdentAction = 'indentOutdentAction';
        if (this.parent.editSettings.mode === 'Cell' && this.parent.grid.editSettings.mode === 'Batch' &&
            args.item.id === this.parent.grid.element.id + '_update') {
            args.cancel = true;
            this.parent.grid.editModule.saveCell();
        }
        if (args.item.id === this.parent.grid.element.id + '_expandall') {
            this.parent.expandAll();
        }
        if (args.item.id === this.parent.grid.element.id + '_collapseall') {
            this.parent.collapseAll();
        }
        if (args.item.id === tObj.grid.element.id + '_indent' && tObj.getSelectedRecords().length
            && !isNullOrUndefined(tObj.rowDragAndDropModule)) {
            this.parent.rowDragAndDropModule["" + indentOutdentAction](null, 'indent');
        }
        if (args.item.id === tObj.grid.element.id + '_outdent' && tObj.getSelectedRecords().length
            && !isNullOrUndefined(tObj.rowDragAndDropModule)) {
            this.parent.rowDragAndDropModule["" + indentOutdentAction](null, 'outdent');
        }
    };
    /**
     * Gets the toolbar of the TreeGrid.
     *
     * @returns {Element} - Returns Toolbar element
     * @hidden
     */
    Toolbar.prototype.getToolbar = function () {
        return this.parent.grid.toolbarModule.getToolbar();
    };
    /**
     * Enables or disables ToolBar items.
     *
     * @param {string[]} items - Defines the collection of itemID of ToolBar items.
     * @param {boolean} isEnable - Defines the items to be enabled or disabled.
     * @returns {void}
     * @hidden
     */
    Toolbar.prototype.enableItems = function (items, isEnable) {
        this.parent.grid.toolbarModule.enableItems(items, isEnable);
    };
    /**
     * Destroys the ToolBar.
     *
     * @method destroy
     * @returns {void}
     */
    Toolbar.prototype.destroy = function () {
        this.removeEventListener();
    };
    return Toolbar;
}());
export { Toolbar };
