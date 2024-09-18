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
 * `EditDialogFieldDirective` represent a add dialog fields in VueJS Gantt.
 * It must be contained in a Gantt component(`GanttComponent`).
 * ```tsx
 * <GanttComponent dataSource={data} allowSelection={true} allowSorting={true}>
 * <EditDialogFieldsDirective>
 * <EditDialogFieldDirective type='General' headerText='General'></EditDialogFieldDirective>
 * <EditDialogFieldDirective type='Dependency' headerText='Dependency'></EditDialogFieldDirective>
 * </EditDialogFieldsDirective>
 * </GanttComponent>
 * ```
 */
var EditDialogFieldDirective = /** @class */ (function (_super) {
    __extends(EditDialogFieldDirective, _super);
    function EditDialogFieldDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EditDialogFieldDirective.moduleName = 'editDialogField';
    return EditDialogFieldDirective;
}(ComplexBase));
export { EditDialogFieldDirective };
var EditDialogFieldsDirective = /** @class */ (function (_super) {
    __extends(EditDialogFieldsDirective, _super);
    function EditDialogFieldsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EditDialogFieldsDirective.propertyName = 'editDialogFields';
    EditDialogFieldsDirective.moduleName = 'editDialogFields';
    return EditDialogFieldsDirective;
}(ComplexBase));
export { EditDialogFieldsDirective };
