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
    var SplitterHelper = /** @class */ (function (_super) {
        __extends(SplitterHelper, _super);
        function SplitterHelper(id, wrapperFn) {
            var _this = _super.call(this) || this;
            _this.id = id;
            if (wrapperFn !== undefined) {
                _this.wrapperFn = wrapperFn;
            }
            return _this;
        }
        /**
         * The method which returns Splitter's root element.
         */
        SplitterHelper.prototype.getElement = function () {
            return this.selector('#' + this.id + ".e-splitter");
        };
        /**
         * The method which returns Splitter's all pane elements.
         */
        SplitterHelper.prototype.getPaneElement = function () {
            var element = this.selector('#' + this.id + ".e-splitter");
            var pane = [];
            return pane.filter.call(element.children, function (ele) { return pane.includes.call(ele.classList, 'e-pane'); });
        };
        /**
         * The method which returns Splitter's separator (split-bar) elements.
         */
        SplitterHelper.prototype.getSplitBar = function () {
            var element = this.selector('#' + this.id + ".e-splitter");
            var split = [];
            return split.filter.call(element.children, function (ele) { return split.includes.call(ele.classList, 'e-split-bar'); });
        };
        /**
         * The getModel method is used to return value of the property.
         * @param property - Specifies name of the property. It must be string type.
         */
        SplitterHelper.prototype.getModel = function (property) {
            this.getModel(property);
        };
        /**
         * The setModel method is used to set value for the property. It will accepts two arguments.
         * @param property - Specifices name of the property which value is to be updated.
         * @param value - Specifies corresponding value of the property.
         */
        SplitterHelper.prototype.setModel = function (property, value) {
            this.setModel(property, value);
        };
        /**
         * The invoke method is used to set value for the property. It will accepts two arguments.
         * @param property - Specifices name of the property which value is to be updated.
         * @param value - Specifies corresponding value of the property.
         */
        SplitterHelper.prototype.invoke = function (fName, args) {
            this.invoke(fName, args);
        };
        return SplitterHelper;
    }(e2e_1.TestHelper));
    exports.SplitterHelper = SplitterHelper;
});
