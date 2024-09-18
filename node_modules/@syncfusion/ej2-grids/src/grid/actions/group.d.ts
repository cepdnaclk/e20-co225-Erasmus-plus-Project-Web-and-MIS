import { Column } from '../models/column';
import { GroupSettingsModel } from '../base/grid-model';
import { ServiceLocator } from '../services/service-locator';
import { IGrid, IAction, NotifyArgs } from '../base/interface';
import { Row } from '../models/row';
/**
 *
 * The `Group` module is used to handle group action.
 */
export declare class Group implements IAction {
    private sortRequired;
    /** @hidden */
    groupSettings: GroupSettingsModel;
    /** @hidden */
    element: HTMLElement;
    /** @hidden */
    groupSortFocus: boolean;
    /** @hidden */
    groupTextFocus: boolean;
    /** @hidden */
    groupCancelFocus: boolean;
    private colName;
    private column;
    private isAppliedGroup;
    private isAppliedUnGroup;
    private isAppliedCaptionRowBorder;
    private reorderingColumns;
    private groupGenerator;
    private visualElement;
    private helper;
    private dragStart;
    private drag;
    private dragStop;
    private animateDropper;
    private addLabel;
    private rearrangeGroup;
    private drop;
    private parent;
    private serviceLocator;
    private contentRefresh;
    private sortedColumns;
    private l10n;
    private aria;
    private focus;
    /**
     * Constructor for Grid group module
     *
     * @param {IGrid} parent - specifies the IGrid
     * @param {GroupSettingsModel} groupSettings - specifies the GroupSettingsModel
     * @param {string[]} sortedColumns - specifies the sortedColumns
     * @param {ServiceLocator} serviceLocator - specifies the serviceLocator
     * @hidden
     */
    constructor(parent?: IGrid, groupSettings?: GroupSettingsModel, sortedColumns?: string[], serviceLocator?: ServiceLocator);
    private columnDrag;
    private columnDragStart;
    private columnDrop;
    /**
     * @returns {void}
     * @hidden
     */
    addEventListener(): void;
    /**
     * @returns {void}
     * @hidden
     */
    removeEventListener(): void;
    private initialEnd;
    private keyPressHandler;
    /**
     * @returns {Element[]} - Return the focusable grouping items
     * @hidden */
    getFocusableGroupedItems(): Element[];
    private wireEvent;
    private unWireEvent;
    private onFocusIn;
    private onFocusOut;
    private addOrRemoveFocus;
    private clickHandler;
    private auxilaryclickHandler;
    private unGroupFromTarget;
    private toogleGroupFromHeader;
    private applySortFromTarget;
    /**
     * Expands or collapses grouped rows by target element.
     *
     * @param  {Element} target - Defines the target element of the grouped row.
     * @returns {void}
     */
    expandCollapseRows(target: Element): void;
    /**
     * The function is used to set border in last row
     *
     * @returns { void }
     * @hidden
     */
    lastCaptionRowBorder(): void;
    private updateVirtualRows;
    private expandCollapse;
    /**
     * Expands all the grouped rows of the Grid.
     *
     * @returns {void}
     */
    expandAll(): void;
    /**
     * Collapses all the grouped rows of the Grid.
     *
     * @returns {void}
     */
    collapseAll(): void;
    /**
     * The function is used to render grouping
     *
     * @returns {void}
     * @hidden
     */
    render(): void;
    private renderGroupDropArea;
    private updateGroupDropArea;
    private initDragAndDrop;
    private initializeGHeaderDrag;
    private initializeGHeaderDrop;
    /**
     * Groups a column by column name.
     *
     * @param  {string} columnName - Defines the column name to group.
     * @returns {void}
     */
    groupColumn(columnName: string): void;
    /**
     * Ungroups a column by column name.
     *
     * @param  {string} columnName - Defines the column name to ungroup.
     * @returns {void}
     */
    ungroupColumn(columnName: string): void;
    /**
     * The function used to update groupSettings
     *
     * @returns {void}
     * @hidden
     */
    updateModel(): void;
    /**
     * The function used to trigger onActionComplete
     *
     * @param {NotifyArgs} e - specifies the NotifyArgs
     * @returns {void}
     * @hidden
     */
    onActionComplete(e: NotifyArgs): void;
    private groupAddSortingQuery;
    private createElement;
    private addColToGroupDrop;
    private createSeparator;
    private refreshToggleBtn;
    private removeColFromGroupDrop;
    private onPropertyChanged;
    private updateGroupedColumn;
    private updateButtonVisibility;
    private enableAfterRender;
    /**
     * To destroy the reorder
     *
     * @returns {void}
     * @hidden
     */
    destroy(): void;
    /**
     * Clears all the grouped columns of the Grid.
     *
     * @returns {void}
     */
    clearGrouping(): void;
    /**
     * For internal use only - Get the module name.
     *
     * @returns {string} returns the module name
     * @private
     */
    protected getModuleName(): string;
    private refreshSortIcons;
    private getGHeaderCell;
    private onGroupAggregates;
    private updateLazyLoadGroupAggregates;
    private destroyRefreshGroupCaptionFooterTemplate;
    private updateLazyLoadGroupAggregatesRow;
    private updateLazyLoadGroupAggregatesCell;
    private getGroupCaptionRowObject;
    /**
     * @param { boolean } groupCaptionTemplate - Defines template either group caption or footer
     * @returns { Object[] } - Returns template array
     * @hidden
     */
    getGroupAggregateTemplates(groupCaptionTemplate: boolean): Object[];
    /**
     * @param { Row<Column> } fromRowObj - Defines group key changed Data row object.
     * @param { Row<Column> } toRowObj - Defines group key setting reference Data row object.
     * @returns { void }
     * @hidden
     */
    groupedRowReorder(fromRowObj: Row<Column>, toRowObj: Row<Column>): void;
    private groupReorderHandler;
    private updatedRowObjChange;
    private groupReorderRefreshHandler;
    private getGroupParentFooterAggregateRowObject;
    private evaluateGroupAggregateValueChange;
    private gettingVirtualData;
    private iterateGroupAggregates;
    updateExpand(args: {
        uid?: string;
        isExpand?: boolean;
    }): void;
}
