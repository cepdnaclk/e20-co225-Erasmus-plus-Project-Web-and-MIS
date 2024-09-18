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
define(["require", "exports", "@syncfusion/ej2-base/helpers/e2e"], function (require, exports, e2e_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var GridHelper = (function (_super) {
        __extends(GridHelper, _super);
        function GridHelper(id, wrapperFn) {
            var _this = _super.call(this) || this;
            _this.id = id;
            if (wrapperFn !== undefined) {
                _this.wrapperFn = wrapperFn;
            }
            return _this;
        }
        GridHelper.prototype.getDataGridElement = function () {
            return this.selector('#' + this.id);
        };
        GridHelper.prototype.getHeaderElement = function () {
            return this.selector('#' + this.id + '.e-gridheader');
        };
        GridHelper.prototype.getContentElement = function () {
            return this.selector('#' + this.id + '.e-gridcontent');
        };
        GridHelper.prototype.getFooterElement = function () {
            return this.selector('#' + this.id + '.e-gridfooter');
        };
        GridHelper.prototype.getPagerElement = function () {
            return this.selector('#' + this.id + '.e-gridpager');
        };
        GridHelper.prototype.getDialogElement = function () {
            return this.selector('#' + this.id + '_dialogEdit_wrapper');
        };
        GridHelper.prototype.getFilterPopupElement = function () {
            return this.selector('#' + this.id + '.e-filter-popup');
        };
        GridHelper.prototype.getToolbarElement = function () {
            return this.selector('#' + this.id + '_toolbarItems');
        };
        GridHelper.prototype.getCurrentPagerElement = function () {
            return this.selector('#' + this.id + '.e-numericitem.e-currentitem');
        };
        GridHelper.prototype.getPagerDropDownElement = function () {
            return this.selector('#' + this.id + '.e-pagerdropdown');
        };
        return GridHelper;
    }(e2e_1.TestHelper));
    exports.GridHelper = GridHelper;
});
