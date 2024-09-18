import { ChildProperty } from '@syncfusion/ej2-base';
import { IndicatorType } from '@syncfusion/ej2-grids';
/**
 * Configures the Loading Indicator of the Gantt.
 */
export declare class LoadingIndicator extends ChildProperty<LoadingIndicator> {
    /**
     * Defines the loading indicator. The available loading indicator are:
     * * Spinner
     * * Shimmer
     *
     * @default Syncfusion.EJ2.Grids.IndicatorType.Spinner
     * @isEnumeration true
     * @aspType Syncfusion.EJ2.Grids.IndicatorType
     *
     */
    indicatorType: IndicatorType;
}
