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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Property, ChildProperty } from '@syncfusion/ej2-base';
export var defaultToolbarItems = ['NewFolder', 'Upload', 'Cut', 'Copy', 'Paste', 'Delete', 'Download', 'Rename',
    'SortBy', 'Refresh', 'Selection', 'View', 'Details'];
/**
 * Specifies the Toolbar settings of the FileManager.
 */
var ToolbarSettings = /** @class */ (function (_super) {
    __extends(ToolbarSettings, _super);
    function ToolbarSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(defaultToolbarItems)
    ], ToolbarSettings.prototype, "items", void 0);
    __decorate([
        Property(true)
    ], ToolbarSettings.prototype, "visible", void 0);
    return ToolbarSettings;
}(ChildProperty));
export { ToolbarSettings };
var ToolbarItem = /** @class */ (function (_super) {
    __extends(ToolbarItem, _super);
    function ToolbarItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('')
    ], ToolbarItem.prototype, "id", void 0);
    __decorate([
        Property('')
    ], ToolbarItem.prototype, "text", void 0);
    __decorate([
        Property('auto')
    ], ToolbarItem.prototype, "width", void 0);
    __decorate([
        Property('')
    ], ToolbarItem.prototype, "cssClass", void 0);
    __decorate([
        Property(false)
    ], ToolbarItem.prototype, "showAlwaysInPopup", void 0);
    __decorate([
        Property(false)
    ], ToolbarItem.prototype, "disabled", void 0);
    __decorate([
        Property('')
    ], ToolbarItem.prototype, "prefixIcon", void 0);
    __decorate([
        Property('')
    ], ToolbarItem.prototype, "suffixIcon", void 0);
    __decorate([
        Property(true)
    ], ToolbarItem.prototype, "visible", void 0);
    __decorate([
        Property('None')
    ], ToolbarItem.prototype, "overflow", void 0);
    __decorate([
        Property('')
    ], ToolbarItem.prototype, "template", void 0);
    __decorate([
        Property('Button')
    ], ToolbarItem.prototype, "type", void 0);
    __decorate([
        Property('Both')
    ], ToolbarItem.prototype, "showTextOn", void 0);
    __decorate([
        Property(null)
    ], ToolbarItem.prototype, "htmlAttributes", void 0);
    __decorate([
        Property('')
    ], ToolbarItem.prototype, "tooltipText", void 0);
    __decorate([
        Property('Left')
    ], ToolbarItem.prototype, "align", void 0);
    __decorate([
        Property(-1)
    ], ToolbarItem.prototype, "tabIndex", void 0);
    __decorate([
        Property()
    ], ToolbarItem.prototype, "name", void 0);
    return ToolbarItem;
}(ChildProperty));
export { ToolbarItem };
