import { ComplexBase } from '@syncfusion/ej2-react-base';
import { HolidayModel } from '@syncfusion/ej2-gantt';
/**
 * `HolidaysDirective` represent a holidays collection in Gantt..
 * It must be contained in a Gantt component(`GanttComponent`).
 * ```tsx
 * <GanttComponent dataSource={data} allowSelection={true} allowSorting={true}>
 * <HolidaysDirective>
 * <HolidayDirective from='02/20/2018' label='Holiday 1'></HolidayDirective>
 * <HolidayDirective from='05/15/2018' label='Holiday 2'></HolidayDirective>
 * </HolidaysDirective>
 * </GanttComponent>
 * ```
 */
export declare class HolidayDirective extends ComplexBase<HolidayModel & {
    children?: React.ReactNode;
}, HolidayModel> {
    static moduleName: string;
}
export declare class HolidaysDirective extends ComplexBase<{}, {}> {
    static propertyName: string;
    static moduleName: string;
}
