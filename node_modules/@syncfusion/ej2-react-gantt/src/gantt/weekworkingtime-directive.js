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
 * `WeekWorkingTimeDirective` represent a working time ranges in a day.
 * It must be contained in a Gantt component(`GanttComponent`).
 * ```tsx
 * <GanttComponent dataSource={data} allowSelection={true} allowSorting={true}>
 * <WeekWorkingTimeCollection>
 * <WeekWorkingTime dayOfWeek='Monday' from='8' to='12'></WeekWorkingTimeCollection>
 * <WeekWorkingTime dayOfWeek='Monday' from='13' to='17'></WeekWorkingTimeCollection>
 * </WeekWorkingTimeCollection>
 * </GanttComponent>
 * ```
 */
var WeekWorkingTimeDirective = /** @class */ (function (_super) {
    __extends(WeekWorkingTimeDirective, _super);
    function WeekWorkingTimeDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WeekWorkingTimeDirective.moduleName = 'weekWorkingTime';
    return WeekWorkingTimeDirective;
}(ComplexBase));
export { WeekWorkingTimeDirective };
var WeekWorkingTimesDirective = /** @class */ (function (_super) {
    __extends(WeekWorkingTimesDirective, _super);
    function WeekWorkingTimesDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WeekWorkingTimesDirective.propertyName = 'weekWorkingTime';
    WeekWorkingTimesDirective.moduleName = 'weekWorkingTimes';
    return WeekWorkingTimesDirective;
}(ComplexBase));
export { WeekWorkingTimesDirective };
