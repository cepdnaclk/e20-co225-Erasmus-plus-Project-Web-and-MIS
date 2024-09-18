import { createElement, remove } from '@syncfusion/ej2-base';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
/**
 * `PagerDropDown` module handles selected pageSize from DropDownList.
 */
var PagerDropDown = /** @class */ (function () {
    /**
     * Constructor for pager module
     *
     * @param {Pager} pagerModule - specifies the pagermodule
     * @hidden
     */
    function PagerDropDown(pagerModule) {
        this.pagerModule = pagerModule;
    }
    /**
     * For internal use only - Get the module name.
     *
     * @returns {string} returns the module name
     * @private
     * @hidden
     */
    PagerDropDown.prototype.getModuleName = function () {
        return 'pagerdropdown';
    };
    /**
     * The function is used to render pager dropdown
     *
     * @returns {void}
     * @hidden
     */
    PagerDropDown.prototype.render = function () {
        var pagerObj = this.pagerModule;
        this.pagerDropDownDiv = createElement('div', { className: 'e-pagesizes' });
        var dropDownDiv = createElement('div', { className: 'e-pagerdropdown' });
        var defaultTextDiv = createElement('div', { className: 'e-pagerconstant' });
        var input = createElement('input', { attrs: { type: 'text', tabindex: '-1' } });
        this.pagerCons = createElement('span', {
            className: 'e-constant', innerHTML: this.pagerModule.getLocalizedLabel('pagerDropDown')
        });
        dropDownDiv.appendChild(input);
        defaultTextDiv.appendChild(this.pagerCons);
        this.pagerDropDownDiv.appendChild(dropDownDiv);
        this.pagerDropDownDiv.appendChild(defaultTextDiv);
        this.pagerModule.element.appendChild(this.pagerDropDownDiv);
        var pageSizesModule = this.pagerModule.pageSizes;
        var pageSizesArray = (pageSizesModule.length ? this.convertValue(pageSizesModule) :
            [this.pagerModule.getLocalizedLabel('All'), '5', '10', '12', '20']);
        var defaultValue = this.pagerModule.pageSize;
        this.dropDownListObject = new DropDownList({
            dataSource: pageSizesArray,
            value: defaultValue.toString(),
            change: this.onChange.bind(this),
            placeholder: this.pagerModule.getLocalizedLabel('pagerDropDown'),
            cssClass: this.pagerModule.cssClass ? 'e-alldrop' + ' ' + this.pagerModule.cssClass : 'e-alldrop'
        });
        this.dropDownListObject.appendTo(input);
        if (pageSizesModule.length) {
            this.dropDownListObject.element.value = this.pagerModule.pageSize.toString();
        }
        pagerObj.pageSize = defaultValue;
        pagerObj.dataBind();
        pagerObj.trigger('dropDownChanged', { pageSize: defaultValue });
        this.addEventListener();
    };
    /**
     * For internal use only - Get the pagesize.
     *
     * @param {ChangeEventArgs} e - specifies the changeeventargs
     * @returns {void}
     * @private
     * @hidden
     */
    PagerDropDown.prototype.onChange = function (e) {
        if (this.dropDownListObject.value === this.pagerModule.getLocalizedLabel('All')) {
            this.pagerModule.pageSize = this.pagerModule.totalRecordsCount;
            this.pagerModule.isAllPage = true;
            this.refresh();
            e.value = this.pagerModule.pageSize;
            if (document.getElementsByClassName('e-popup-open e-alldrop').length) {
                document.getElementsByClassName('e-popup-open e-alldrop')[0].style.display = 'none';
            }
        }
        else {
            this.pagerModule.pageSize = parseInt(this.dropDownListObject.value, 10);
            this.pagerModule.isAllPage = false;
            if (this.pagerCons.innerHTML !== this.pagerModule.getLocalizedLabel('pagerDropDown')) {
                this.refresh();
            }
        }
        this.pagerModule.dataBind();
        if (!this.pagerModule.isCancel) {
            this.pagerModule.trigger('dropDownChanged', {
                pageSize: this.pagerModule.isAllPage ||
                    (this.pagerModule.isAllPage === undefined && this.dropDownListObject.value === this.pagerModule.getLocalizedLabel('All')) ?
                    this.pagerModule.totalRecordsCount : parseInt(this.dropDownListObject.value, 10)
            });
        }
    };
    PagerDropDown.prototype.refresh = function () {
        if (this.pagerCons) {
            if (this.isPageSizeAll(this.pagerModule.pageSize)) {
                this.pagerCons.innerHTML = this.pagerModule.getLocalizedLabel('pagerAllDropDown');
                this.pagerCons.parentElement.classList.add('e-page-all');
            }
            else {
                this.pagerCons.innerHTML = this.pagerModule.getLocalizedLabel('pagerDropDown');
                this.pagerCons.parentElement.classList.remove('e-page-all');
            }
            this.pagerDropDownDiv.classList.remove('e-hide');
        }
    };
    PagerDropDown.prototype.beforeValueChange = function (prop) {
        if (typeof prop.newProp.value === 'number') {
            var val = prop.newProp.value.toString();
            prop.newProp.value = val;
        }
    };
    PagerDropDown.prototype.convertValue = function (pageSizeValue) {
        var item = pageSizeValue;
        for (var i = 0; i < item.length; i++) {
            item[parseInt(i.toString(), 10)] = parseInt(item[parseInt(i.toString(), 10)], 10) ?
                item[parseInt(i.toString(), 10)].toString() : (this.pagerModule.getLocalizedLabel(item[parseInt(i.toString(), 10)]) !== '')
                ? this.pagerModule.getLocalizedLabel(item[parseInt(i.toString(), 10)]) : item[parseInt(i.toString(), 10)];
        }
        return item;
    };
    PagerDropDown.prototype.isPageSizeAll = function (value) {
        var pageSizeNum = typeof (value) === 'string' && value !== this.pagerModule.getLocalizedLabel('All') ?
            parseInt(value, 10) : value;
        if (pageSizeNum === this.pagerModule.totalRecordsCount || value === this.pagerModule.getLocalizedLabel('All')) {
            return true;
        }
        else {
            return false;
        }
    };
    PagerDropDown.prototype.setDropDownValue = function (prop, value) {
        if (this.dropDownListObject) {
            var isbeforeAll = this.pagerModule.isAllPage;
            this.pagerModule.isAllPage = this.isPageSizeAll(value);
            this.pagerModule.checkAll = (isbeforeAll && this.pagerModule.isAllPage) ? true : false;
            this.dropDownListObject["" + prop] = this.pagerModule.isAllPage ? this.pagerModule.getLocalizedLabel('All') : value;
        }
    };
    PagerDropDown.prototype.addEventListener = function () {
        this.dropDownListObject.on('beforeValueChange', this.beforeValueChange, this);
    };
    PagerDropDown.prototype.removeEventListener = function () {
        this.dropDownListObject.off('beforeValueChange', this.beforeValueChange);
    };
    /**
     * To destroy the Pagerdropdown
     *
     * @param {string} args - specifies the arguments
     * @param {string} args.requestType - specfies the request type
     * @returns {void}
     * @hidden
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    PagerDropDown.prototype.destroy = function (args) {
        if (this.dropDownListObject && !this.dropDownListObject.isDestroyed) {
            this.removeEventListener();
            this.dropDownListObject.destroy();
            remove(this.pagerDropDownDiv);
        }
    };
    return PagerDropDown;
}());
export { PagerDropDown };
