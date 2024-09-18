import { FilterSettings } from '../base/grid';
import { IGrid, IFilterArgs, FilterUI, ICustomOptr } from '../base/interface';
import { ServiceLocator } from '../services/service-locator';
import { Filter } from '../actions/filter';
import { Column } from '../models/column';
import { Dialog } from '@syncfusion/ej2-popups';
/**
 * `filter menu` render boolean column.
 *
 * @hidden
 */
export declare class FilterMenuRenderer {
    private parent;
    private filterObj;
    private serviceLocator;
    private dlgDiv;
    private l10n;
    dlgObj: Dialog;
    private valueFormatter;
    private operator;
    private filterSettings;
    customFilterOperators: ICustomOptr;
    private dropOptr;
    private flMuiObj;
    private col;
    private isDialogOpen;
    menuFilterBase: any;
    options: IFilterArgs;
    private maxHeight;
    private isMenuCheck;
    private currentDialogCreatedColumn;
    private colTypes;
    constructor(parent?: IGrid, filterSettings?: FilterSettings, serviceLocator?: ServiceLocator, customFltrOperators?: Object, fltrObj?: Filter);
    protected clearCustomFilter(col: Column): void;
    protected applyCustomFilter(args: {
        col: Column;
    }): void;
    private openDialog;
    private closeDialog;
    private renderDlgContent;
    private renderResponsiveDialog;
    private dialogCreated;
    /**
     * Function to notify filterDialogCreated and trigger actionComplete
     *
     * @returns {void}
     * @hidden
     */
    afterRenderFilterUI(): void;
    private renderFilterUI;
    private renderOperatorUI;
    private renderFlValueUI;
    private writeMethod;
    private filterBtnClick;
    private closeResponsiveDialog;
    private clearBtnClick;
    destroy(): void;
    /**
     * @returns {FilterUI} returns the filterUI
     * @hidden
     */
    getFilterUIInfo(): FilterUI;
    renderCheckBoxMenu(): HTMLElement;
    private actionComplete;
}
