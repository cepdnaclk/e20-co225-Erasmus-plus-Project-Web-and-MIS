import { extend, addClass, removeClass, setValue, closest, select, EventHandler } from '@syncfusion/ej2-base';
import { remove, classList } from '@syncfusion/ej2-base';
import { isNullOrUndefined, isUndefined } from '@syncfusion/ej2-base';
import { CellType } from '../base/enum';
import { parentsUntil, refreshForeignData, getObject, addRemoveEventListener, getCellFromRow } from '../base/util';
import { getCellByColAndRowIndex, addFixedColumnBorder } from '../base/util';
import * as events from '../base/constant';
import { RowRenderer } from '../renderer/row-renderer';
import { CellRenderer } from '../renderer/cell-renderer';
import { Row } from '../models/row';
import { Cell } from '../models/cell';
import { RowModelGenerator } from '../services/row-model-generator';
import { DataUtil } from '@syncfusion/ej2-data';
import * as literals from '../base/string-literals';
/**
 * `BatchEdit` module is used to handle batch editing actions.
 *
 * @hidden
 */
var BatchEdit = /** @class */ (function () {
    function BatchEdit(parent, serviceLocator, renderer) {
        this.cellDetails = {};
        this.originalCell = {};
        this.cloneCell = {};
        this.editNext = false;
        this.preventSaveCell = false;
        this.initialRender = true;
        this.validationColObj = [];
        /** @hidden */
        this.addBatchRow = false;
        this.prevEditedBatchCell = false;
        this.parent = parent;
        this.serviceLocator = serviceLocator;
        this.renderer = renderer;
        this.focus = serviceLocator.getService('focus');
        this.addEventListener();
    }
    /**
     * @returns {void}
     * @hidden
     */
    BatchEdit.prototype.addEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.evtHandlers = [{ event: events.click, handler: this.clickHandler },
            { event: events.dblclick, handler: this.dblClickHandler },
            { event: events.beforeCellFocused, handler: this.onBeforeCellFocused },
            { event: events.cellFocused, handler: this.onCellFocused },
            { event: events.doubleTap, handler: this.dblClickHandler },
            { event: events.keyPressed, handler: this.keyDownHandler },
            { event: events.editNextValCell, handler: this.editNextValCell },
            { event: events.destroy, handler: this.destroy }];
        addRemoveEventListener(this.parent, this.evtHandlers, true, this);
        EventHandler.add(this.parent.element, 'mousedown', this.mouseDownHandler, this);
        this.dataBoundFunction = this.dataBound.bind(this);
        this.batchCancelFunction = this.batchCancel.bind(this);
        this.parent.addEventListener(events.dataBound, this.dataBoundFunction);
        this.parent.addEventListener(events.batchCancel, this.batchCancelFunction);
    };
    /**
     * @returns {void}
     * @hidden
     */
    BatchEdit.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        addRemoveEventListener(this.parent, this.evtHandlers, false);
        EventHandler.remove(this.parent.element, 'mousedown', this.mouseDownHandler);
        this.parent.removeEventListener(events.dataBound, this.dataBoundFunction);
        this.parent.removeEventListener(events.batchCancel, this.batchCancelFunction);
    };
    BatchEdit.prototype.batchCancel = function () {
        this.parent.focusModule.restoreFocus();
    };
    BatchEdit.prototype.dataBound = function () {
        this.parent.notify(events.toolbarRefresh, {});
    };
    /**
     * @returns {void}
     * @hidden
     */
    BatchEdit.prototype.destroy = function () {
        this.removeEventListener();
    };
    BatchEdit.prototype.mouseDownHandler = function (e) {
        if (!isNullOrUndefined(this.parent.element.querySelector('.e-gridform'))) {
            this.mouseDownElement = e.target;
        }
        else {
            this.mouseDownElement = undefined;
        }
    };
    BatchEdit.prototype.clickHandler = function (e) {
        if (!parentsUntil(e.target, this.parent.element.id + '_add', true)) {
            if ((this.parent.isEdit && closest(this.form, 'td') !== closest(e.target, 'td'))
                && isNullOrUndefined(this.mouseDownElement) || this.mouseDownElement === e.target) {
                this.saveCell();
                this.editNextValCell();
            }
            if (parentsUntil(e.target, literals.rowCell) && !this.parent.isEdit) {
                this.setCellIdx(e.target);
            }
        }
    };
    BatchEdit.prototype.dblClickHandler = function (e) {
        var target = parentsUntil(e.target, literals.rowCell);
        var tr = parentsUntil(e.target, literals.row);
        var rowIndex = tr && parseInt(tr.getAttribute(literals.dataRowIndex), 10);
        var colIndex = target && parseInt(target.getAttribute(literals.dataColIndex), 10);
        if (!isNullOrUndefined(target) && !isNullOrUndefined(rowIndex) && !isNaN(colIndex)
            && !target.parentElement.classList.contains(literals.editedRow) &&
            this.parent.getColumns()[parseInt(colIndex.toString(), 10)].allowEditing) {
            this.editCell(rowIndex, this.parent.getColumns()[parseInt(colIndex.toString(), 10)].field, this.isAddRow(rowIndex));
        }
    };
    BatchEdit.prototype.onBeforeCellFocused = function (e) {
        if (this.parent.isEdit && this.validateFormObj() &&
            (e.byClick || (['tab', 'shiftTab', 'enter', 'shiftEnter'].indexOf(e.keyArgs.action) > -1))) {
            e.cancel = true;
            if (e.byClick) {
                e.clickArgs.preventDefault();
            }
            else {
                e.keyArgs.preventDefault();
            }
        }
    };
    BatchEdit.prototype.onCellFocused = function (e) {
        var clear = (!e.container.isContent || !e.container.isDataCell) && !(this.parent.frozenRows && e.container.isHeader);
        if (this.parent.focusModule.active) {
            this.prevEditedBatchCell = this.parent.focusModule.active.matrix.current.toString() === this.prevEditedBatchCellMatrix()
                .toString();
            this.crtRowIndex = [].slice.call(this.parent.focusModule.active.getTable().rows).indexOf(closest(e.element, 'tr'));
        }
        if (!e.byKey || clear) {
            if ((this.parent.isEdit && clear)) {
                this.saveCell();
            }
            return;
        }
        var _a = e.container.indexes, rowIndex = _a[0], cellIndex = _a[1];
        var actualIndex = e.element.getAttribute('data-colindex') ? parseInt(e.element.getAttribute('data-colindex'), 10) : cellIndex;
        if (actualIndex !== cellIndex) {
            cellIndex = actualIndex;
        }
        if (this.parent.frozenRows && e.container.isContent) {
            rowIndex += ((this.parent.getContent().querySelector('.e-hiddenrow') ? 0 : this.parent.frozenRows) +
                this.parent.getHeaderContent().querySelectorAll('.e-insertedrow').length);
        }
        var isEdit = this.parent.isEdit;
        if (!this.parent.element.getElementsByClassName('e-popup-open').length) {
            isEdit = isEdit && !this.validateFormObj();
            switch (e.keyArgs.action) {
                case 'tab':
                case 'shiftTab':
                    // eslint-disable-next-line no-case-declarations
                    var indent = this.parent.isRowDragable() && this.parent.isDetail() ? 2 :
                        this.parent.isRowDragable() || this.parent.isDetail() ? 1 : 0;
                    // eslint-disable-next-line no-case-declarations
                    var col = this.parent.getColumns()[cellIndex - indent];
                    if (col && !this.parent.isEdit) {
                        this.editCell(rowIndex, col.field);
                    }
                    if (isEdit || this.parent.isLastCellPrimaryKey) {
                        this.editCellFromIndex(rowIndex, cellIndex);
                    }
                    break;
                case 'enter':
                case 'shiftEnter':
                    e.keyArgs.preventDefault();
                    // eslint-disable-next-line no-case-declarations
                    var args = { cancel: false, keyArgs: e.keyArgs };
                    this.parent.notify('beforeFocusCellEdit', args);
                    if (!args.cancel && isEdit) {
                        this.editCell(rowIndex, this.cellDetails.column.field);
                    }
                    break;
                case 'f2':
                    this.editCellFromIndex(rowIndex, cellIndex);
                    this.focus.focus();
                    break;
            }
        }
    };
    BatchEdit.prototype.isAddRow = function (index) {
        return this.parent.getDataRows()[parseInt(index.toString(), 10)].classList.contains('e-insertedrow');
    };
    BatchEdit.prototype.editCellFromIndex = function (rowIdx, cellIdx) {
        this.cellDetails.rowIndex = rowIdx;
        this.cellDetails.cellIndex = cellIdx;
        this.editCell(rowIdx, this.parent.getColumns()[parseInt(cellIdx.toString(), 10)].field, this.isAddRow(rowIdx));
    };
    BatchEdit.prototype.closeEdit = function () {
        var gObj = this.parent;
        var rows = this.parent.getRowsObject();
        var argument = { cancel: false, batchChanges: this.getBatchChanges() };
        gObj.notify(events.beforeBatchCancel, argument);
        if (argument.cancel) {
            return;
        }
        if (gObj.isEdit) {
            this.saveCell(true);
        }
        this.isAdded = false;
        gObj.clearSelection();
        for (var i = 0; i < rows.length; i++) {
            var isInsert = false;
            var isDirty = rows[parseInt(i.toString(), 10)].isDirty;
            isInsert = this.removeBatchElementChanges(rows[parseInt(i.toString(), 10)], isDirty);
            if (isInsert) {
                rows.splice(i, 1);
            }
            if (isInsert) {
                i--;
            }
        }
        if (!gObj.getContentTable().querySelector('tr.e-row')) {
            gObj.renderModule.renderEmptyRow();
        }
        var args = {
            requestType: 'batchCancel', rows: this.parent.getRowsObject()
        };
        gObj.notify(events.batchCancel, {
            rows: this.parent.getRowsObject().length ? this.parent.getRowsObject() :
                [new Row({ isDataRow: true, cells: [new Cell({ isDataCell: true, visible: true })] })]
        });
        gObj.selectRow(this.cellDetails.rowIndex);
        this.refreshRowIdx();
        gObj.notify(events.toolbarRefresh, {});
        this.parent.notify(events.tooltipDestroy, {});
        args = { requestType: 'batchCancel', rows: this.parent.getRowsObject() };
        gObj.trigger(events.batchCancel, args);
    };
    BatchEdit.prototype.removeBatchElementChanges = function (row, isDirty) {
        var gObj = this.parent;
        var rowRenderer = new RowRenderer(this.serviceLocator, null, this.parent);
        var isInstertedRemoved = false;
        if (isDirty) {
            row.isDirty = isDirty;
            var tr = gObj.getRowElementByUID(row.uid);
            if (tr) {
                if (tr.classList.contains('e-insertedrow')) {
                    remove(tr);
                    isInstertedRemoved = true;
                }
                else {
                    refreshForeignData(row, this.parent.getForeignKeyColumns(), row.data);
                    delete row.changes;
                    delete row.edit;
                    row.isDirty = false;
                    classList(tr, [], ['e-hiddenrow', 'e-updatedtd']);
                    rowRenderer.refresh(row, gObj.getColumns(), false);
                }
                if (this.parent.aggregates.length > 0) {
                    var type = 'type';
                    var editType = [];
                    editType["" + type] = 'cancel';
                    this.parent.notify(events.refreshFooterRenderer, editType);
                    if (this.parent.groupSettings.columns.length > 0) {
                        this.parent.notify(events.groupAggregates, editType);
                    }
                }
            }
        }
        return isInstertedRemoved;
    };
    BatchEdit.prototype.deleteRecord = function (fieldname, data) {
        this.saveCell();
        if (this.validateFormObj()) {
            this.saveCell(true);
        }
        this.isAdded = false;
        this.bulkDelete(fieldname, data);
        if (this.parent.aggregates.length > 0) {
            if (!(this.parent.isReact || this.parent.isVue)) {
                this.parent.notify(events.refreshFooterRenderer, {});
            }
            if (this.parent.groupSettings.columns.length > 0) {
                this.parent.notify(events.groupAggregates, {});
            }
            if (this.parent.isReact || this.parent.isVue) {
                this.parent.notify(events.refreshFooterRenderer, {});
            }
        }
    };
    BatchEdit.prototype.addRecord = function (data) {
        this.bulkAddRow(data);
    };
    BatchEdit.prototype.endEdit = function () {
        if (this.parent.isEdit && this.validateFormObj()) {
            return;
        }
        this.batchSave();
    };
    BatchEdit.prototype.validateFormObj = function () {
        return this.parent.editModule.formObj && !this.parent.editModule.formObj.validate();
    };
    BatchEdit.prototype.batchSave = function () {
        var gObj = this.parent;
        var deletedRecords = 'deletedRecords';
        if (gObj.isCheckBoxSelection) {
            var checkAllBox = gObj.element.querySelector('.e-checkselectall').parentElement;
            if (checkAllBox.classList.contains('e-checkbox-disabled') &&
                gObj.pageSettings.totalRecordsCount > gObj.currentViewData.length) {
                removeClass([checkAllBox], ['e-checkbox-disabled']);
            }
        }
        this.saveCell();
        if (gObj.isEdit || this.editNextValCell() || gObj.isEdit) {
            return;
        }
        var changes = this.getBatchChanges();
        if (this.parent.selectionSettings.type === 'Multiple' && changes["" + deletedRecords].length &&
            this.parent.selectionSettings.persistSelection) {
            changes["" + deletedRecords] = this.removeSelectedData;
            this.removeSelectedData = [];
        }
        var original = {
            changedRecords: this.parent.getRowsObject()
                .filter(function (row) { return row.isDirty && ['add', 'delete'].indexOf(row.edit) === -1; })
                .map(function (row) { return row.data; })
        };
        var args = { batchChanges: changes, cancel: false };
        gObj.trigger(events.beforeBatchSave, args, function (beforeBatchSaveArgs) {
            if (beforeBatchSaveArgs.cancel) {
                return;
            }
            gObj.showSpinner();
            gObj.notify(events.bulkSave, { changes: changes, original: original });
        });
    };
    BatchEdit.prototype.getBatchChanges = function () {
        var changes = {
            addedRecords: [],
            deletedRecords: [],
            changedRecords: []
        };
        var rows = this.parent.getRowsObject();
        for (var _i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
            var row = rows_1[_i];
            if (row.isDirty) {
                switch (row.edit) {
                    case 'add':
                        changes.addedRecords.push(row.changes);
                        break;
                    case 'delete':
                        changes.deletedRecords.push(row.data);
                        break;
                    default:
                        changes.changedRecords.push(row.changes);
                }
            }
        }
        return changes;
    };
    /**
     * @param {string} uid - specifes the uid
     * @returns {void}
     * @hidden
     */
    BatchEdit.prototype.removeRowObjectFromUID = function (uid) {
        var rows = this.parent.getRowsObject();
        var i = 0;
        for (var len = rows.length; i < len; i++) {
            if (rows[parseInt(i.toString(), 10)].uid === uid) {
                break;
            }
        }
        rows.splice(i, 1);
    };
    /**
     * @param {Row<Column>} row - specifies the row object
     * @returns {void}
     * @hidden
     */
    BatchEdit.prototype.addRowObject = function (row) {
        var gObj = this.parent;
        var isTop = gObj.editSettings.newRowPosition === 'Top';
        var rowClone = row.clone();
        if (isTop) {
            gObj.getRowsObject().unshift(rowClone);
        }
        else {
            gObj.getRowsObject().push(rowClone);
        }
    };
    // tslint:disable-next-line:max-func-body-length
    BatchEdit.prototype.bulkDelete = function (fieldname, data) {
        var _this = this;
        this.removeSelectedData = [];
        var gObj = this.parent;
        var index = gObj.selectedRowIndex;
        var selectedRows = gObj.getSelectedRows();
        var args = {
            primaryKey: this.parent.getPrimaryKeyFieldNames(),
            rowIndex: index,
            rowData: data ? data : gObj.getSelectedRecords()[0],
            cancel: false
        };
        if (data) {
            args.row = gObj.editModule.deleteRowUid ? gObj.getRowElementByUID(gObj.editModule.deleteRowUid)
                : gObj.getRows()[gObj.getCurrentViewRecords().indexOf(data)];
        }
        else {
            args.row = selectedRows[0];
        }
        if (!args.row) {
            return;
        }
        // tslint:disable-next-line:max-func-body-length
        gObj.trigger(events.beforeBatchDelete, args, function (beforeBatchDeleteArgs) {
            if (beforeBatchDeleteArgs.cancel) {
                return;
            }
            _this.removeSelectedData = gObj.getSelectedRecords();
            gObj.clearSelection();
            beforeBatchDeleteArgs.row = beforeBatchDeleteArgs.row ?
                beforeBatchDeleteArgs.row : data ? gObj.getRows()[parseInt(index.toString(), 10)] : selectedRows[0];
            if (selectedRows.length === 1 || data) {
                var uid = beforeBatchDeleteArgs.row.getAttribute('data-uid');
                uid = data && _this.parent.editModule.deleteRowUid ? uid = _this.parent.editModule.deleteRowUid : uid;
                if (beforeBatchDeleteArgs.row.classList.contains('e-insertedrow')) {
                    _this.removeRowObjectFromUID(uid);
                    remove(beforeBatchDeleteArgs.row);
                }
                else {
                    var rowObj = gObj.getRowObjectFromUID(uid);
                    rowObj.isDirty = true;
                    rowObj.edit = 'delete';
                    classList(beforeBatchDeleteArgs.row, ['e-hiddenrow', 'e-updatedtd'], []);
                    if (gObj.frozenRows && index < gObj.frozenRows && gObj.getDataRows().length >= gObj.frozenRows) {
                        gObj.getHeaderTable().querySelector(literals.tbody).appendChild(gObj.getRowByIndex(gObj.frozenRows - 1));
                    }
                }
                delete beforeBatchDeleteArgs.row;
            }
            else {
                if (data) {
                    index = parseInt(beforeBatchDeleteArgs.row.getAttribute(literals.dataRowIndex), 10);
                }
                for (var i = 0; i < selectedRows.length; i++) {
                    var uniqueid = selectedRows[parseInt(i.toString(), 10)].getAttribute('data-uid');
                    if (selectedRows[parseInt(i.toString(), 10)].classList.contains('e-insertedrow')) {
                        _this.removeRowObjectFromUID(uniqueid);
                        remove(selectedRows[parseInt(i.toString(), 10)]);
                    }
                    else {
                        classList(selectedRows[parseInt(i.toString(), 10)], ['e-hiddenrow', 'e-updatedtd'], []);
                        var selectedRow = gObj.getRowObjectFromUID(uniqueid);
                        selectedRow.isDirty = true;
                        selectedRow.edit = 'delete';
                        delete selectedRows[parseInt(i.toString(), 10)];
                        if (gObj.frozenRows && index < gObj.frozenRows && gObj.getDataRows().length >= gObj.frozenRows) {
                            gObj.getHeaderTable().querySelector(literals.tbody).appendChild(gObj.getRowByIndex(gObj.frozenRows - 1));
                        }
                    }
                }
            }
            _this.refreshRowIdx();
            if (data) {
                gObj.editModule.deleteRowUid = undefined;
            }
            if (!gObj.isCheckBoxSelection) {
                gObj.selectRow(index);
            }
            gObj.trigger(events.batchDelete, beforeBatchDeleteArgs);
            gObj.notify(events.batchDelete, { rows: _this.parent.getRowsObject() });
            gObj.notify(events.toolbarRefresh, {});
        });
    };
    BatchEdit.prototype.refreshRowIdx = function () {
        var gObj = this.parent;
        var rows = gObj.getAllDataRows(true);
        var dataObjects = gObj.getRowsObject().filter(function (row) { return !row.isDetailRow; });
        for (var i = 0, j = 0, len = rows.length; i < len; i++) {
            if (rows[parseInt(i.toString(), 10)].classList.contains(literals.row) && !rows[parseInt(i.toString(), 10)].classList.contains('e-hiddenrow')) {
                rows[parseInt(i.toString(), 10)].setAttribute(literals.dataRowIndex, j.toString());
                rows[parseInt(i.toString(), 10)].setAttribute(literals.ariaRowIndex, (j + 1).toString());
                dataObjects[parseInt(i.toString(), 10)].index = j;
                j++;
            }
            else {
                rows[parseInt(i.toString(), 10)].removeAttribute(literals.dataRowIndex);
                rows[parseInt(i.toString(), 10)].removeAttribute(literals.ariaRowIndex);
                dataObjects[parseInt(i.toString(), 10)].index = -1;
            }
        }
    };
    BatchEdit.prototype.bulkAddRow = function (data) {
        var _this = this;
        var gObj = this.parent;
        if (!gObj.editSettings.allowAdding) {
            if (gObj.isEdit) {
                this.saveCell();
            }
            return;
        }
        if (gObj.isEdit) {
            this.saveCell();
            this.parent.notify(events.editNextValCell, {});
        }
        if (this.validateFormObj()) {
            return;
        }
        if (this.initialRender) {
            var visibleColumns = gObj.getVisibleColumns();
            for (var i = 0; i < visibleColumns.length; i++) {
                if (visibleColumns[parseInt(i.toString(), 10)].validationRules &&
                    visibleColumns[parseInt(i.toString(), 10)].validationRules['required']) {
                    var obj = { field: (visibleColumns[parseInt(i.toString(), 10)]['field']).slice(), cellIdx: i };
                    this.validationColObj.push(obj);
                }
            }
            this.initialRender = false;
        }
        this.parent.element.classList.add('e-editing');
        var defaultData = data ? data : this.getDefaultData();
        var args = {
            defaultData: defaultData,
            primaryKey: gObj.getPrimaryKeyFieldNames(),
            cancel: false
        };
        gObj.trigger(events.beforeBatchAdd, args, function (beforeBatchAddArgs) {
            if (beforeBatchAddArgs.cancel) {
                return;
            }
            _this.isAdded = true;
            gObj.clearSelection();
            var row = new RowRenderer(_this.serviceLocator, null, _this.parent);
            var model = new RowModelGenerator(_this.parent);
            var modelData = model.generateRows([beforeBatchAddArgs.defaultData]);
            var tr = row.render(modelData[0], gObj.getColumns());
            addFixedColumnBorder(tr);
            var col;
            var index;
            for (var i = 0; i < _this.parent.groupSettings.columns.length; i++) {
                tr.insertBefore(_this.parent.createElement('td', { className: 'e-indentcell' }), tr.firstChild);
                modelData[0].cells.unshift(new Cell({ cellType: CellType.Indent }));
            }
            var tbody = gObj.getContentTable().querySelector(literals.tbody);
            tr.classList.add('e-insertedrow');
            if (tbody.querySelector('.e-emptyrow')) {
                var emptyRow = tbody.querySelector('.e-emptyrow');
                emptyRow.parentNode.removeChild(emptyRow);
                if (gObj.frozenRows && gObj.element.querySelector('.e-frozenrow-empty')) {
                    gObj.element.querySelector('.e-frozenrow-empty').classList.remove('e-frozenrow-empty');
                }
            }
            if (gObj.frozenRows && gObj.editSettings.newRowPosition === 'Top') {
                tbody = gObj.getHeaderTable().querySelector(literals.tbody);
            }
            else {
                tbody = gObj.getContentTable().querySelector(literals.tbody);
            }
            if (_this.parent.editSettings.newRowPosition === 'Top') {
                tbody.insertBefore(tr, tbody.firstChild);
            }
            else {
                tbody.appendChild(tr);
            }
            addClass([].slice.call(tr.getElementsByClassName(literals.rowCell)), ['e-updatedtd']);
            modelData[0].isDirty = true;
            modelData[0].changes = extend({}, {}, modelData[0].data, true);
            modelData[0].edit = 'add';
            _this.addRowObject(modelData[0]);
            _this.refreshRowIdx();
            _this.focus.forgetPrevious();
            gObj.notify(events.batchAdd, { rows: _this.parent.getRowsObject() });
            var changes = _this.getBatchChanges();
            var btmIdx = _this.getBottomIndex();
            if (_this.parent.editSettings.newRowPosition === 'Top') {
                gObj.selectRow(0);
            }
            else {
                gObj.selectRow(btmIdx);
            }
            if (!data) {
                index = _this.findNextEditableCell(0, true);
                col = gObj.getColumns()[parseInt(index.toString(), 10)];
                if (_this.parent.editSettings.newRowPosition === 'Top') {
                    _this.editCell(0, col.field, true);
                }
                else {
                    _this.editCell(btmIdx, col.field, true);
                }
            }
            if (_this.parent.aggregates.length > 0 && (data || changes[literals.addedRecords].length)) {
                _this.parent.notify(events.refreshFooterRenderer, {});
            }
            var args1 = {
                defaultData: beforeBatchAddArgs.defaultData, row: tr,
                columnObject: col, columnIndex: index, primaryKey: beforeBatchAddArgs.primaryKey,
                cell: !isNullOrUndefined(index) ? tr.cells[parseInt(index.toString(), 10)] : undefined
            };
            gObj.trigger(events.batchAdd, args1);
        });
    };
    BatchEdit.prototype.findNextEditableCell = function (columnIndex, isAdd, isValOnly) {
        var cols = this.parent.getColumns();
        var endIndex = cols.length;
        var validation;
        for (var i = columnIndex; i < endIndex; i++) {
            validation = isValOnly ? isNullOrUndefined(cols[parseInt(i.toString(), 10)].validationRules) : false;
            // if (!isAdd && this.checkNPCell(cols[parseInt(i.toString(), 10)])) {
            //     return i;
            // } else
            if (isAdd && (!cols[parseInt(i.toString(), 10)].template || cols[parseInt(i.toString(), 10)].field)
                && cols[parseInt(i.toString(), 10)].allowEditing && cols[parseInt(i.toString(), 10)].visible &&
                !(cols[parseInt(i.toString(), 10)].isIdentity && cols[parseInt(i.toString(), 10)].isPrimaryKey) && !validation) {
                return i;
            }
        }
        return -1;
    };
    BatchEdit.prototype.getDefaultData = function () {
        var gObj = this.parent;
        var data = {};
        var dValues = { 'number': 0, 'string': null, 'boolean': false, 'date': null, 'datetime': null };
        for (var _i = 0, _a = (gObj.columnModel); _i < _a.length; _i++) {
            var col = _a[_i];
            if (col.field) {
                setValue(col.field, Object.keys(col).indexOf('defaultValue') >= 0 ? col.defaultValue : dValues[col.type], data);
            }
        }
        return data;
    };
    BatchEdit.prototype.setCellIdx = function (target) {
        var gLen = 0;
        if (this.parent.allowGrouping) {
            gLen = this.parent.groupSettings.columns.length;
        }
        this.cellDetails.cellIndex = target.cellIndex - gLen;
        this.cellDetails.rowIndex = parseInt(target.getAttribute('index'), 10);
    };
    BatchEdit.prototype.editCell = function (index, field, isAdd) {
        var gObj = this.parent;
        var col = gObj.getColumnByField(field);
        this.index = index;
        this.field = field;
        this.isAdd = isAdd;
        var checkEdit = gObj.isEdit && !(this.cellDetails.column.field === field
            && (this.cellDetails.rowIndex === index && this.parent.getDataRows().length - 1 !== index && this.prevEditedBatchCell));
        if (gObj.editSettings.allowEditing) {
            if (!checkEdit && (col.allowEditing || (!col.allowEditing && gObj.focusModule.active
                && gObj.focusModule.active.getTable().rows[this.crtRowIndex]
                && gObj.focusModule.active.getTable().rows[this.crtRowIndex].classList.contains('e-insertedrow')))) {
                this.editCellExtend(index, field, isAdd);
            }
            else if (checkEdit) {
                this.editNext = true;
                this.saveCell();
            }
        }
    };
    BatchEdit.prototype.editCellExtend = function (index, field, isAdd) {
        var _this = this;
        var gObj = this.parent;
        var col = gObj.getColumnByField(field);
        var keys = gObj.getPrimaryKeyFieldNames();
        if (gObj.isEdit) {
            return;
        }
        var rowData = extend({}, {}, this.getDataByIndex(index), true);
        var row = gObj.getDataRows()[parseInt(index.toString(), 10)];
        rowData = extend({}, {}, this.getDataByIndex(index), true);
        if ((keys[0] === col.field && !row.classList.contains('e-insertedrow')) || col.columns ||
            (col.isPrimaryKey && col.isIdentity) || col.commands) {
            this.parent.isLastCellPrimaryKey = true;
            return;
        }
        this.parent.isLastCellPrimaryKey = false;
        this.parent.element.classList.add('e-editing');
        var rowObj = gObj.getRowObjectFromUID(row.getAttribute('data-uid'));
        var cells = [].slice.apply(row.cells);
        var args = {
            columnName: col.field, isForeignKey: !isNullOrUndefined(col.foreignKeyValue),
            primaryKey: keys, rowData: rowData,
            validationRules: extend({}, col.validationRules ? col.validationRules : {}),
            value: getObject(col.field, rowData),
            type: !isAdd ? 'edit' : 'add', cancel: false,
            foreignKeyData: rowObj && rowObj.foreignKeyData
        };
        args.cell = cells[this.getColIndex(cells, this.getCellIdx(col.uid))];
        args.row = row;
        args.columnObject = col;
        if (!args.cell) {
            return;
        }
        gObj.trigger(events.cellEdit, args, function (cellEditArgs) {
            if (cellEditArgs.cancel) {
                return;
            }
            cellEditArgs.cell = cellEditArgs.cell ? cellEditArgs.cell : cells[_this.getColIndex(cells, _this.getCellIdx(col.uid))];
            cellEditArgs.row = cellEditArgs.row ? cellEditArgs.row : row;
            cellEditArgs.columnObject = cellEditArgs.columnObject ? cellEditArgs.columnObject : col;
            // cellEditArgs.columnObject.index = isNullOrUndefined(cellEditArgs.columnObject.index) ? 0 : cellEditArgs.columnObject.index;
            _this.cellDetails = {
                rowData: rowData, column: col, value: cellEditArgs.value, isForeignKey: cellEditArgs.isForeignKey, rowIndex: index,
                cellIndex: parseInt(cellEditArgs.cell.getAttribute(literals.dataColIndex), 10),
                foreignKeyData: cellEditArgs.foreignKeyData
            };
            if (cellEditArgs.cell.classList.contains('e-updatedtd')) {
                _this.isColored = true;
                cellEditArgs.cell.classList.remove('e-updatedtd');
            }
            gObj.isEdit = true;
            gObj.clearSelection();
            if (!gObj.isCheckBoxSelection || !gObj.isPersistSelection) {
                gObj.selectRow(_this.cellDetails.rowIndex, true);
            }
            _this.renderer.update(cellEditArgs);
            _this.parent.notify(events.batchEditFormRendered, cellEditArgs);
            _this.form = select('#' + gObj.element.id + 'EditForm', gObj.element);
            gObj.editModule.applyFormValidation([col]);
            _this.parent.element.querySelector('.e-gridpopup').style.display = 'none';
        });
    };
    BatchEdit.prototype.updateCell = function (rowIndex, field, value) {
        var gObj = this.parent;
        var col = gObj.getColumnByField(field);
        var index = gObj.getColumnIndexByField(field);
        if (col && !col.isPrimaryKey && col.allowEditing) {
            var td_1 = this.parent.isSpan ? getCellFromRow(gObj, rowIndex, index) :
                getCellByColAndRowIndex(this.parent, col, rowIndex, index);
            if (this.parent.isSpan && !td_1) {
                return;
            }
            var rowObj_1 = gObj.getRowObjectFromUID(td_1.parentElement.getAttribute('data-uid'));
            if (gObj.isEdit ||
                (!rowObj_1.changes && ((!(value instanceof Date) && rowObj_1.data['' + field] !== value) ||
                    ((value instanceof Date) && new Date(rowObj_1.data['' + field]).toString() !== new Date(value).toString()))) ||
                (rowObj_1.changes && ((!(value instanceof Date) && rowObj_1.changes['' + field] !== value) ||
                    ((value instanceof Date) && new Date(rowObj_1.changes['' + field]).toString() !== new Date(value).toString())))) {
                this.refreshTD(td_1, col, rowObj_1, value);
                var isReactChild = this.parent.parentDetails && this.parent.parentDetails.parentInstObj &&
                    this.parent.parentDetails.parentInstObj.isReact;
                if (((this.parent.isReact && this.parent.requireTemplateRef) || (isReactChild &&
                    this.parent.parentDetails.parentInstObj.requireTemplateRef)) && col.template) {
                    // eslint-disable-next-line @typescript-eslint/no-this-alias
                    var thisRef_1 = this;
                    var newReactTd_1 = this.newReactTd;
                    thisRef_1.parent.renderTemplates(function () {
                        thisRef_1.parent.trigger(events.queryCellInfo, {
                            cell: newReactTd_1 || td_1, column: col, data: rowObj_1.changes
                        });
                    });
                }
                else if ((this.parent.isReact || isReactChild) && col.template) {
                    this.parent.renderTemplates();
                    this.parent.trigger(events.queryCellInfo, {
                        cell: this.newReactTd || td_1, column: col, data: rowObj_1.changes
                    });
                }
                else {
                    this.parent.trigger(events.queryCellInfo, {
                        cell: this.newReactTd || td_1, column: col, data: rowObj_1.changes
                    });
                }
            }
        }
    };
    BatchEdit.prototype.setChanges = function (rowObj, field, value) {
        if (!rowObj.changes) {
            rowObj.changes = extend({}, {}, rowObj.data, true);
        }
        if (!isNullOrUndefined(field)) {
            if (typeof value === 'string') {
                value = this.parent.sanitize(value);
            }
            DataUtil.setValue(field, value, rowObj.changes);
        }
        if (rowObj.data["" + field] !== value) {
            var type = this.parent.getColumnByField(field).type;
            if ((type === 'date' || type === 'datetime')) {
                if (new Date(rowObj.data["" + field]).toString() !== new Date(value).toString()) {
                    rowObj.isDirty = true;
                }
            }
            else {
                rowObj.isDirty = true;
            }
        }
    };
    BatchEdit.prototype.updateRow = function (index, data) {
        var keys = Object.keys(data);
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var col = keys_1[_i];
            this.updateCell(index, col, data["" + col]);
        }
    };
    BatchEdit.prototype.getCellIdx = function (uid) {
        var cIdx = this.parent.getColumnIndexByUid(uid) + this.parent.groupSettings.columns.length;
        if (!isNullOrUndefined(this.parent.detailTemplate) || !isNullOrUndefined(this.parent.childGrid)) {
            cIdx++;
        }
        if (this.parent.isRowDragable()) {
            cIdx++;
        }
        return cIdx;
    };
    BatchEdit.prototype.refreshTD = function (td, column, rowObj, value) {
        var cell = new CellRenderer(this.parent, this.serviceLocator);
        value = column.type === 'number' && !isNullOrUndefined(value) ? parseFloat(value) : value;
        if (rowObj) {
            this.setChanges(rowObj, column.field, value);
            refreshForeignData(rowObj, this.parent.getForeignKeyColumns(), rowObj.changes);
        }
        var rowcell = rowObj ? rowObj.cells : undefined;
        var parentElement;
        var cellIndex;
        if (this.parent.isReact) {
            parentElement = td.parentElement;
            cellIndex = td.cellIndex;
        }
        var index = 0;
        if (rowObj) {
            cell.refreshTD(td, rowcell[this.getCellIdx(column.uid) - index], rowObj.changes, { 'index': this.getCellIdx(column.uid) });
        }
        if (this.parent.isReact) {
            this.newReactTd = parentElement.cells[parseInt(cellIndex.toString(), 10)];
            parentElement.cells[parseInt(cellIndex.toString(), 10)].classList.add('e-updatedtd');
        }
        else {
            td.classList.add('e-updatedtd');
        }
        td.classList.add('e-updatedtd');
        this.parent.notify(events.toolbarRefresh, {});
    };
    BatchEdit.prototype.getColIndex = function (cells, index) {
        var cIdx = 0;
        if (this.parent.allowGrouping && this.parent.groupSettings.columns) {
            cIdx = this.parent.groupSettings.columns.length;
        }
        if (!isNullOrUndefined(this.parent.detailTemplate) || !isNullOrUndefined(this.parent.childGrid)) {
            cIdx++;
        }
        if (this.parent.isRowDragable()) {
            cIdx++;
        }
        for (var m = 0; m < cells.length; m++) {
            var colIndex = parseInt(cells[parseInt(m.toString(), 10)].getAttribute(literals.dataColIndex), 10);
            if (colIndex === index - cIdx) {
                return m;
            }
        }
        return -1;
    };
    BatchEdit.prototype.editNextValCell = function () {
        var gObj = this.parent;
        var insertedRows = gObj.element.querySelectorAll('.e-insertedrow');
        var isSingleInsert = insertedRows.length === 1 ? true : false;
        if (isSingleInsert && this.isAdded && !gObj.isEdit) {
            var btmIdx = this.getBottomIndex();
            for (var i = this.cellDetails.cellIndex; i < gObj.getColumns().length; i++) {
                if (gObj.isEdit) {
                    return;
                }
                var index = this.findNextEditableCell(this.cellDetails.cellIndex + 1, true, true);
                var col = gObj.getColumns()[parseInt(index.toString(), 10)];
                if (col) {
                    if (this.parent.editSettings.newRowPosition === 'Bottom') {
                        this.editCell(btmIdx, col.field, true);
                    }
                    else {
                        var args = { index: 0, column: col };
                        this.parent.notify(events.nextCellIndex, args);
                        this.editCell(args.index, col.field, true);
                    }
                    this.saveCell();
                }
            }
            if (!gObj.isEdit) {
                this.isAdded = false;
            }
        }
        else if (!isSingleInsert && this.isAdded && !gObj.isEdit) {
            for (var i = 0; i < insertedRows.length; i++) {
                if (!gObj.isEdit) {
                    for (var j = 0; j < this.validationColObj.length; j++) {
                        if (gObj.isEdit) {
                            break;
                        }
                        else if (insertedRows[parseInt(i.toString(), 10)].querySelectorAll('td:not(.e-hide)')[this.validationColObj[parseInt(j.toString(), 10)].cellIdx].innerHTML === '') {
                            this.editCell(parseInt(insertedRows[parseInt(i.toString(), 10)].getAttribute('data-rowindex'), 10), this.validationColObj[parseInt(j.toString(), 10)].field);
                            if (this.validateFormObj()) {
                                this.saveCell();
                            }
                        }
                    }
                }
                else {
                    break;
                }
            }
            if (!gObj.isEdit) {
                this.isAdded = false;
            }
        }
    };
    BatchEdit.prototype.escapeCellEdit = function () {
        var args = this.generateCellArgs();
        args.value = args.previousValue;
        if (args.value || !this.cellDetails.column.validationRules) {
            this.successCallBack(args, args.cell.parentElement, args.column, true)(args);
        }
    };
    BatchEdit.prototype.generateCellArgs = function () {
        var gObj = this.parent;
        this.parent.element.classList.remove('e-editing');
        var column = this.cellDetails.column;
        var obj = {};
        obj[column.field] = getObject(column.field, this.cellDetails.rowData);
        var editedData = gObj.editModule.getCurrentEditedData(this.form, obj);
        var cloneEditedData = extend({}, editedData);
        editedData = extend({}, editedData, this.cellDetails.rowData);
        var value = getObject(column.field, cloneEditedData);
        if (!isNullOrUndefined(column.field) && !isUndefined(value)) {
            setValue(column.field, value, editedData);
        }
        var args = {
            columnName: column.field,
            value: getObject(column.field, editedData),
            rowData: this.cellDetails.rowData,
            column: column,
            previousValue: this.cellDetails.value,
            isForeignKey: this.cellDetails.isForeignKey,
            cancel: false
        };
        args.cell = this.form.parentElement;
        args.columnObject = column;
        return args;
    };
    BatchEdit.prototype.saveCell = function (isForceSave) {
        if (this.preventSaveCell || !this.form) {
            return;
        }
        var gObj = this.parent;
        if (!isForceSave && (!gObj.isEdit || this.validateFormObj())) {
            return;
        }
        this.preventSaveCell = true;
        var args = this.generateCellArgs();
        var tr = args.cell.parentElement;
        var col = args.column;
        args.cell.removeAttribute('aria-label');
        if (!isForceSave) {
            gObj.trigger(events.cellSave, args, this.successCallBack(args, tr, col));
            gObj.notify(events.batchForm, { formObj: this.form });
        }
        else {
            this.successCallBack(args, tr, col)(args);
        }
    };
    BatchEdit.prototype.successCallBack = function (cellSaveArgs, tr, column, isEscapeCellEdit) {
        var _this = this;
        return function (cellSaveArgs) {
            var gObj = _this.parent;
            cellSaveArgs.cell = cellSaveArgs.cell ? cellSaveArgs.cell : _this.form.parentElement;
            cellSaveArgs.columnObject = cellSaveArgs.columnObject ? cellSaveArgs.columnObject : column;
            // cellSaveArgs.columnObject.index = isNullOrUndefined(cellSaveArgs.columnObject.index) ? 0 : cellSaveArgs.columnObject.index;
            if (cellSaveArgs.cancel) {
                _this.preventSaveCell = false;
                if (_this.editNext) {
                    _this.editNext = false;
                    if (_this.cellDetails.rowIndex === _this.index && _this.cellDetails.column.field === _this.field) {
                        return;
                    }
                    _this.editCellExtend(_this.index, _this.field, _this.isAdd);
                }
                return;
            }
            gObj.editModule.destroyWidgets([column]);
            gObj.isEdit = false;
            gObj.editModule.destroyForm();
            _this.parent.notify(events.tooltipDestroy, {});
            var rowObj = gObj.getRowObjectFromUID(tr.getAttribute('data-uid'));
            _this.refreshTD(cellSaveArgs.cell, column, rowObj, cellSaveArgs.value);
            if (_this.parent.isReact) {
                cellSaveArgs.cell = _this.newReactTd;
            }
            removeClass([tr], [literals.editedRow, 'e-batchrow']);
            removeClass([cellSaveArgs.cell], ['e-editedbatchcell', 'e-boolcell']);
            if (!isNullOrUndefined(cellSaveArgs.value) && cellSaveArgs.value.toString() ===
                (!isNullOrUndefined(_this.cellDetails.value) ? _this.cellDetails.value : '').toString() && !_this.isColored
                || (isNullOrUndefined(cellSaveArgs.value) && isNullOrUndefined(rowObj.data[column.field]) &&
                    isNullOrUndefined(_this.cellDetails.value) && !cellSaveArgs.cell.parentElement.classList.contains('e-insertedrow'))) {
                cellSaveArgs.cell.classList.remove('e-updatedtd');
            }
            if (isNullOrUndefined(isEscapeCellEdit)) {
                var isReactCompiler = gObj.isReact && column.template && typeof (column.template) !== 'string';
                var isReactChild = gObj.parentDetails && gObj.parentDetails.parentInstObj
                    && gObj.parentDetails.parentInstObj.isReact;
                if (isReactCompiler || isReactChild) {
                    if (gObj.requireTemplateRef) {
                        gObj.renderTemplates(function () {
                            gObj.trigger(events.cellSaved, cellSaveArgs);
                        });
                    }
                    else {
                        gObj.renderTemplates();
                        gObj.trigger(events.cellSaved, cellSaveArgs);
                    }
                }
                else {
                    gObj.trigger(events.cellSaved, cellSaveArgs);
                }
            }
            gObj.notify(events.toolbarRefresh, {});
            _this.isColored = false;
            if (_this.parent.aggregates.length > 0) {
                if (!(_this.parent.isReact || _this.parent.isVue)) {
                    _this.parent.notify(events.refreshFooterRenderer, {});
                }
                if (_this.parent.groupSettings.columns.length > 0 && !_this.isAddRow(_this.cellDetails.rowIndex)) {
                    _this.parent.notify(events.groupAggregates, {});
                }
                if (_this.parent.isReact || _this.parent.isVue) {
                    _this.parent.notify(events.refreshFooterRenderer, {});
                }
            }
            _this.preventSaveCell = false;
            if (_this.editNext) {
                _this.editNext = false;
                if (_this.cellDetails.rowIndex === _this.index && _this.cellDetails.column.field === _this.field && _this.prevEditedBatchCell) {
                    return;
                }
                var col = gObj.getColumnByField(_this.field);
                if (col && (col.allowEditing || (!col.allowEditing && gObj.focusModule.active
                    && gObj.focusModule.active.getTable().rows[_this.crtRowIndex]
                    && gObj.focusModule.active.getTable().rows[_this.crtRowIndex].classList.contains('e-insertedrow')))) {
                    _this.editCellExtend(_this.index, _this.field, _this.isAdd);
                }
            }
            if (isEscapeCellEdit) {
                gObj.notify(events.restoreFocus, {});
            }
        };
    };
    BatchEdit.prototype.prevEditedBatchCellMatrix = function () {
        var editedBatchCellMatrix = [];
        var gObj = this.parent;
        var editedBatchCell = gObj.focusModule.active.getTable().querySelector('.e-editedbatchcell');
        if (editedBatchCell) {
            var tr = editedBatchCell.parentElement;
            var rowIndex = [].slice.call(this.parent.focusModule.active.getTable().rows).indexOf(tr);
            var cellIndex = [].slice.call(tr.cells).indexOf(editedBatchCell);
            editedBatchCellMatrix = [rowIndex, cellIndex];
        }
        return editedBatchCellMatrix;
    };
    BatchEdit.prototype.getDataByIndex = function (index) {
        var row = this.parent.getRowObjectFromUID(this.parent.getDataRows()[parseInt(index.toString(), 10)].getAttribute('data-uid'));
        return row.changes ? row.changes : row.data;
    };
    BatchEdit.prototype.keyDownHandler = function (e) {
        if (this.addBatchRow || ((e.action === 'tab' || e.action === 'shiftTab') && this.parent.isEdit)) {
            var gObj = this.parent;
            var btmIdx = this.getBottomIndex();
            var rowcell = parentsUntil(e.target, literals.rowCell);
            if (this.addBatchRow || (rowcell && !this.parent.isReact)) {
                var cell = void 0;
                if (rowcell) {
                    cell = rowcell.querySelector('.e-field');
                }
                if (this.addBatchRow || cell) {
                    var visibleColumns = this.parent.getVisibleColumns();
                    var columnIndex = e.action === 'tab' ? visibleColumns.length - 1 : 0;
                    if (this.addBatchRow
                        || visibleColumns[parseInt(columnIndex.toString(), 10)].field === cell.getAttribute('id').slice(this.parent.element.id.length)) {
                        if (this.cellDetails.rowIndex === btmIdx && e.action === 'tab') {
                            if (gObj.editSettings.newRowPosition === 'Top') {
                                gObj.editSettings.newRowPosition = 'Bottom';
                                this.addRecord();
                                gObj.editSettings.newRowPosition = 'Top';
                            }
                            else {
                                this.addRecord();
                            }
                            this.addBatchRow = false;
                        }
                        else {
                            this.saveCell();
                        }
                    }
                }
            }
        }
    };
    /**
     * @returns {void}
     * @hidden
     */
    BatchEdit.prototype.addCancelWhilePaging = function () {
        if (this.validateFormObj()) {
            this.parent.notify(events.destroyForm, {});
            this.parent.isEdit = false;
            this.editNext = false;
            this.mouseDownElement = undefined;
            this.isColored = false;
        }
    };
    BatchEdit.prototype.getBottomIndex = function () {
        var changes = this.getBatchChanges();
        return this.parent.getCurrentViewRecords().length + changes[literals.addedRecords].length -
            changes[literals.deletedRecords].length - 1;
    };
    return BatchEdit;
}());
export { BatchEdit };
