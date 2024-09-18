import { ComplexBase } from '@syncfusion/ej2-react-base';
import { EventMarkerModel } from '@syncfusion/ej2-gantt';
/**
 * `EventMarkersDirective` represent a event marker collection in Gantt
 * It must be contained in a Gantt component(`GanttComponent`).
 * ```tsx
 * <GanttComponent dataSource={data} allowSelection={true} allowSorting={true}>
 * <EventMarkersDirective>
 * <EventMarkerDirective day='02/10/2018' label='Project Starts'></EventMarkerDirective>
 * </EventMarkersDirective>
 * </GanttComponent>
 * ```
 */
export declare class EventMarkerDirective extends ComplexBase<EventMarkerModel & {
    children?: React.ReactNode;
}, EventMarkerModel> {
    static moduleName: string;
}
export declare class EventMarkersDirective extends ComplexBase<{}, {}> {
    static propertyName: string;
    static moduleName: string;
}
