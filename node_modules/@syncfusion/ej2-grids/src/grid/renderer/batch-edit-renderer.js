import { classList } from '@syncfusion/ej2-base';
import * as literals from '../base/string-literals';
/**
 * Edit render module is used to render grid edit row.
 *
 * @hidden
 */
var BatchEditRender = /** @class */ (function () {
    /**
     * Constructor for render module
     *
     * @param {IGrid} parent - specifies the IGrid
     */
    function BatchEditRender(parent) {
        this.parent = parent;
    }
    BatchEditRender.prototype.update = function (elements, args) {
        if (this.parent.isReact && args.columnObject && args.columnObject.template) {
            var parentRow = args.cell.parentElement;
            var newTd = args.cell.cloneNode(true);
            parentRow.insertBefore(newTd, args.cell);
            newTd.focus();
            args.cell.remove();
            args.cell = newTd;
        }
        args.cell.setAttribute('aria-label', args.cell.innerHTML + this.parent.localeObj.getConstant('ColumnHeader') + args.columnObject.field);
        args.cell.innerHTML = '';
        args.cell.appendChild(this.getEditElement(elements, args));
        args.cell.classList.add('e-editedbatchcell');
        classList(args.row, [literals.editedRow, 'e-batchrow'], []);
    };
    BatchEditRender.prototype.getEditElement = function (elements, args) {
        var gObj = this.parent;
        var form = this.parent
            .createElement('form', { id: gObj.element.id + 'EditForm', className: 'e-gridform' });
        form.appendChild(elements[args.columnObject.uid]);
        if (args.columnObject.editType === 'booleanedit') {
            args.cell.classList.add('e-boolcell');
        }
        if (!args.columnObject.editType) {
            args.cell.classList.add('e-inputbox');
        }
        return form;
    };
    return BatchEditRender;
}());
export { BatchEditRender };
