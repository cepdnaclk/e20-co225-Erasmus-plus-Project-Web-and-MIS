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
    /**
     * E2E test helpers for FileManager to easily interact and the test the component
     */
    var FileManagerHelpers = /** @class */ (function (_super) {
        __extends(FileManagerHelpers, _super);
        /**
         * Initialize the FileManager E2E helpers
         * @param id Element id of the FileManager element
         * @param wrapperFn Pass the wrapper function
         */
        function FileManagerHelpers(id, wrapperFn) {
            var _this = _super.call(this) || this;
            _this.id = id;
            if (wrapperFn !== undefined) {
                _this.wrapperFn = wrapperFn;
            }
            return _this;
        }
        FileManagerHelpers.prototype.selector = function (arg) {
            return (this.wrapperFn ? this.wrapperFn(arg) : arg);
        };
        /**
         * Returns the root element of the FileManager component.
         */
        FileManagerHelpers.prototype.getElement = function () {
            return this.selector('#' + this.id);
        };
        /**
         * Returns the toolbar items from the FileManager component.
         */
        FileManagerHelpers.prototype.getToolbarItems = function () {
            return this.selector('#' + this.id + '.e-filemanager .e-toolbar .e-toolbar-items .e-toolbar-item');
        };
        /**
         * Returns the active toolbar item element from the FileManager component.
         */
        FileManagerHelpers.prototype.getToolbarItemsActive = function () {
            return this.selector('#' + this.id + '.e-filemanager .e-toolbar .e-toolbar-items .e-toolbar-item .e-active');
        };
        FileManagerHelpers.prototype.getTreeviewItems = function () {
            return this.selector('#' + this.id + '.e-filemanager .e-splitter .e-treeview .e-list-item');
        };
        /**
         * Returns the collapsed treeview node element from the FileManager component.
         */
        FileManagerHelpers.prototype.getTreeviewCollapsedItems = function () {
            return this.selector('#' + this.id + '.e-filemanager .e-splitter .e-treeview .e-list-item .e-node-collapsed');
        };
        /**
         * Returns the collapsed icon of treeview node element from the FileManager component.
         */
        FileManagerHelpers.prototype.getTreeviewCollapsedIcon = function () {
            return this.selector('#' + this.id + '.e-filemanager .e-splitter .e-treeview .e-list-item .e-icons.e-icon-collapsible');
        };
        /**
         * Returns the expanded icon of treeview node element from the FileManager component.
         */
        FileManagerHelpers.prototype.getTreeviewExpandedIcon = function () {
            return this.selector('#' + this.id + '.e-filemanager .e-splitter .e-treeview .e-list-item .e-icons.e-icon-expandable');
        };
        /**
         * Returns the active treeview node element from the FileManager component.
         */
        FileManagerHelpers.prototype.getTreeviewActiveItems = function () {
            return this.selector('#' + this.id + '.e-filemanager .e-splitter .e-treeview .e-list-item .e-active');
        };
        /**
         * Returns the treeview items folder icon from the FileManager component.
         */
        FileManagerHelpers.prototype.getTreeviewItemsFolderIcon = function () {
            return this.selector('#' + this.id + '.e-filemanager .e-splitter .e-treeview .e-list-item .e-list-icon.e-fe-folder');
        };
        /**
         * Returns the treeview items text from the FileManager component.
         */
        FileManagerHelpers.prototype.getTreeviewItemsText = function () {
            return this.selector('#' + this.id + '.e-filemanager .e-splitter .e-treeview .e-list-item .e-list-text');
        };
        /**
         * Returns the largeIcon element from the FileManager component.
         */
        FileManagerHelpers.prototype.getlargeIconsItems = function () {
            return this.selector('#' + this.id + '.e-filemanager .e-splitter .e-layout-content .e-large-icons .e-list-parent.e-ul .e-list-item"');
        };
        /**
         * Returns the active list element in largeIcon view from the FileManager component.
         */
        FileManagerHelpers.prototype.getlargeIconsActiveItems = function () {
            return this.selector('#' + this.id + '.e-filemanager .e-splitter .e-layout-content .e-large-icons .e-list-parent.e-ul .e-list-item.e-active');
        };
        /**
         * Returns the checked element in largeIcon view from the FileManager component.
         */
        FileManagerHelpers.prototype.getlargeIconsCheckedItems = function () {
            return this.selector('#' + this.id + '.e-filemanager .e-splitter .e-layout-content .e-large-icons .e-list-parent.e-ul .e-list-item .e-checkbox-wrapper .e-check');
        };
        /**
         * Returns the grid element from the FileManager component.
         */
        FileManagerHelpers.prototype.getGridElement = function () {
            return this.selector('#' + this.id + '.e-filemanager .e-splitter .e-layout-content .e-grid');
        };
        /**
         * Returns the active element in grid view from the FileManager component.
         */
        FileManagerHelpers.prototype.getGridActiveElements = function () {
            return this.selector('#' + this.id + '.e-filemanager .e-splitter .e-layout-content .e-grid .e-gridcontent .e-table .e-row .e-rowcell.e-active');
        };
        /**
         * Returns the checked element in grid view from the FileManager component.
         */
        FileManagerHelpers.prototype.getGridCheckedElements = function () {
            return this.selector('#' + this.id + '.e-filemanager .e-splitter .e-layout-content .e-grid .e-gridcontent .e-table .e-row .e-rowcell .e-checkbox-wrapper .e-check');
        };
        /**
         * Returns the dialog element from the FileManager component.
         */
        FileManagerHelpers.prototype.getDialogElement = function () {
            return this.selector('#' + this.id + '.e-filemanager .e-dialog.e-popup.e-popup-open');
        };
        /**
         * Returns the breadcrumbBar element from the FileManager component.
         */
        FileManagerHelpers.prototype.getBreadCrumbBarElement = function () {
            return this.selector('#' + this.id + '.e-filemanager .e-splitter .e-layout-content .e-address .e-addressbar-ul .e-address-list-item');
        };
        /**
         * Returns the splitter element from the FileManager component.
         */
        FileManagerHelpers.prototype.getSplitterElement = function () {
            return this.selector('#' + this.id + '.e-filemanager .e-splitter.e-splitter-horizontal');
        };
        /**
         * Returns the contextmenu element from the FileManager component.
         */
        FileManagerHelpers.prototype.getContextMenuElement = function () {
            return this.selector('.e-fe-popup .e-contextmenu');
        };
        /**
         * Returns the sortby popup element from the FileManager component.
         */
        FileManagerHelpers.prototype.getSortByPopupElement = function () {
            return this.selector('.e-dropdown-popup.e-fe-popup.e-popup-open');
        };
        FileManagerHelpers.prototype.setModel = function (property, value) {
            var cy;
            return cy.get('#' + this.id).then(function (ele) {
                return ele[0].ej2_instances[0][property] = value;
            });
        };
        FileManagerHelpers.prototype.getModel = function (property) {
            var cy;
            return cy.get('#' + this.id).then(function (ele) {
                return ele[0].ej2_instances[0][property];
            });
        };
        FileManagerHelpers.prototype.invoke = function (fName, args) {
            if (args === void 0) { args = []; }
            var cy;
            return cy.get('#' + this.id).then(function (ele) {
                var inst = ele[0].ej2_instances[0];
                return inst[fName].apply(inst, args);
            });
        };
        return FileManagerHelpers;
    }(e2e_1.TestHelper));
    exports.FileManagerHelpers = FileManagerHelpers;
});
