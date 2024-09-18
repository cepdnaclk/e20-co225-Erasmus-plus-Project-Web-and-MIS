import { IRenderer, IGrid } from '../base/interface';
import { ContentRender } from './content-renderer';
import { ServiceLocator } from '../services/service-locator';
import { SummaryModelGenerator } from '../services/summary-model-generator';
/**
 * Footer module is used to render grid content
 *
 * @hidden
 */
export declare class FooterRenderer extends ContentRender implements IRenderer {
    private locator;
    protected modelGenerator: SummaryModelGenerator;
    private aggregates;
    private evtHandlers;
    constructor(gridModule?: IGrid, serviceLocator?: ServiceLocator);
    /**
     * The function is used to render grid footer div
     *
     * @returns {void}
     */
    renderPanel(): void;
    /**
     * The function is used to render grid footer table
     *
     * @returns {void}
     */
    renderTable(): void;
    private renderSummaryContent;
    refresh(e?: {
        aggregates?: Object;
    }): void;
    refreshCol(): void;
    private onWidthChange;
    private onScroll;
    getColFromIndex(index?: number): HTMLElement;
    private columnVisibilityChanged;
    addEventListener(): void;
    removeEventListener(): void;
    private updateFooterTableWidth;
    refreshFooterRenderer(editedData: Object[]): void;
    getIndexByKey(data: object, ds: object[]): number;
    private getData;
    onAggregates(editedData: Object[]): Object;
}
