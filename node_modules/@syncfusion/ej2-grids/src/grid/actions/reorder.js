import { extend, isNullOrUndefined } from '@syncfusion/ej2-base';
import { closest as closestElement, removeClass, classList, remove } from '@syncfusion/ej2-base';
import { getElementIndex, inArray, parentsUntil, getPosition, isActionPrevent } from '../base/util';
import * as events from '../base/constant';
import * as literals from '../base/string-literals';
/**
 *
 * The `Reorder` module is used for reordering columns.
 */
var Reorder = /** @class */ (function () {
    /**
     * Constructor for the Grid reorder module
     *
     * @param {IGrid} parent - specifies the IGrid
     * @hidden
     */
    function Reorder(parent) {
        this.idx = 0;
        this.parent = parent;
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on(events.headerDrop, this.headerDrop, this);
        this.parent.on(events.uiUpdate, this.enableAfterRender, this);
        this.parent.on(events.reorderComplete, this.onActionComplete, this);
        this.parent.on(events.columnDrag, this.drag, this);
        this.parent.on(events.columnDragStart, this.dragStart, this);
        this.parent.on(events.columnDragStop, this.dragStop, this);
        this.parent.on(events.headerDrop, this.headerDrop, this);
        this.parent.on(events.headerRefreshed, this.createReorderElement, this);
        this.parent.on(events.keyPressed, this.keyPressHandler, this);
        this.parent.on(events.destroy, this.destroy, this);
    }
    Reorder.prototype.chkDropPosition = function (srcElem, destElem) {
        var col = this.parent.getColumnByUid(destElem.firstElementChild.getAttribute('e-mappinguid'));
        var bool = col ? !col.lockColumn : true;
        return ((srcElem.parentElement.isEqualNode(destElem.parentElement) || this.parent.enableColumnVirtualization)
            || (this.parent.isFrozenGrid()
                && Array.prototype.indexOf.call(closestElement(srcElem, 'thead').children, srcElem.parentElement)
                    === Array.prototype.indexOf.call(closestElement(destElem, 'thead').children, destElem.parentElement)))
            && this.targetParentContainerIndex(srcElem, destElem) > -1 && bool;
    };
    Reorder.prototype.chkDropAllCols = function (srcElem, destElem) {
        var isFound;
        var headers = this.getHeaderCells();
        var header;
        while (!isFound && headers.length > 0) {
            header = headers.pop();
            isFound = srcElem !== header && this.targetParentContainerIndex(srcElem, destElem) > -1;
        }
        return isFound;
    };
    Reorder.prototype.findColParent = function (col, cols, parent) {
        // eslint-disable-next-line no-self-assign
        parent = parent;
        for (var i = 0, len = cols.length; i < len; i++) {
            if (col === cols[parseInt(i.toString(), 10)]) {
                return true;
            }
            else if (cols[parseInt(i.toString(), 10)].columns) {
                var cnt = parent.length;
                parent.push(cols[parseInt(i.toString(), 10)]);
                if (!this.findColParent(col, cols[parseInt(i.toString(), 10)].columns, parent)) {
                    parent.splice(cnt, parent.length - cnt);
                }
                else {
                    return true;
                }
            }
        }
        return false;
    };
    Reorder.prototype.getColumnsModel = function (cols, isNotStackedHeader) {
        var columnModel = [];
        var subCols = [];
        for (var i = 0, len = cols.length; i < len; i++) {
            if (!isNullOrUndefined(cols[parseInt(i.toString(), 10)])) {
                if (cols[parseInt(i.toString(), 10)].visible) {
                    columnModel.push(cols[parseInt(i.toString(), 10)]);
                }
                else if (isNotStackedHeader) {
                    columnModel.push(cols[parseInt(i.toString(), 10)]);
                }
                if (cols[parseInt(i.toString(), 10)].columns) {
                    subCols = subCols.concat(cols[parseInt(i.toString(), 10)].columns);
                }
            }
        }
        if (subCols.length) {
            columnModel = columnModel.concat(this.getColumnsModel(subCols));
        }
        return columnModel;
    };
    Reorder.prototype.headerDrop = function (e) {
        var gObj = this.parent;
        var dropElement = this.element.querySelector('.e-headercelldiv') || this.element.querySelector('.e-stackedheadercelldiv');
        var uId = dropElement.getAttribute('e-mappinguid');
        var column = gObj.getColumnByUid(uId);
        if (!closestElement(e.target, 'th') || (!isNullOrUndefined(column) && (!column.allowReordering || column.lockColumn))) {
            this.parent.log('action_disabled_column', { moduleName: this.getModuleName(), column: column });
            return;
        }
        var destElem = closestElement(e.target, '.e-headercell');
        var destElemDiv = destElem.querySelector('.e-headercelldiv') || destElem.querySelector('.e-stackedheadercelldiv');
        var destElemUid = destElemDiv.getAttribute('e-mappinguid');
        if (!isNullOrUndefined(destElemUid)) {
            var destColumn = gObj.getColumnByUid(destElemUid);
            if (isNullOrUndefined(destColumn) || !destColumn.allowReordering || destColumn.lockColumn) {
                this.parent.log('action_disabled_column', { moduleName: this.getModuleName(), column: column, destColumn: destColumn });
                return;
            }
        }
        if (destElem && !(!this.chkDropPosition(this.element, destElem) || !this.chkDropAllCols(this.element, destElem))) {
            if (this.parent.enableColumnVirtualization) {
                var columns = this.parent.columns;
                var sourceUid_1 = this.element.querySelector('.e-headercelldiv').getAttribute('e-mappinguid');
                var col = this.parent.columns.filter(function (col) { return col.uid === sourceUid_1; });
                var colMatchIndex_1 = null;
                var column_1 = col[0];
                var destUid_1 = destElem.querySelector('.e-headercelldiv').getAttribute('e-mappinguid');
                columns.some(function (col, index) {
                    if (col.uid === destUid_1) {
                        colMatchIndex_1 = index;
                        return col.uid === destUid_1;
                    }
                    return false;
                });
                if (!isNullOrUndefined(colMatchIndex_1)) {
                    this.moveColumns(colMatchIndex_1, column_1);
                }
            }
            else {
                var newIndex = this.targetParentContainerIndex(this.element, destElem);
                var uid = this.element.firstElementChild.getAttribute('e-mappinguid');
                this.destElement = destElem;
                this.parent.notify(events.setReorderDestinationElement, { ele: destElem });
                if (uid) {
                    this.moveColumns(newIndex, this.parent.getColumnByUid(uid));
                }
                else {
                    var headers = this.getHeaderCells();
                    var oldIdx = getElementIndex(this.element, headers);
                    var columns = this.getColumnsModel(this.parent.columns);
                    this.moveColumns(newIndex, columns[parseInt(oldIdx.toString(), 10)]);
                }
            }
        }
    };
    Reorder.prototype.isActionPrevent = function (gObj) {
        return isActionPrevent(gObj);
    };
    Reorder.prototype.moveColumns = function (destIndex, column, reorderByColumn, preventRefresh) {
        var gObj = this.parent;
        if (this.isActionPrevent(gObj)) {
            gObj.notify(events.preventBatch, { instance: this, handler: this.moveColumns, arg1: destIndex, arg2: column });
            return;
        }
        var parent = this.getColParent(column, this.parent.columns);
        var cols = parent ? parent.columns : this.parent.columns;
        var srcIdx = inArray(column, cols);
        if ((parent || this.parent.lockcolPositionCount) && !reorderByColumn &&
            !this.parent.enableColumnVirtualization) {
            for (var i = 0; i < cols.length; i++) {
                if (cols[parseInt(i.toString(), 10)].field === column.field) {
                    srcIdx = i;
                    break;
                }
            }
            var col = this.parent.getColumnByUid(this.destElement.firstElementChild.getAttribute('e-mappinguid'));
            if (col) {
                for (var i = 0; i < cols.length; i++) {
                    if (cols[parseInt(i.toString(), 10)].field === col.field) {
                        destIndex = i;
                        break;
                    }
                }
            }
            else {
                for (var i = 0; i < cols.length; i++) {
                    if (cols[parseInt(i.toString(), 10)].headerText === this.destElement.innerText.trim()) {
                        destIndex = i;
                    }
                }
            }
        }
        if (!gObj.allowReordering || srcIdx === destIndex || srcIdx === -1 || destIndex === -1) {
            return;
        }
        cols.splice(destIndex, 0, cols.splice(srcIdx, 1)[0]);
        var args = { column: column, destIndex: destIndex, columns: cols, parent: parent, cancel: false };
        gObj.notify(events.refreshFrozenColumns, args);
        if (args.cancel) {
            return;
        }
        if (this.parent.isFrozenGrid()) {
            if (this.parent.frozenColumns) {
                for (var i = 0; i < cols.length; i++) {
                    if (cols[parseInt(i.toString(), 10)].freeze === 'Left') {
                        cols[parseInt(i.toString(), 10)].freeze = undefined;
                    }
                }
            }
            else {
                if (this.parent.getFrozenLeftCount() > destIndex) {
                    column.freeze = 'Left';
                }
                else if ((cols.length - this.parent.getFrozenRightColumnsCount()) <= destIndex) {
                    column.freeze = 'Right';
                }
                else {
                    column.freeze = column.freeze === 'Fixed' ? 'Fixed' : undefined;
                }
            }
        }
        gObj.getColumns(true);
        gObj.notify(events.columnPositionChanged, { fromIndex: destIndex, toIndex: srcIdx });
        if (preventRefresh !== false) {
            gObj.notify(events.modelChanged, {
                type: events.actionBegin, requestType: 'reorder', fromIndex: destIndex, toIndex: srcIdx, toColumnUid: column.uid
            });
        }
        if (this.parent.isFrozenGrid()) {
            var cols_1 = this.parent.columns;
            this.idx = 0;
            this.refreshColumnIndex(cols_1);
            this.parent.notify(events.refreshFrozenPosition, {});
        }
    };
    Reorder.prototype.refreshColumnIndex = function (cols) {
        for (var i = 0; i < cols.length; i++) {
            cols[parseInt(i.toString(), 10)].index = this.idx;
            this.idx++;
            if (cols[parseInt(i.toString(), 10)].columns && cols[parseInt(i.toString(), 10)].columns.length) {
                this.refreshColumnIndex(cols[parseInt(i.toString(), 10)].columns);
            }
        }
    };
    Reorder.prototype.targetParentContainerIndex = function (srcElem, destElem) {
        var cols = this.parent.columns;
        var headers = this.getHeaderCells();
        var stackedHdrColumn = this.parent.getStackedColumns(cols);
        var stackedCols = [];
        if (stackedHdrColumn.length) {
            stackedCols = this.getAllStackedheaderParentColumns(headers);
        }
        var flatColumns = stackedHdrColumn.length && stackedCols.length ?
            this.getColumnsModel(stackedCols) : this.getColumnsModel(cols, true);
        var parent = this.getColParent(flatColumns[getElementIndex(srcElem, headers)], cols);
        cols = parent ? parent.columns : cols;
        return inArray(flatColumns[getElementIndex(destElem, headers)], cols);
    };
    Reorder.prototype.getAllStackedheaderParentColumns = function (headers) {
        var stackedCols = [];
        for (var i = 0; i < headers.length; i++) {
            if (headers[parseInt(i.toString(), 10)].classList.contains('e-hide')) {
                headers.splice(i, 1);
                i--;
            }
            else if (headers[parseInt(i.toString(), 10)].closest('thead').firstChild === headers[parseInt(i.toString(), 10)].parentElement) {
                stackedCols.push(this.parent.getColumnByUid(headers[parseInt(i.toString(), 10)].firstElementChild.getAttribute('e-mappinguid')));
            }
        }
        return stackedCols;
    };
    Reorder.prototype.getHeaderCells = function () {
        return [].slice.call(this.parent.element.getElementsByClassName('e-headercell'));
    };
    Reorder.prototype.getColParent = function (column, columns) {
        var parents = [];
        this.findColParent(column, columns, parents);
        return parents[parents.length - 1];
    };
    Reorder.prototype.reorderSingleColumn = function (fromFName, toFName) {
        var fColumn = this.parent.enableColumnVirtualization ?
            this.parent.columns.filter(function (col) { return col.field === fromFName; })[0]
            : this.parent.getColumnByField(fromFName);
        var toColumn = this.parent.enableColumnVirtualization ?
            this.parent.columns.filter(function (col) { return col.field === toFName; })[0]
            : this.parent.getColumnByField(toFName);
        if ((!isNullOrUndefined(fColumn) && (!fColumn.allowReordering || fColumn.lockColumn)) ||
            (!isNullOrUndefined(toColumn) && (!toColumn.allowReordering || toColumn.lockColumn))) {
            this.parent.log('action_disabled_column', { moduleName: this.getModuleName(), column: fColumn, destColumn: toColumn });
            return;
        }
        var column = toColumn;
        var parent = this.getColParent(column, this.parent.columns);
        var columns = parent ? parent.columns : this.parent.columns;
        var destIndex = inArray(column, columns);
        if (destIndex > -1) {
            this.moveColumns(destIndex, fColumn, true);
        }
    };
    Reorder.prototype.reorderMultipleColumns = function (fromFNames, toFName) {
        var toIndex = this.parent.getColumnIndexByField(toFName);
        var toColumn = this.parent.getColumnByField(toFName);
        if (toIndex < 0 || (!isNullOrUndefined(toColumn) && (!toColumn.allowReordering || toColumn.lockColumn))) {
            return;
        }
        for (var i = 0; i < fromFNames.length; i++) {
            var column = this.parent.getColumnByField(fromFNames[parseInt(i.toString(), 10)]);
            if (!isNullOrUndefined(column) && (!column.allowReordering || column.lockColumn)) {
                return;
            }
        }
        for (var i = 0; i < fromFNames.length; i++) {
            var column = this.parent.getColumnByIndex(toIndex);
            var parent_1 = this.getColParent(column, this.parent.columns);
            var columns = parent_1 ? parent_1.columns : this.parent.columns;
            var destIndex = inArray(column, columns);
            if (destIndex > -1) {
                this.moveColumns(destIndex, this.parent.getColumnByField(fromFNames[parseInt(i.toString(), 10)]), true, true);
            }
            if (this.parent.getColumnIndexByField(fromFNames[i + 1]) >= destIndex) {
                toIndex++; //R to L
            }
        }
    };
    Reorder.prototype.moveTargetColumn = function (column, toIndex) {
        if (toIndex > -1) {
            this.moveColumns(toIndex, column, true);
        }
    };
    Reorder.prototype.reorderSingleColumnByTarget = function (fieldName, toIndex) {
        this.moveTargetColumn(this.parent.getColumnByField(fieldName), toIndex);
    };
    Reorder.prototype.reorderMultipleColumnByTarget = function (fieldName, toIndex) {
        for (var i = 0; i < fieldName.length; i++) {
            this.reorderSingleColumnByTarget(fieldName[parseInt(i.toString(), 10)], toIndex);
        }
    };
    /**
     * Changes the position of the Grid columns by field names.
     *
     * @param  {string | string[]} fromFName - Defines the origin field names.
     * @param  {string} toFName - Defines the destination field name.
     * @returns {void}
     */
    Reorder.prototype.reorderColumns = function (fromFName, toFName) {
        if (typeof fromFName === 'string') {
            this.reorderSingleColumn(fromFName, toFName);
            this.fromCol = fromFName;
        }
        else {
            this.reorderMultipleColumns(fromFName, toFName);
            this.fromCol = fromFName[0];
        }
    };
    /**
     * Changes the position of the Grid columns by field index.
     *
     * @param  {number} fromIndex - Defines the origin field index.
     * @param  {number} toIndex - Defines the destination field index.
     * @returns {void}
     */
    Reorder.prototype.reorderColumnByIndex = function (fromIndex, toIndex) {
        this.moveTargetColumn(this.parent.getColumnByIndex(fromIndex), toIndex);
    };
    /**
     * Changes the position of the Grid columns by field index.
     *
     * @param  {string | string[]} fieldName - Defines the field name.
     * @param  {number} toIndex - Defines the destination field index.
     * @returns {void}
     */
    Reorder.prototype.reorderColumnByTargetIndex = function (fieldName, toIndex) {
        if (typeof fieldName === 'string') {
            this.reorderSingleColumnByTarget(fieldName, toIndex);
        }
        else {
            this.reorderMultipleColumnByTarget(fieldName, toIndex);
        }
    };
    Reorder.prototype.enableAfterRender = function (e) {
        if (e.module === this.getModuleName() && e.enable) {
            this.createReorderElement();
        }
    };
    Reorder.prototype.createReorderElement = function (e) {
        if (e && e.args && e.args.isXaxis) {
            this.setDisplay('none');
        }
        var header = this.parent.element.querySelector('.' + literals.headerContent);
        this.upArrow = header.appendChild(this.parent
            .createElement('div', { className: 'e-icons e-icon-reorderuparrow e-reorderuparrow', attrs: { style: 'display:none' } }));
        this.downArrow = header.appendChild(this.parent
            .createElement('div', { className: 'e-icons e-icon-reorderdownarrow e-reorderdownarrow', attrs: { style: 'display:none' } }));
    };
    /**
     * The function used to trigger onActionComplete
     *
     * @param {NotifyArgs} e - specified the NotifyArgs
     * @returns {void}
     * @hidden
     */
    Reorder.prototype.onActionComplete = function (e) {
        this.parent.trigger(events.actionComplete, extend(e, { type: events.actionComplete }));
        var target = this.fromCol && this.parent.getColumnHeaderByField(this.fromCol);
        if (target) {
            this.parent.focusModule.onClick({ target: target }, true);
        }
    };
    /**
     * To destroy the reorder
     *
     * @returns {void}
     * @hidden
     */
    Reorder.prototype.destroy = function () {
        var gridElement = this.parent.element;
        if (this.parent.isDestroyed || !gridElement || (!gridElement.querySelector('.' + literals.gridHeader) &&
            !gridElement.querySelector('.' + literals.gridContent))) {
            return;
        }
        if (this.upArrow.parentNode) {
            remove(this.upArrow);
        }
        if (this.downArrow.parentNode) {
            remove(this.downArrow);
        }
        this.parent.off(events.headerDrop, this.headerDrop);
        this.parent.off(events.uiUpdate, this.enableAfterRender);
        this.parent.off(events.reorderComplete, this.onActionComplete);
        this.parent.off(events.columnDrag, this.drag);
        this.parent.off(events.columnDragStart, this.dragStart);
        this.parent.off(events.columnDragStop, this.dragStop);
        this.parent.off(events.headerRefreshed, this.createReorderElement);
        this.parent.off(events.keyPressed, this.keyPressHandler);
        this.parent.off(events.destroy, this.destroy);
        //call ejdrag and drop destroy
    };
    Reorder.prototype.keyPressHandler = function (e) {
        var gObj = this.parent;
        var isMacLike = /(Mac)/i.test(navigator.platform);
        if (isMacLike && e.metaKey) {
            if (e.action === 'leftArrow') {
                e.action = 'ctrlLeftArrow';
            }
            else if (e.action === 'rightArrow') {
                e.action = 'ctrlRightArrow';
            }
        }
        switch (e.action) {
            case 'ctrlLeftArrow':
            case 'ctrlRightArrow':
                // eslint-disable-next-line no-case-declarations
                var element = gObj.focusModule.currentInfo.element;
                if (element && element.classList.contains('e-headercell')) {
                    var column = gObj.getColumnByUid(element.firstElementChild.getAttribute('e-mappinguid'));
                    var visibleCols = gObj.getVisibleColumns();
                    var index = visibleCols.indexOf(column);
                    var toCol = e.action === 'ctrlLeftArrow' ? visibleCols[index - 1] : visibleCols[index + 1];
                    if (toCol && toCol.field && column.field) {
                        this.reorderColumns(column.field, toCol.field);
                    }
                }
                break;
        }
    };
    Reorder.prototype.drag = function (e) {
        var gObj = this.parent;
        var target = e.target;
        var closest = closestElement(target, '.e-headercell:not(.e-stackedHeaderCell)');
        var cloneElement = gObj.element.querySelector('.e-cloneproperties');
        var content = gObj.getContent().firstElementChild;
        var isLeft = this.x > getPosition(e.event).x + content.scrollLeft;
        removeClass([].slice.call(gObj.getHeaderTable().getElementsByClassName('e-reorderindicate')), ['e-reorderindicate']);
        this.setDisplay('none');
        this.stopTimer();
        classList(cloneElement, ['e-defaultcur'], ['e-notallowedcur']);
        this.updateScrollPostion(e.event);
        if (closest && !closest.isEqualNode(this.element)) {
            target = closest;
            //consider stacked, detail header cell
            var uid = target.querySelector('.e-headercelldiv, .e-stackedheadercelldiv').getAttribute('e-mappinguid');
            if (!(!this.chkDropPosition(this.element, target) || !this.chkDropAllCols(this.element, target)) &&
                gObj.getColumnByUid(uid).allowReordering && e.column.allowReordering) {
                this.updateArrowPosition(target, isLeft);
                classList(target, ['e-allowDrop', 'e-reorderindicate'], []);
            }
            else if (!(gObj.allowGrouping && parentsUntil(e.target, 'e-groupdroparea'))) {
                classList(cloneElement, ['e-notallowedcur'], ['e-defaultcur']);
            }
        }
        else {
            if (closest && closest.isEqualNode(this.element) &&
                !((gObj.allowGrouping && e.column.allowGrouping) || e.column.allowReordering)) {
                classList(cloneElement, ['e-notallowedcur'], ['e-defaultcur']);
            }
            else if (!closest && !(gObj.allowGrouping && parentsUntil(e.target, 'e-groupdroparea'))) {
                classList(cloneElement, ['e-notallowedcur'], ['e-defaultcur']);
            }
        }
        if (!e.column.allowReordering || e.column.lockColumn) {
            return;
        }
        gObj.trigger(events.columnDrag, { target: target, draggableType: 'headercell', column: e.column });
    };
    Reorder.prototype.updateScrollPostion = function (e) {
        var _this = this;
        var x = getPosition(e).x;
        var cliRect = this.parent.element.getBoundingClientRect();
        var cliRectBaseRight = cliRect.right;
        var cliRectBaseLeft = cliRect.left;
        var scrollElem = this.parent.getContent().firstElementChild;
        if (x > cliRectBaseLeft && x < cliRectBaseLeft + 35) {
            this.timer = window.setInterval(function () { _this.setScrollLeft(scrollElem, true); }, 50);
        }
        else if (x < cliRectBaseRight && x > cliRectBaseRight - 35) {
            this.timer = window.setInterval(function () { _this.setScrollLeft(scrollElem, false); }, 50);
        }
    };
    Reorder.prototype.setScrollLeft = function (scrollElem, isLeft) {
        var scrollLeft = scrollElem.scrollLeft;
        scrollElem.scrollLeft = scrollElem.scrollLeft + (isLeft ? -5 : 5);
        if (scrollLeft !== scrollElem.scrollLeft) {
            this.setDisplay('none');
        }
    };
    Reorder.prototype.stopTimer = function () {
        window.clearInterval(this.timer);
    };
    Reorder.prototype.updateArrowPosition = function (target, isLeft) {
        var cliRect = target.getBoundingClientRect();
        var cliRectBase = this.parent.element.getBoundingClientRect();
        if ((isLeft && cliRect.left < cliRectBase.left) || (!isLeft && cliRect.right > cliRectBase.right)) {
            return;
        }
        var isSticky = this.parent.getHeaderContent().classList.contains('e-sticky');
        this.upArrow.style.top = isSticky ? cliRect.top + cliRect.height + 'px' : cliRect.top + cliRect.height - cliRectBase.top + 'px';
        this.downArrow.style.top = isSticky ? cliRect.top - 7 + 'px' : cliRect.top - cliRectBase.top - 7 + 'px';
        this.upArrow.style.left = this.downArrow.style.left = isSticky ? (isLeft ? cliRect.left : cliRect.right) - 4 + 'px' :
            (isLeft ? cliRect.left : cliRect.right) - cliRectBase.left - 4 + 'px';
        this.setDisplay('');
    };
    Reorder.prototype.dragStart = function (e) {
        var gObj = this.parent;
        var target = e.target;
        this.element = target.classList.contains('e-headercell') ? target :
            parentsUntil(target, 'e-headercell');
        if (!e.column.allowReordering || e.column.lockColumn) {
            return;
        }
        var content = gObj.getContent().firstElementChild;
        this.x = getPosition(e.event).x + content.scrollLeft;
        gObj.trigger(events.columnDragStart, {
            target: target, draggableType: 'headercell', column: e.column
        });
    };
    Reorder.prototype.dragStop = function (e) {
        var gObj = this.parent;
        this.setDisplay('none');
        this.stopTimer();
        if (!e.cancel) {
            gObj.trigger(events.columnDrop, { target: e.target, draggableType: 'headercell', column: e.column });
        }
        removeClass([].slice.call(gObj.getHeaderTable().getElementsByClassName('e-reorderindicate')), ['e-reorderindicate']);
    };
    Reorder.prototype.setDisplay = function (display) {
        this.upArrow.style.display = display;
        this.downArrow.style.display = display;
    };
    /**
     * For internal use only - Get the module name.
     *
     * @returns {string} return the module name
     * @private
     */
    Reorder.prototype.getModuleName = function () {
        return 'reorder';
    };
    return Reorder;
}());
export { Reorder };
