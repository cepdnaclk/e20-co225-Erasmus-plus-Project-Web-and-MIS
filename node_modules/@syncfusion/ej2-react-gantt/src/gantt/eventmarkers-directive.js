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
var EventMarkerDirective = /** @class */ (function (_super) {
    __extends(EventMarkerDirective, _super);
    function EventMarkerDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EventMarkerDirective.moduleName = 'eventMarker';
    return EventMarkerDirective;
}(ComplexBase));
export { EventMarkerDirective };
var EventMarkersDirective = /** @class */ (function (_super) {
    __extends(EventMarkersDirective, _super);
    function EventMarkersDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EventMarkersDirective.propertyName = 'eventMarkers';
    EventMarkersDirective.moduleName = 'eventMarkers';
    return EventMarkersDirective;
}(ComplexBase));
export { EventMarkersDirective };
