import { IGrid } from '../base/interface';
/**
 * Edit render module is used to render grid edit row.
 *
 * @hidden
 */
export declare class InlineEditRender {
    private parent;
    private isEdit;
    /**
     * Constructor for render module
     *
     * @param {IGrid} parent - returns the IGrid
     */
    constructor(parent?: IGrid);
    addNew(elements: Object, args: {
        row?: Element;
        rowData?: Object;
        isScroll?: boolean;
    }): void;
    update(elements: Object, args: {
        row?: Element;
        rowData?: Object;
    }): void;
    private getEditElement;
    removeEventListener(): void;
    private appendChildren;
}
