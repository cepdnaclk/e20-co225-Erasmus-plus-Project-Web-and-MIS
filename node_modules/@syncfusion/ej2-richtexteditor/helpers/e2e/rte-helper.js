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
    var RichTextEditorHelper = (function (_super) {
        __extends(RichTextEditorHelper, _super);
        function RichTextEditorHelper(id, wrapperFn) {
            var _this = _super.call(this) || this;
            _this.id = id;
            if (wrapperFn !== undefined) {
                _this.wrapperFn = wrapperFn;
            }
            return _this;
        }
        RichTextEditorHelper.prototype.getElement = function () {
            return this.selector('#' + this.id);
        };
        RichTextEditorHelper.prototype.getQuickToolbarElement = function () {
            return this.selector(".e-rte-quick-popup");
        };
        RichTextEditorHelper.prototype.getToolbar = function () {
            return this.selector('#' + this.id + "_toolbar");
        };
        RichTextEditorHelper.prototype.getCharCount = function () {
            return this.selector(".e-rte-character-count");
        };
        RichTextEditorHelper.prototype.getTableDialog = function () {
            return this.selector('#' + this.id + "_tabledialog");
        };
        RichTextEditorHelper.prototype.getImageDialog = function () {
            return this.selector('#' + this.id + "_defaultRTE_image");
        };
        RichTextEditorHelper.prototype.getLinkDialog = function () {
            return this.selector('#' + this.id + "_rtelink");
        };
        RichTextEditorHelper.prototype.getFontNamePopup = function () {
            return this.selector('#' + this.id + "_toolbar_FontName-popup");
        };
        RichTextEditorHelper.prototype.getFontSizePopup = function () {
            return this.selector('#' + this.id + "_toolbar_FontSize-popup");
        };
        RichTextEditorHelper.prototype.getFontColorPopup = function () {
            return this.selector('#' + this.id + "toolbar_FontColor-popup");
        };
        RichTextEditorHelper.prototype.getBackgroundColorPopup = function () {
            return this.selector('#' + this.id + "toolbar_BackgroundColor-popup");
        };
        RichTextEditorHelper.prototype.getFormatPopup = function () {
            return this.selector('#' + this.id + "toolbar_Formats-popup");
        };
        RichTextEditorHelper.prototype.getAlignmentPopup = function () {
            return this.selector('#' + this.id + "toolbar_Alignments-popup");
        };
        RichTextEditorHelper.prototype.getContent = function () {
            return this.selector(".e-rte-content");
        };
        RichTextEditorHelper.prototype.getModel = function (property) {
            this.getModel(property);
        };
        RichTextEditorHelper.prototype.setModel = function (property, value) {
            this.setModel(property, value);
        };
        RichTextEditorHelper.prototype.invoke = function (fName, args) {
            this.invoke(fName, args);
        };
        return RichTextEditorHelper;
    }(e2e_1.TestHelper));
    exports.RichTextEditorHelper = RichTextEditorHelper;
});
