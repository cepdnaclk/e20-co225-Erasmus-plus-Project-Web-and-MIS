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
import { ComplexBase } from '@syncfusion/ej2-react-base';
/**
 * `AddDialogFieldDirective` represent a add dialog fields of the react Gantt.
 * It must be contained in a Gantt component(`GanttComponent`).
 * ```tsx
 * <GanttComponent dataSource={data} allowSelection={true} allowSorting={true}>
 * <AddDialogFieldsDirective>
 * <AddDialogFieldDirective type='General' headerText='General'></AddDialogFieldDirective>
 * <AddDialogFieldDirective type='Dependency' headerText='Dependency'></AddDialogFieldDirective>
 * </AddDialogFieldsDirective>
 * </GanttComponent>
 * ```
 */
var AddDialogFieldDirective = /** @class */ (function (_super) {
    __extends(AddDialogFieldDirective, _super);
    function AddDialogFieldDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AddDialogFieldDirective.moduleName = 'addDialogField';
    return AddDialogFieldDirective;
}(ComplexBase));
export { AddDialogFieldDirective };
var AddDialogFieldsDirective = /** @class */ (function (_super) {
    __extends(AddDialogFieldsDirective, _super);
    function AddDialogFieldsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AddDialogFieldsDirective.propertyName = 'addDialogFields';
    AddDialogFieldsDirective.moduleName = 'addDialogFields';
    return AddDialogFieldsDirective;
}(ComplexBase));
export { AddDialogFieldsDirective };
