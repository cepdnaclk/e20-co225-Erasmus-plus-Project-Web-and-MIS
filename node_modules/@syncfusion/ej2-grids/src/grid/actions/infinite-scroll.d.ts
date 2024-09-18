import { IGrid, IAction, NotifyArgs } from '../base/interface';
import { ServiceLocator } from '../services/service-locator';
import { Column } from '../models/column';
import { Row } from '../models/row';
import { Action } from '../base/enum';
import { ColumnWidthService } from '../services/width-controller';
/**
 * Infinite Scrolling class
 *
 * @hidden
 */
export declare class InfiniteScroll implements IAction {
    private parent;
    private serviceLocator;
    private maxPage;
    private actionBeginFunction;
    private actionCompleteFunction;
    private dataBoundFunction;
    private infiniteCache;
    private infiniteCurrentViewData;
    private isDownScroll;
    private isUpScroll;
    private isScroll;
    private top;
    private enableContinuousScroll;
    private initialRender;
    private pressedKey;
    private isRemove;
    private isInitialCollapse;
    protected prevScrollTop: number;
    private actions;
    private keys;
    private rowIndex;
    protected cellIndex: number;
    private rowTop;
    private empty;
    private editRowIndex;
    private virtualInfiniteData;
    private isAdd;
    private isEdit;
    private isCancel;
    private emptyRowData;
    private isNormaledit;
    /** @hidden */
    requestType: Action;
    private firstBlock;
    private firstIndex;
    private lastIndex;
    private rowModelGenerator;
    private isInfiniteScroll;
    private isLastPage;
    private isInitialRender;
    private isFocusScroll;
    private lastFocusInfo;
    private isGroupCollapse;
    private parentCapUid;
    private groupCaptionAction;
    protected widthService: ColumnWidthService;
    private addRowIndex;
    /**
     * Constructor for the Grid infinite scrolling.
     *
     * @param {IGrid} parent - specifies the IGrid
     * @param {ServiceLocator} serviceLocator - specifies the ServiceLocator
     * @hidden
     */
    constructor(parent?: IGrid, serviceLocator?: ServiceLocator);
    getModuleName(): string;
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
    private dataBound;
    private setGroupCollapsePageQuery;
    private captionActionComplete;
    private makeGroupCollapseRequest;
    private getCaptionChildCount;
    private childCheck;
    private updateCurrentViewData;
    private refreshInfiniteCurrentViewData;
    private resetCurrentViewData;
    private modelChanged;
    private infiniteAddActionBegin;
    private infiniteEditHandler;
    private createRow;
    private ensureRowAvailability;
    private generateRows;
    private resetRowIndex;
    private resetInfiniteCurrentViewData;
    private swapCurrentViewData;
    private setDisplayNone;
    private refreshInfiniteCache;
    private refreshInfiniteCacheRowVisibleLength;
    private refreshInfiniteEditrowindex;
    private getEditedRowObject;
    private infiniteEditSuccess;
    private updateCurrentViewRecords;
    private actionBegin;
    private actionComplete;
    /**
     * The function used to trigger onActionComplete
     *
     * @param {NotifyArgs} e - specifies the NotifyArgs
     * @returns {void}
     * @hidden
     */
    onActionComplete(e: NotifyArgs): void;
    private resetInfiniteEdit;
    private getVirtualInfiniteData;
    private editActionBegin;
    private dataSourceModified;
    private onDataReady;
    private ensureIntialCollapse;
    private infiniteScrollHandler;
    private makeRequest;
    private infinitePageQuery;
    private editPageQuery;
    private intialPageQuery;
    private scrollToLastFocusedCell;
    private setLastCellFocusInfo;
    private infiniteCellFocus;
    private createEmptyRowdata;
    private getVirtualInfiniteEditedData;
    private restoreInfiniteEdit;
    private restoreInfiniteAdd;
    private appendInfiniteRows;
    private selectNewRow;
    private removeInfiniteCacheRows;
    private calculateScrollTop;
    private captionRowHeight;
    private removeTopRows;
    private removeBottomRows;
    private removeCaptionRows;
    private resetInfiniteBlocks;
    private setCache;
    private setInitialCache;
    private setInitialGroupCache;
    private resetContentModuleCache;
    /**
     * @param {Row<Column>[]} rowObjects - Defines the grid's row objects
     * @returns {void}
     * @hidden
     */
    resetInfiniteCache(rowObjects: Row<Column>[]): void;
    /**
     * @returns {void}
     * @hidden
     */
    destroy(): void;
}
