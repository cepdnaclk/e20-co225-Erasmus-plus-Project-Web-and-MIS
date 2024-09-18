import { ComplexBase } from '@syncfusion/ej2-react-base';
import { AddDialogFieldSettingsModel } from '@syncfusion/ej2-gantt';
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
export declare class AddDialogFieldDirective extends ComplexBase<AddDialogFieldSettingsModel & {
    children?: React.ReactNode;
}, AddDialogFieldSettingsModel> {
    static moduleName: string;
}
export declare class AddDialogFieldsDirective extends ComplexBase<{}, {}> {
    static propertyName: string;
    static moduleName: string;
}
