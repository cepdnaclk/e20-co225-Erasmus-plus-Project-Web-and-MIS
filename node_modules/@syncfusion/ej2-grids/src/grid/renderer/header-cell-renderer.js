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
import { isNullOrUndefined, extend, addClass } from '@syncfusion/ej2-base';
import { attributes } from '@syncfusion/ej2-base';
import { setStyleAndAttributes, appendChildren, addStickyColumnPosition } from '../base/util';
import { CellRenderer } from './cell-renderer';
import { AriaService } from '../services/aria-service';
import { createCheckBox } from '@syncfusion/ej2-buttons';
import { headerCellInfo } from '../base/constant';
/**
 * HeaderCellRenderer class which responsible for building header cell content.
 *
 * @hidden
 */
var HeaderCellRenderer = /** @class */ (function (_super) {
    __extends(HeaderCellRenderer, _super);
    function HeaderCellRenderer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.element = _this.parent
            .createElement('TH', { className: 'e-headercell', attrs: { tabindex: '-1', role: 'columnheader' } });
        _this.ariaService = new AriaService();
        _this.hTxtEle = _this.parent.createElement('span', { className: 'e-headertext' });
        _this.sortEle = _this.parent.createElement('div', { className: 'e-sortfilterdiv e-icons', attrs: { 'aria-hidden': 'true' } });
        _this.gui = _this.parent.createElement('div');
        _this.chkAllBox = _this.parent.createElement('input', { className: 'e-checkselectall', attrs: { 'type': 'checkbox', 'aria-label': _this.localizer.getConstant('SelectAllCheckbox') } });
        return _this;
    }
    /**
     * Function to return the wrapper for the TH content.
     *
     * @returns {string | Element} returns the element
     */
    HeaderCellRenderer.prototype.getGui = function () {
        return this.gui.cloneNode();
    };
    /**
     * Function to render the cell content based on Column object.
     *
     * @param {Cell} cell - specifies the column
     * @param {Object} data - specifies the data
     * @param {object} attributes - specifies the aattributes
     * @returns {Element} returns the element
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    HeaderCellRenderer.prototype.render = function (cell, data, attributes) {
        var node = this.element.cloneNode();
        var fltrMenuEle = this.parent.createElement('div', { className: 'e-filtermenudiv e-icons e-icon-filter', attrs: { 'aria-hidden': 'true' } });
        return this.prepareHeader(cell, node, fltrMenuEle);
    };
    /**
     * Function to refresh the cell content based on Column object.
     *
     * @param  {Cell} cell - specifies the cell
     * @param  {Element} node - specifies the noe
     * @returns {Element} returns the element
     */
    HeaderCellRenderer.prototype.refresh = function (cell, node) {
        this.clean(node);
        var fltrMenuEle = this.parent.createElement('div', { className: 'e-filtermenudiv e-icons e-icon-filter', attrs: { 'aria-hidden': 'true' } });
        return this.prepareHeader(cell, node, fltrMenuEle);
    };
    HeaderCellRenderer.prototype.clean = function (node) {
        node.innerHTML = '';
    };
    /* tslint:disable-next-line:max-func-body-length */
    HeaderCellRenderer.prototype.prepareHeader = function (cell, node, fltrMenuEle) {
        var column = cell.column;
        var ariaAttr = {};
        var elementDesc = '';
        //Prepare innerHtml
        var innerDIV = this.getGui();
        var hValueAccer;
        attributes(innerDIV, {
            'e-mappinguid': column.uid,
            'class': 'e-headercelldiv'
        });
        if (!isNullOrUndefined(column.headerValueAccessor)) {
            hValueAccer = this.getValue(column.headerText, column);
        }
        if (this.parent.allowSorting && column.allowSorting && !isNullOrUndefined(column.field)) {
            node.classList.add('e-sort-icon');
        }
        if (column.type !== 'checkbox') {
            var value = column.headerText;
            if (!isNullOrUndefined(hValueAccer)) {
                value = hValueAccer;
            }
            var headerText = this.hTxtEle.cloneNode();
            headerText[column.getDomSetter()] = this.parent.sanitize(value);
            innerDIV.appendChild(headerText);
        }
        else {
            column.editType = 'booleanedit';
            var checkAllWrap = createCheckBox(this.parent.createElement, false, { checked: false, label: ' ' });
            this.chkAllBox.id = 'checkbox-' + column.uid;
            checkAllWrap.insertBefore(this.chkAllBox.cloneNode(), checkAllWrap.firstChild);
            if (this.parent.cssClass) {
                addClass([checkAllWrap], [this.parent.cssClass]);
            }
            innerDIV.appendChild(checkAllWrap);
            innerDIV.classList.add('e-headerchkcelldiv');
        }
        this.buildAttributeFromCell(node, cell);
        this.appendHtml(node, innerDIV);
        node.appendChild(this.sortEle.cloneNode());
        if ((this.parent.allowFiltering && this.parent.filterSettings.type !== 'FilterBar') &&
            (column.allowFiltering && !isNullOrUndefined(column.field)) &&
            !(this.parent.showColumnMenu && column.showColumnMenu)) {
            attributes(fltrMenuEle, {
                'e-mappinguid': 'e-flmenu-' + column.uid
            });
            elementDesc = elementDesc.length ? elementDesc + '. ' + this.localizer.getConstant('FilterDescription') : this.localizer.getConstant('FilterDescription');
            node.classList.add('e-fltr-icon');
            var matchFlColumns = [];
            if (this.parent.filterSettings.columns.length && this.parent.filterSettings.columns.length !== matchFlColumns.length) {
                var foreignColumn = this.parent.getForeignKeyColumns();
                for (var index = 0; index < this.parent.columns.length; index++) {
                    for (var count = 0; count < this.parent.filterSettings.columns.length; count++) {
                        if (this.parent.filterSettings.columns[parseInt(count.toString(), 10)].field === column.field
                            || (foreignColumn.length
                                && column.foreignKeyValue === this.parent.filterSettings.columns[parseInt(count.toString(), 10)].field)) {
                            fltrMenuEle.classList.add('e-filtered');
                            matchFlColumns.push(column.field);
                            break;
                        }
                    }
                }
            }
            node.appendChild(fltrMenuEle.cloneNode());
        }
        if (cell.className) {
            node.classList.add(cell.className);
        }
        if (column.customAttributes) {
            setStyleAndAttributes(node, column.customAttributes);
        }
        if (this.parent.allowSorting && column.allowSorting) {
            ariaAttr.sort = 'none';
            elementDesc = elementDesc.length ? elementDesc + '. ' + this.localizer.getConstant('SortDescription') : this.localizer.getConstant('SortDescription');
        }
        if ((this.parent.allowGrouping && column.allowGrouping) || this.parent.allowReordering && column.allowReordering) {
            ariaAttr.grabbed = false;
            elementDesc = elementDesc.length ? elementDesc + '. ' + this.localizer.getConstant('GroupDescription') : this.localizer.getConstant('GroupDescription');
        }
        if (this.parent.showColumnMenu && column.type !== 'checkbox' && !column.template) {
            elementDesc = elementDesc.length ? elementDesc + '. ' + this.localizer.getConstant('ColumnMenuDescription') : this.localizer.getConstant('ColumnMenuDescription');
        }
        node = this.extendPrepareHeader(column, node);
        var result;
        var gridObj = this.parent;
        var colIndex = gridObj.getColumnIndexByField(column.field);
        if (!isNullOrUndefined(column.headerTemplate)) {
            //need to pass the template id for blazor headertemplate
            var headerTempID = gridObj.element.id + column.uid + 'headerTemplate';
            var str = 'isStringTemplate';
            var col = column;
            var isReactCompiler = this.parent.isReact && typeof (column.headerTemplate) !== 'string';
            var isReactChild_1 = this.parent.parentDetails && this.parent.parentDetails.parentInstObj &&
                this.parent.parentDetails.parentInstObj.isReact;
            if (isReactCompiler || isReactChild_1) {
                var copied = { 'index': colIndex };
                node.firstElementChild.innerHTML = '';
                column.getHeaderTemplate()(extend(copied, col), gridObj, 'headerTemplate', headerTempID, this.parent["" + str], null, node.firstElementChild);
                this.parent.renderTemplates();
            }
            else {
                result = column.getHeaderTemplate()(extend({ 'index': colIndex }, col), gridObj, 'headerTemplate', headerTempID, this.parent["" + str], undefined, undefined, this.parent['root']);
                node.firstElementChild.innerHTML = '';
                appendChildren(node.firstElementChild, result);
            }
        }
        this.ariaService.setOptions(node, ariaAttr);
        if (!isNullOrUndefined(column.headerTextAlign) || !isNullOrUndefined(column.textAlign)) {
            var alignment = column.headerTextAlign || column.textAlign;
            innerDIV.style.textAlign = alignment;
            if (alignment === 'Right' || alignment === 'Left') {
                node.classList.add(alignment === 'Right' ? 'e-rightalign' : 'e-leftalign');
            }
            else if (alignment === 'Center') {
                node.classList.add('e-centeralign');
            }
        }
        if (column.clipMode === 'Clip' || (!column.clipMode && this.parent.clipMode === 'Clip')) {
            node.classList.add('e-gridclip');
        }
        else if ((column.clipMode === 'EllipsisWithTooltip' || (!column.clipMode && this.parent.clipMode === 'EllipsisWithTooltip'))
            && !(gridObj.allowTextWrap && (gridObj.textWrapSettings.wrapMode === 'Header'
                || gridObj.textWrapSettings.wrapMode === 'Both'))) {
            if (column.type !== 'checkbox') {
                node.classList.add('e-ellipsistooltip');
            }
        }
        if (elementDesc) {
            var titleElem = (this.parent.createElement('span', { id: 'headerTitle-' + column.uid, innerHTML: elementDesc, attrs: { style: 'display:none' } }));
            node.appendChild(titleElem);
            node.setAttribute('aria-describedby', titleElem.id);
        }
        node.setAttribute('aria-rowspan', (!isNullOrUndefined(cell.rowSpan) ? cell.rowSpan : 1).toString());
        node.setAttribute('aria-colspan', '1');
        var isReactChild = this.parent.parentDetails && this.parent.parentDetails.parentInstObj &&
            this.parent.parentDetails.parentInstObj.isReact;
        if (((this.parent.isReact && this.parent.requireTemplateRef)
            || (isReactChild && this.parent.parentDetails.parentInstObj.requireTemplateRef))
            && !isNullOrUndefined(column.headerTemplate)) {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            var thisRef_1 = this;
            thisRef_1.parent.renderTemplates(function () {
                thisRef_1.parent.trigger(headerCellInfo, { cell: cell, node: node });
            });
        }
        else {
            this.parent.trigger(headerCellInfo, { cell: cell, node: node });
        }
        if (this.parent.isFrozenGrid()) {
            addStickyColumnPosition(this.parent, column, node);
        }
        return node;
    };
    HeaderCellRenderer.prototype.getValue = function (field, column) {
        return column.headerValueAccessor(field, column);
    };
    HeaderCellRenderer.prototype.extendPrepareHeader = function (column, node) {
        if (this.parent.showColumnMenu && column.showColumnMenu && !isNullOrUndefined(column.field)) {
            var element = (this.parent.createElement('div', { className: 'e-icons e-columnmenu', attrs: { 'aria-hidden': 'true' } }));
            var matchFilteredColumns = [];
            if (this.parent.filterSettings.columns.length && this.parent.filterSettings.columns.length !== matchFilteredColumns.length) {
                for (var i = 0; i < this.parent.columns.length; i++) {
                    for (var j = 0; j < this.parent.filterSettings.columns.length; j++) {
                        if (this.parent.filterSettings.columns[parseInt(j.toString(), 10)].field === column.field) {
                            element.classList.add('e-filtered');
                            matchFilteredColumns.push(column.field);
                            break;
                        }
                    }
                }
            }
            node.classList.add('e-fltr-icon');
            node.appendChild(element);
        }
        if (this.parent.allowResizing) {
            var handler = this.parent.createElement('div');
            handler.className = column.allowResizing ? 'e-rhandler e-rcursor' : 'e-rsuppress';
            node.appendChild(handler);
        }
        return node;
    };
    /**
     * Function to specifies how the result content to be placed in the cell.
     *
     * @param  {Element} node - specifies the node
     * @param  {string|Element} innerHtml - specifies the innerHtml
     * @returns {Element} returns the element
     */
    HeaderCellRenderer.prototype.appendHtml = function (node, innerHtml) {
        node.appendChild(innerHtml);
        return node;
    };
    return HeaderCellRenderer;
}(CellRenderer));
export { HeaderCellRenderer };
