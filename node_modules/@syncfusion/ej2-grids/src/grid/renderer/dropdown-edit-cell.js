var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { extend, isNullOrUndefined, select } from '@syncfusion/ej2-base';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Query, DataManager, DataUtil, Predicate } from '@syncfusion/ej2-data';
import { isEditable, getComplexFieldID, getObject } from '../base/util';
import { parentsUntil } from '../base/util';
import { EditCellBase } from './edit-cell-base';
import * as literals from '../base/string-literals';
import * as events from '../base/constant';
/**
 * `DropDownEditCell` is used to handle dropdown cell type editing.
 *
 * @hidden
 */
var DropDownEditCell = /** @class */ (function (_super) {
    __extends(DropDownEditCell, _super);
    function DropDownEditCell(parent) {
        var _this = 
        //constructor
        _super.call(this) || this;
        _this.parent = parent;
        _this.flag = false;
        _this.removeEventHandler = _this.removeEventListener;
        return _this;
    }
    DropDownEditCell.prototype.write = function (args) {
        var isInline = this.parent.editSettings.mode !== 'Dialog';
        this.column = args.column;
        var pred = new Predicate(args.column.field, 'notequal', null, true, false);
        var params = {};
        if (args.column.edit.params) {
            var keys = Object.keys(args.column.edit.params);
            for (var i = 0; i < keys.length; i++) {
                params[keys[parseInt(i.toString(), 10)]] = keys[parseInt(i.toString(), 10)] === 'query' ?
                    args.column.edit.params[keys[parseInt(i.toString(), 10)]].clone() :
                    args.column.edit.params[keys[parseInt(i.toString(), 10)]];
            }
        }
        this.obj = new DropDownList(extend({
            dataSource: this.parent.dataSource instanceof DataManager ?
                this.parent.dataSource : new DataManager(this.parent.dataSource),
            query: new Query().where(pred).select(args.column.field), enabled: isEditable(args.column, args.requestType, args.element),
            fields: { value: args.column.field },
            value: getObject(args.column.field, args.rowData),
            enableRtl: this.parent.enableRtl,
            placeholder: isInline ? '' : args.column.headerText, popupHeight: '200px',
            floatLabelType: isInline ? 'Never' : 'Always',
            sortOrder: 'Ascending',
            cssClass: this.parent.cssClass ? this.parent.cssClass : null,
            close: this.dropDownClose.bind(this)
        }, params));
        if (this.parent.enableVirtualization) {
            if (params.dataSource) {
                this.obj.dataSource = params.dataSource;
            }
            else {
                this.obj.dataSource = args.column.isForeignColumn() ? [args.foreignKeyData[0]] : [args.rowData];
            }
        }
        this.addEventListener();
        this.obj.query.params = this.parent.query.params;
        this.obj.appendTo(args.element);
        /* tslint:disable-next-line:no-any */
        args.element.setAttribute('name', getComplexFieldID(args.column.field));
    };
    DropDownEditCell.prototype.dropDownClose = function (args) {
        if (args.event && args.event.action === 'escape') {
            this.parent.editModule.editCellDialogClose = true;
        }
    };
    DropDownEditCell.prototype.addEventListener = function () {
        this.ddCreated = this.dropdownCreated.bind(this);
        this.ddOpen = this.dropDownOpen.bind(this);
        this.ddBeforeOpen = this.dropdownBeforeOpen.bind(this);
        this.ddComplete = this.ddActionComplete.bind(this);
        this.obj.addEventListener(literals.create, this.ddCreated);
        this.obj.addEventListener(literals['open'], this.ddOpen);
        this.obj.addEventListener(literals.beforeOpen, this.ddBeforeOpen);
        this.obj.addEventListener(events.actionComplete, this.ddComplete);
    };
    DropDownEditCell.prototype.removeEventListener = function () {
        if (this.obj.isDestroyed) {
            return;
        }
        this.obj.removeEventListener(literals.create, this.ddCreated);
        this.obj.removeEventListener(literals['open'], this.ddOpen);
        this.obj.removeEventListener(literals.beforeOpen, this.ddBeforeOpen);
        this.obj.removeEventListener(events.actionComplete, this.ddComplete);
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    DropDownEditCell.prototype.dropdownCreated = function (e) {
        this.flag = true;
    };
    DropDownEditCell.prototype.dropdownBeforeOpen = function () {
        if (this.parent.enableVirtualization) {
            if (this.column.edit.params && this.column.edit.params.dataSource) {
                this.obj.dataSource = this.column.edit.params.dataSource;
            }
            else {
                this.obj.dataSource = !this.column.isForeignColumn() ? (this.parent.dataSource instanceof DataManager ?
                    this.parent.dataSource : new DataManager(this.parent.dataSource))
                    : this.column.dataSource instanceof DataManager ?
                        this.column.dataSource : new DataManager(this.column.dataSource);
            }
        }
    };
    DropDownEditCell.prototype.ddActionComplete = function (e) {
        e.result = DataUtil.distinct(e.result, this.obj.fields.value, true);
        if (this.flag && this.column.dataSource && !(this.column.edit.params &&
            this.column.edit.params.ddEditedData)) {
            if ('result' in this.column.dataSource) {
                this.column.dataSource.result = e.result;
            }
            else if (this.column.dataSource instanceof DataManager) {
                this.column.dataSource.dataSource.json = e.result;
            }
        }
        this.flag = false;
    };
    DropDownEditCell.prototype.dropDownOpen = function (args) {
        var dlgElement = parentsUntil(this.obj.element, 'e-dialog');
        if (this.parent.editSettings.mode === 'Dialog' && !isNullOrUndefined(dlgElement)) {
            var dlgObj = select('#' + dlgElement.id, document).ej2_instances[0];
            args.popup.element.style.zIndex = (dlgObj.zIndex + 1).toString();
        }
    };
    return DropDownEditCell;
}(EditCellBase));
export { DropDownEditCell };
