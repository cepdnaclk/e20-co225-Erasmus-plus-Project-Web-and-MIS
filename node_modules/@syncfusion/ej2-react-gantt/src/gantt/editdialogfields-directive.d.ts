import { ComplexBase } from '@syncfusion/ej2-react-base';
import { EditDialogFieldSettingsModel } from '@syncfusion/ej2-gantt';
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
export declare class EditDialogFieldDirective extends ComplexBase<EditDialogFieldSettingsModel & {
    children?: React.ReactNode;
}, EditDialogFieldSettingsModel> {
    static moduleName: string;
}
export declare class EditDialogFieldsDirective extends ComplexBase<{}, {}> {
    static propertyName: string;
    static moduleName: string;
}
