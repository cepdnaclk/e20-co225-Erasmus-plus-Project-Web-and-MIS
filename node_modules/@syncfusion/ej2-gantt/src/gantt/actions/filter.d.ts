import { Gantt } from '../base/gantt';
/**
 * The Filter module is used to handle filter action.
 */
export declare class Filter {
    parent: Gantt;
    filterMenuElement: HTMLElement;
    constructor(gantt: Gantt);
    private getModuleName;
    /**
     * Update custom filter for default Gantt columns
     *
     * @returns {void} .
     */
    private updateCustomFilters;
    private updateModel;
    private addEventListener;
    private wireEvents;
    private initiateFiltering;
    /**
     * To get filter menu UI
     *
     * @param {ColumnModel} column .
     * @returns {IFilterMUI} .
     */
    private getCustomFilterUi;
    private mouseClickHandler;
    private unWireEvents;
    private getDatePickerFilter;
    private getDateTimePickerFilter;
    private getDurationFilter;
    /**
     * Remove filter menu while opening column chooser menu
     *
     * @param {ColumnMenuOpenEventArgs} args .
     * @returns {void} .
     */
    private columnMenuOpen;
    private actionBegin;
    closeFilterOnContextClick(element: Element): void;
    private actionComplete;
    private setPosition;
    private updateFilterMenuPosition;
    private removeEventListener;
    /**
     * This method is used to destroy the filter module. When called, it performs any necessary cleanup operations related to the filter module.
     *
     * @returns {void} .
     */
    destroy(): void;
}
