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
    var TreeGridHelper = (function (_super) {
        __extends(TreeGridHelper, _super);
        function TreeGridHelper(id, wrapperFn) {
            var _this = _super.call(this) || this;
            _this.id = id;
            if (wrapperFn !== undefined) {
                _this.wrapperFn = wrapperFn;
            }
            return _this;
        }
        TreeGridHelper.prototype.getDataGridElement = function () {
            return this.selector('#' + this.id);
        };
        TreeGridHelper.prototype.getHeaderElement = function () {
            return this.selector('#' + this.id + ' .e-gridheader');
        };
        TreeGridHelper.prototype.getContentElement = function () {
            return this.selector('#' + this.id + ' .e-gridcontent');
        };
        TreeGridHelper.prototype.getFooterElement = function () {
            return this.selector('#' + this.id + ' .e-gridfooter');
        };
        TreeGridHelper.prototype.getPagerElement = function () {
            return this.selector('#' + this.id + ' .e-gridpager');
        };
        TreeGridHelper.prototype.getDialogElement = function () {
            return this.selector('#' + this.id + '_gridcontrol_dialogEdit_wrapper');
        };
        TreeGridHelper.prototype.getFilterPopupElement = function () {
            return this.selector('#' + this.id + ' .e-filter-popup');
        };
        TreeGridHelper.prototype.getToolbarElement = function () {
            return this.selector('#' + this.id + '_gridcontrol_toolbarItems');
        };
        TreeGridHelper.prototype.getCurrentPagerElement = function () {
            return this.selector('#' + this.id + ' .e-numericitem.e-currentitem');
        };
        TreeGridHelper.prototype.getPagerDropDownElement = function () {
            return this.selector('#' + this.id + ' .e-pagerdropdown');
        };
        TreeGridHelper.prototype.getExpandedElements = function () {
            return this.selector('#' + this.id + ' .e-treegridexpand');
        };
        TreeGridHelper.prototype.getCollapsedElements = function () {
            return this.selector('#' + this.id + ' .e-treegridcollapsed');
        };
        TreeGridHelper.prototype.setModel = function (property, value) {
            return cy.get('#' + this.id).then(function (ele) {
                return ele[0].ej2_instances[0][property] = value;
            });
        };
        TreeGridHelper.prototype.getModel = function (property) {
            return cy.get('#' + this.id).then(function (ele) {
                return ele[0].ej2_instances[0][property];
            });
        };
        TreeGridHelper.prototype.invoke = function (fName, args) {
            if (args === void 0) { args = []; }
            return cy.get('#' + this.id).then(function (ele) {
                var inst = ele[0].ej2_instances[0];
                return inst[fName].apply(inst, args);
            });
        };
        return TreeGridHelper;
    }(e2e_1.TestHelper));
    exports.TreeGridHelper = TreeGridHelper;
});
