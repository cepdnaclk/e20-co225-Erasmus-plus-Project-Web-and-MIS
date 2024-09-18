import { Gantt } from '../base/gantt';
export declare class UndoRedo {
    private parent;
    constructor(parent: Gantt);
    private isUndoRedoPerformed;
    private changedRecords;
    previousZoomingLevel: Object;
    private getRedoCollection;
    private getUndoCollection;
    private currentAction;
    private redoEnabled;
    private previousSortedColumns;
    private searchString;
    private isFromUndoRedo;
    private canUpdateIndex;
    private sortedColumnsLength;
    /**
     *Initiates an undo action to revert the most recent change performed.
     *
     * @returns {void}
     * @public
     */
    private undoAction;
    /**
     *Initiates an redo action to reapply the most recent undone change performed.
     *
     * @returns {void}
     * @public
     */
    private redoAction;
    private createUndoCollection;
    private disableRedo;
    private findPosition;
    getModuleName(): string;
    /**
     * Destroys the UndoRedo of Gantt.
     *
     * @returns {void} .
     * @private
     */
    destroy(): void;
}
