import { FormValidator } from '@syncfusion/ej2-inputs';
import { IGrid } from '../base/interface';
import { EditRender } from '../renderer/edit-renderer';
import { Row } from '../models/row';
import { ServiceLocator } from '../services/service-locator';
import { Column } from '../models/column';
/**
 * `BatchEdit` module is used to handle batch editing actions.
 *
 * @hidden
 */
export declare class BatchEdit {
    private parent;
    private serviceLocator;
    private form;
    formObj: FormValidator;
    private renderer;
    private focus;
    private dataBoundFunction;
    private batchCancelFunction;
    private removeSelectedData;
    private cellDetails;
    private isColored;
    private isAdded;
    private originalCell;
    private cloneCell;
    private editNext;
    private preventSaveCell;
    private index;
    private crtRowIndex;
    private field;
    private initialRender;
    private validationColObj;
    private isAdd;
    private newReactTd;
    private evtHandlers;
    /** @hidden */
    addBatchRow: boolean;
    private prevEditedBatchCell;
    private mouseDownElement;
    constructor(parent?: IGrid, serviceLocator?: ServiceLocator, renderer?: EditRender);
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
    private batchCancel;
    private dataBound;
    /**
     * @returns {void}
     * @hidden
     */
    destroy(): void;
    protected mouseDownHandler(e: MouseEvent): void;
    protected clickHandler(e: MouseEvent): void;
    protected dblClickHandler(e: MouseEvent): void;
    private onBeforeCellFocused;
    private onCellFocused;
    private isAddRow;
    private editCellFromIndex;
    closeEdit(): void;
    private removeBatchElementChanges;
    deleteRecord(fieldname?: string, data?: Object): void;
    addRecord(data?: Object): void;
    endEdit(): void;
    private validateFormObj;
    batchSave(): void;
    getBatchChanges(): Object;
    /**
     * @param {string} uid - specifes the uid
     * @returns {void}
     * @hidden
     */
    removeRowObjectFromUID(uid: string): void;
    /**
     * @param {Row<Column>} row - specifies the row object
     * @returns {void}
     * @hidden
     */
    addRowObject(row: Row<Column>): void;
    private bulkDelete;
    private refreshRowIdx;
    private bulkAddRow;
    private findNextEditableCell;
    private getDefaultData;
    private setCellIdx;
    editCell(index: number, field: string, isAdd?: boolean): void;
    editCellExtend(index: number, field: string, isAdd?: boolean): void;
    updateCell(rowIndex: number, field: string, value: string | number | boolean | Date): void;
    private setChanges;
    updateRow(index: number, data: Object): void;
    private getCellIdx;
    private refreshTD;
    private getColIndex;
    private editNextValCell;
    escapeCellEdit(): void;
    private generateCellArgs;
    saveCell(isForceSave?: boolean): void;
    private successCallBack;
    private prevEditedBatchCellMatrix;
    protected getDataByIndex(index: number): Object;
    private keyDownHandler;
    /**
     * @returns {void}
     * @hidden
     */
    addCancelWhilePaging(): void;
    private getBottomIndex;
}
