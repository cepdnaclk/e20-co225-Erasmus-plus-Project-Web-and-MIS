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
var HolidayDirective = /** @class */ (function (_super) {
    __extends(HolidayDirective, _super);
    function HolidayDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HolidayDirective.moduleName = 'holiday';
    return HolidayDirective;
}(ComplexBase));
export { HolidayDirective };
var HolidaysDirective = /** @class */ (function (_super) {
    __extends(HolidaysDirective, _super);
    function HolidaysDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HolidaysDirective.propertyName = 'holidays';
    HolidaysDirective.moduleName = 'holidays';
    return HolidaysDirective;
}(ComplexBase));
export { HolidaysDirective };
