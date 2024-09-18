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
    var DashboardHelper = /** @class */ (function (_super) {
        __extends(DashboardHelper, _super);
        /**
         * Initialize the Dashboard Layout E2E helpers.
         * @param id element id of the Dashboard Layout component.
         * @param wrapperFn pass the wrapper function.
         */
        function DashboardHelper(id, wrapperFn) {
            var _this = _super.call(this) || this;
            _this.id = id;
            if (wrapperFn !== undefined) {
                _this.wrapperFn = wrapperFn;
            }
            return _this;
        }
        /**
         * Gets the selector of the Dashboard Layout component.
         */
        DashboardHelper.prototype.selector = function (arg) {
            return (this.wrapperFn ? this.wrapperFn(arg) : arg);
        };
        /**
         * Gets root element of the Dashboard Layout component.
         */
        DashboardHelper.prototype.getElement = function () {
            return this.selector('#' + this.id);
        };
        /**
         * Gets the element of the Dashboard Layout component.
         */
        DashboardHelper.prototype.getDashboardLayout = function () {
            return this.selector('#' + this.id + '.e-dashboardlayout');
        };
        /**
         * Gets a panel container and its inner elements with the given id from dashboard layout component.
         */
        DashboardHelper.prototype.getPanelContainer = function () {
            return this.selector('#' + this.id + '.e-dashboardlayout .e-panel-container');
        };
        /**
         * Gets the panel element of Dashboard Layout component which consists the panel container and its inner elements
         */
        DashboardHelper.prototype.getPanelElement = function () {
            return this.selector('#' + this.id + '.e-dashboardlayout .e-panel');
        };
        /**
         * Used to get the panel header of Dashboard Layout component which contains the header details.
         */
        DashboardHelper.prototype.getPanelHeader = function () {
            return this.selector('#' + this.id + '.e-dashboardlayout  .e-panel-header');
        };
        /**
         * Gets the panel content of Dashboard Layout component which contains the panel content class.
         */
        DashboardHelper.prototype.getPanelContent = function () {
            return this.selector('#' + this.id + '.e-dashboardlayout .e-panel-content');
        };
        /**
         * Gets the resize icon positioned on the South-East side in panel container.
         */
        DashboardHelper.prototype.getSouthEastResizeIcon = function () {
            return this.selector('#' + this.id + '.e-dashboardlayout .e-south-east .e-resize');
        };
        /**
         * Gets the resize icon positioned on the North-East side in panel container.
         */
        DashboardHelper.prototype.getNorthEastResizeIcon = function () {
            return this.selector('#' + this.id + '.e-dashboardlayout .e-north-east .e-resize');
        };
        /**
         * Gets the resize icon positioned on the North-West side in panel container.
         */
        DashboardHelper.prototype.getNorthWestResizeIcon = function () {
            return this.selector('#' + this.id + '.e-dashboardlayout .e-north-west .e-resize');
        };
        /**
         * Gets the resize icon positioned on the South-West side in panel container.
         */
        DashboardHelper.prototype.getSouthWestResizeIcon = function () {
            return this.selector('#' + this.id + '.e-dashboardlayout .e-south-west .e-resize');
        };
        /**
         * Gets the clear icon from the panel element.
         */
        DashboardHelper.prototype.getClearIcon = function () {
            return this.selector('#' + this.id + '.e-dashboardlayout .e-clear-icon');
        };
        /**
         * Gets the transition of panel in Dashboard Layout component which is used to achieve the resizing behavior.
         */
        DashboardHelper.prototype.getPanelTansition = function () {
            return this.selector('#' + this.id + '.e-dashboardlayout .e-panel-transition');
        };
        return DashboardHelper;
    }(e2e_1.TestHelper));
    exports.DashboardHelper = DashboardHelper;
});
