import { Predicate } from '@syncfusion/ej2-data';
import { IGrid, NotifyArgs } from '../base/interface';
import { ReturnType } from '../base/type';
import { Data } from '../actions/data';
import { ServiceLocator } from '../services/service-locator';
import { VirtualRowModelGenerator } from '../services/virtual-row-model-generator';
/**
 * Content module is used to render grid content
 *
 * @hidden
 */
export declare class Render {
    private isColTypeDef;
    private parent;
    private locator;
    private headerRenderer;
    private contentRenderer;
    private l10n;
    data: Data;
    private ariaService;
    private renderer;
    private emptyGrid;
    private isLayoutRendered;
    private counter;
    /**
     * @hidden
     */
    vgenerator: VirtualRowModelGenerator;
    /**
     * Constructor for render module
     *
     * @param {IGrid} parent - specifies the IGrid
     * @param {ServiceLocator} locator - specifies the serviceLocator
     */
    constructor(parent?: IGrid, locator?: ServiceLocator);
    /**
     * To initialize grid header, content and footer rendering
     *
     * @returns {void}
     */
    render(): void;
    /**
     * Refresh the entire Grid.
     *
     * @param {NotifyArgs} e - specifies the NotifyArgs
     * @returns {void}
     */
    refresh(e?: NotifyArgs): void;
    /**
     * @returns {void}
     * @hidden
     */
    resetTemplates(): void;
    private refreshComplete;
    /**
     * The function is used to refresh the dataManager
     *
     * @param {NotifyArgs} args - specifies the args
     * @returns {void}
     */
    private refreshDataManager;
    private getFData;
    private isNeedForeignAction;
    private foreignKey;
    private sendBulkRequest;
    private dmSuccess;
    private dmFailure;
    /**
     * Render empty row to Grid which is used at the time to represent to no records.
     *
     * @returns {void}
     * @hidden
     */
    renderEmptyRow(): void;
    emptyRow(isTrigger?: boolean): void;
    private dynamicColumnChange;
    private updateColumnType;
    /**
     * @param {ReturnType} e - specifies the return type
     * @param {NotifyArgs} args - specifies the Notifyargs
     * @returns {void}
     * @hidden
     */
    dataManagerSuccess(e: ReturnType, args?: NotifyArgs): void;
    /**
     * @param {object} e - specifies the object
     * @param {Object[]} e.result - specifies the result
     * @param {NotifyArgs} args - specifies the args
     * @returns {void}
     * @hidden
     */
    dataManagerFailure(e: {
        result: Object[];
    }, args: NotifyArgs): void;
    private setRowCount;
    private isInfiniteEnd;
    private updatesOnInitialRender;
    private iterateComplexColumns;
    private buildColumns;
    private instantiateRenderer;
    private addEventListener;
    /**
     * @param {ReturnType} e - specifies the Return type
     * @returns {Promise<Object>} returns the object
     * @hidden
     */
    validateGroupRecords(e: ReturnType): Promise<Object>;
    /**
     * @param {string} key - Defines the key
     * @param {string} operator - Defines the operator
     * @param {string | number | Date} value - Defines the value
     * @returns {Predicate} - Returns the predicate
     * @hidden */
    getPredicate(key: string, operator: string, value: string | number | Date): Predicate;
    /**
     * @param {Object[]} current - Defines the current object
     * @param {Object[]} untouched - Defines the object needs to merge
     * @returns {Object[]} - Returns the updated group information
     * @hidden */
    updateGroupInfo(current: Object[], untouched: Object[]): Object[];
}
