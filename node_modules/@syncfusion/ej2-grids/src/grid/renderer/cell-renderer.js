import { remove, addClass } from '@syncfusion/ej2-base';
import { isNullOrUndefined, extend } from '@syncfusion/ej2-base';
import { doesImplementInterface, setStyleAndAttributes, appendChildren, extendObjWithFn, addStickyColumnPosition } from '../base/util';
import { createCheckBox } from '@syncfusion/ej2-buttons';
import { foreignKeyData } from '../base/constant';
import { CellType } from '../base/enum';
import * as literals from '../base/string-literals';
/**
 * CellRenderer class which responsible for building cell content.
 *
 * @hidden
 */
var CellRenderer = /** @class */ (function () {
    function CellRenderer(parent, locator) {
        this.localizer = locator.getService('localization');
        this.formatter = locator.getService('valueFormatter');
        this.parent = parent;
        this.element = this.parent.createElement('TD', { className: literals.rowCell, attrs: { role: 'gridcell', tabindex: '-1' } });
        this.rowChkBox = this.parent.createElement('input', { className: 'e-checkselect', attrs: { 'type': 'checkbox', 'aria-label': this.localizer.getConstant('SelectRow') } });
    }
    /**
     * Function to return the wrapper for the TD content
     *
     * @returns {string | Element} returns the string
     */
    CellRenderer.prototype.getGui = function () {
        return '';
    };
    /**
     * Function to format the cell value.
     *
     * @param  {Column} column - specifies the column
     * @param  {Object} value - specifies the value
     * @param  {Object} data - specifies the data
     * @returns {string} returns the format
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    CellRenderer.prototype.format = function (column, value, data) {
        if (!isNullOrUndefined(column.format)) {
            if (column.type === 'number' && isNaN(parseInt(value, 10))) {
                value = null;
            }
            if (column.type === 'dateonly' && typeof value === 'string' && value) {
                var arr = value.split(/[^0-9.]/);
                value = new Date(parseInt(arr[0], 10), parseInt(arr[1], 10) - 1, parseInt(arr[2], 10));
            }
            value = this.formatter.toView(value, column.getFormatter());
        }
        return isNullOrUndefined(value) ? '' : value.toString();
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    CellRenderer.prototype.evaluate = function (node, cell, data, attributes, fData, isEdit) {
        var _a;
        var result;
        if (cell.column.template) {
            var isReactCompiler = this.parent.isReact && typeof (cell.column.template) !== 'string' && cell.column.template.prototype && !(cell.column.template.prototype).CSPTemplate;
            var isReactChild = this.parent.parentDetails && this.parent.parentDetails.parentInstObj &&
                this.parent.parentDetails.parentInstObj.isReact;
            var literals_1 = ['index'];
            var dummyData = extendObjWithFn({}, data, (_a = {}, _a[foreignKeyData] = fData, _a.column = cell.column, _a));
            var templateID = this.parent.element.id + cell.column.uid;
            var str = 'isStringTemplate';
            if (isReactCompiler || isReactChild) {
                var copied = { 'index': attributes[literals_1[0]] };
                cell.column.getColumnTemplate()(extend(copied, dummyData), this.parent, 'columnTemplate', templateID, this.parent["" + str], null, node);
            }
            else {
                result = cell.column.getColumnTemplate()(extend({ 'index': attributes[literals_1[0]] }, dummyData), this.parent, 'template', templateID, this.parent["" + str], undefined, undefined, this.parent['root']);
            }
            if (!isReactCompiler && !isReactChild) {
                appendChildren(node, result);
            }
            this.parent.notify('template-result', { template: result });
            result = null;
            node.setAttribute('aria-label', node.innerText + this.localizer.getConstant('TemplateCell') +
                this.localizer.getConstant('ColumnHeader') + cell.column.headerText);
            return false;
        }
        return true;
    };
    /**
     * Function to invoke the custom formatter available in the column object.
     *
     * @param  {Column} column - specifies the column
     * @param  {Object} value - specifies the value
     * @param  {Object} data - specifies the data
     * @returns {Object} returns the object
     */
    CellRenderer.prototype.invokeFormatter = function (column, value, data) {
        if (!isNullOrUndefined(column.formatter)) {
            if (doesImplementInterface(column.formatter, 'getValue')) {
                var formatter = column.formatter;
                value = new formatter().getValue(column, data);
            }
            else if (typeof column.formatter === 'function') {
                value = column.formatter(column, data);
            }
            else {
                value = column.formatter.getValue(column, data);
            }
        }
        return value;
    };
    /**
     * Function to render the cell content based on Column object.
     *
     * @param {Cell<Column>} cell - specifies the cell
     * @param {Object} data - specifies the data
     * @param {Object} attributes - specifies the attributes
     * @param {boolean} isExpand - specifies the boolean for expand
     * @param {boolean} isEdit - specifies the boolean for edit
     * @returns {Element} returns the element
     */
    CellRenderer.prototype.render = function (cell, data, attributes, isExpand, isEdit) {
        return this.refreshCell(cell, data, attributes, isEdit);
    };
    /**
     * Function to refresh the cell content based on Column object.
     *
     * @param {Element} td - specifies the element
     * @param {Cell<Column>} cell - specifies the cell
     * @param {Object} data - specifies the data
     * @param {Object} attributes - specifies the attribute
     * @returns {void}
     */
    CellRenderer.prototype.refreshTD = function (td, cell, data, attributes) {
        var isEdit = this.parent.editSettings.mode === 'Batch' && td.classList.contains('e-editedbatchcell');
        if (this.parent.isReact) {
            var cellIndex = td.cellIndex;
            var parentRow = td.parentElement;
            remove(td);
            var newTD = this.refreshCell(cell, data, attributes, isEdit);
            this.cloneAttributes(newTD, td);
            if (parentRow.cells.length !== cellIndex - 1) {
                parentRow.insertBefore(newTD, parentRow.cells[parseInt(cellIndex.toString(), 10)]);
            }
            else {
                parentRow.appendChild(newTD);
            }
        }
        else {
            var node = this.refreshCell(cell, data, attributes, isEdit);
            td.innerHTML = '';
            var arialabelText = node.getAttribute('aria-label');
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            arialabelText ? td.setAttribute('aria-label', arialabelText) : null;
            var elements = [].slice.call(node.childNodes);
            for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
                var elem = elements_1[_i];
                td.appendChild(elem);
            }
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    CellRenderer.prototype.cloneAttributes = function (target, source) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var attrs = source.attributes;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var i = attrs.length;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var attr;
        while (i--) {
            attr = attrs[parseInt(i.toString(), 10)];
            target.setAttribute(attr.name, attr.value);
        }
    };
    CellRenderer.prototype.refreshCell = function (cell, data, attributes, isEdit) {
        var _a;
        var node = this.element.cloneNode();
        var column = cell.column;
        var fData;
        if (cell.isForeignKey) {
            fData = cell.foreignKeyData[0] || (_a = {}, _a[column.foreignKeyValue] = column.format ? null : '', _a);
        }
        //Prepare innerHtml
        var innerHtml = this.getGui();
        var value = cell.isForeignKey ? this.getValue(column.foreignKeyValue, fData, column) :
            this.getValue(column.field, data, column);
        if ((column.type === 'date' || column.type === 'datetime') && !isNullOrUndefined(value)) {
            value = new Date(value);
        }
        if (column.type === 'dateonly' && !isNullOrUndefined(value) && typeof value === 'string') {
            var arr = value.split(/[^0-9.]/);
            value = new Date(parseInt(arr[0], 10), parseInt(arr[1], 10) - 1, parseInt(arr[2], 10));
        }
        value = this.format(column, value, data);
        innerHtml = value.toString();
        if (column.type === 'boolean' && !column.displayAsCheckBox) {
            var localeStr = (value !== 'true' && value !== 'false') ? null : value === 'true' ? 'True' : 'False';
            innerHtml = localeStr ? this.localizer.getConstant(localeStr) : innerHtml;
        }
        var fromFormatter = this.invokeFormatter(column, value, data);
        innerHtml = !isNullOrUndefined(column.formatter) ? isNullOrUndefined(fromFormatter) ? '' : fromFormatter.toString() : innerHtml;
        if (this.evaluate(node, cell, data, attributes, fData, isEdit) && column.type !== 'checkbox') {
            this.appendHtml(node, this.parent.sanitize(innerHtml), column.getDomSetter ? column.getDomSetter() : 'innerHTML');
        }
        else if (column.type === 'checkbox') {
            node.classList.add(literals.gridChkBox);
            if (this.parent.selectionSettings.persistSelection) {
                value = value === 'true';
            }
            else {
                value = false;
            }
            var checkWrap = createCheckBox(this.parent.createElement, false, { checked: value, label: ' ' });
            if (this.parent.cssClass) {
                addClass([checkWrap], [this.parent.cssClass]);
            }
            this.rowChkBox.id = 'checkbox-' + cell.rowID;
            checkWrap.insertBefore(this.rowChkBox.cloneNode(), checkWrap.firstChild);
            node.appendChild(checkWrap);
        }
        if (this.parent.checkAllRows === 'Check' && this.parent.enableVirtualization) {
            cell.isSelected = true;
        }
        this.setAttributes(node, cell, attributes);
        if (column.type === 'boolean' && column.displayAsCheckBox) {
            var checked = isNaN(parseInt(value.toString(), 10)) ? value === 'true' : parseInt(value.toString(), 10) > 0;
            var checkWrap = createCheckBox(this.parent.createElement, false, { checked: checked, label: ' ' });
            node.innerHTML = '';
            node.classList.add('e-gridchkbox-cell');
            checkWrap.classList.add('e-checkbox-disabled');
            if (this.parent.cssClass) {
                addClass([checkWrap], [this.parent.cssClass]);
            }
            node.appendChild(checkWrap);
        }
        if (node.classList.contains('e-summarycell') && !data.key) {
            var uid = node.getAttribute('e-mappinguid');
            column = this.parent.getColumnByUid(uid);
            node.setAttribute('aria-label', innerHtml + this.localizer.getConstant('ColumnHeader') + cell.column.headerText);
        }
        if (this.parent.isFrozenGrid() && (!data || (data && !data.key))) {
            addStickyColumnPosition(this.parent, column, node);
        }
        return node;
    };
    /**
     * Function to specifies how the result content to be placed in the cell.
     *
     * @param {Element} node - specifies the node
     * @param {string|Element} innerHtml - specifies the innerHTML
     * @param {string} property - specifies the element
     * @returns {Element} returns the element
     */
    CellRenderer.prototype.appendHtml = function (node, innerHtml, property) {
        if (property === void 0) { property = 'innerHTML'; }
        node["" + property] = innerHtml;
        return node;
    };
    /**
     * @param {HTMLElement} node - specifies the node
     * @param {cell<Column>} cell - specifies the cell
     * @param {Object} attributes - specifies the attributes
     * @returns {void}
     * @hidden
     */
    CellRenderer.prototype.setAttributes = function (node, cell, attributes) {
        var column = cell.column;
        this.buildAttributeFromCell(node, cell, column.type === 'checkbox');
        setStyleAndAttributes(node, attributes);
        setStyleAndAttributes(node, cell.attributes);
        if (column.customAttributes) {
            setStyleAndAttributes(node, column.customAttributes);
        }
        if (this.parent.rowRenderingMode === 'Vertical') {
            setStyleAndAttributes(node, { 'data-cell': column.headerText });
        }
        if (column.textAlign) {
            node.style.textAlign = column.textAlign;
        }
        if (column.clipMode === 'Clip' || (!column.clipMode && this.parent.clipMode === 'Clip')) {
            node.classList.add('e-gridclip');
        }
        else if (column.clipMode === 'EllipsisWithTooltip' || (!column.clipMode && this.parent.clipMode === 'EllipsisWithTooltip')
            && !(this.parent.allowTextWrap && (this.parent.textWrapSettings.wrapMode === 'Content'
                || this.parent.textWrapSettings.wrapMode === 'Both'))) {
            if (column.type !== 'checkbox') {
                node.classList.add('e-ellipsistooltip');
            }
        }
    };
    CellRenderer.prototype.buildAttributeFromCell = function (node, cell, isCheckBoxType) {
        var attr = {};
        var prop = { 'colindex': literals.dataColIndex };
        var classes = [];
        if (cell.colSpan) {
            attr.colSpan = cell.colSpan;
        }
        if (cell.rowSpan) {
            attr.rowSpan = cell.rowSpan;
        }
        if (cell.isTemplate) {
            classes.push('e-templatecell');
        }
        if (cell.isSelected) {
            classes.push.apply(classes, ['e-selectionbackground', 'e-active']);
            if (isCheckBoxType) {
                node.querySelector('.e-frame').classList.add('e-check');
            }
        }
        if (cell.isColumnSelected) {
            classes.push.apply(classes, ['e-columnselection']);
        }
        if (cell.cellType === CellType.Header) {
            attr[prop.colindex] = cell.colIndex;
            attr[literals.ariaColIndex] = cell.colIndex + 1;
        }
        else if (!isNullOrUndefined(cell.index)) {
            attr[prop.colindex] = cell.index;
            attr[literals.ariaColIndex] = cell.index + 1;
        }
        if (!cell.visible) {
            classes.push('e-hide');
        }
        attr.class = classes;
        setStyleAndAttributes(node, attr);
    };
    CellRenderer.prototype.getValue = function (field, data, column) {
        return column.valueAccessor(field, data, column);
    };
    return CellRenderer;
}());
export { CellRenderer };
