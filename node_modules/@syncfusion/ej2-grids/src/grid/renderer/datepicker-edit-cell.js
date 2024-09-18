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
import { extend } from '@syncfusion/ej2-base';
import { DatePicker, DateTimePicker, MaskedDateTime } from '@syncfusion/ej2-calendars';
import { isEditable, getObject, getCustomDateFormat } from '../base/util';
import { EditCellBase } from './edit-cell-base';
DatePicker.Inject(MaskedDateTime);
/**
 * `DatePickerEditCell` is used to handle datepicker cell type editing.
 *
 * @hidden
 */
var DatePickerEditCell = /** @class */ (function (_super) {
    __extends(DatePickerEditCell, _super);
    function DatePickerEditCell() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DatePickerEditCell.prototype.write = function (args) {
        this.edit = this.parent.editModule;
        if (args.column.editType === 'datepickeredit') {
            this.obj = new DatePicker(extend(dateanddatetimerender(args, this.parent.editSettings.mode, this.parent.enableRtl, this.parent.cssClass, this), args.column.edit.params));
        }
        else if (args.column.editType === 'datetimepickeredit') {
            this.obj = new DateTimePicker(extend(dateanddatetimerender(args, this.parent.editSettings.mode, this.parent.enableRtl, this.parent.cssClass, this), args.column.edit.params));
        }
        this.obj.appendTo(args.element);
    };
    return DatePickerEditCell;
}(EditCellBase));
export { DatePickerEditCell };
// eslint-disable-next-line
function dateanddatetimerender(args, mode, rtl, css, datePickerEditCell) {
    var isInline = mode !== 'Dialog';
    var format = getCustomDateFormat(args.column.format, args.column.type);
    var value = getObject(args.column.field, args.rowData);
    value = value ? new Date(value) : null;
    return {
        floatLabelType: isInline ? 'Never' : 'Always',
        value: value,
        format: format,
        placeholder: isInline ?
            '' : args.column.headerText, enableRtl: rtl,
        enabled: isEditable(args.column, args.requestType, args.element),
        cssClass: css ? css : null,
        close: datePickerClose.bind(datePickerEditCell)
    };
}
// eslint-disable-next-line
function datePickerClose(args) {
    if (args.event && args.event.action === 'escape') {
        this.edit.editCellDialogClose = true;
    }
}
