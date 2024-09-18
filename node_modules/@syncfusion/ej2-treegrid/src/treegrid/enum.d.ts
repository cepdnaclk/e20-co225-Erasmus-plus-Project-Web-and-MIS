/**
 * Defines modes of Filter Hierarchy
 * ```props
 * * Parent :- Shows filtered records with its Parent records.
 * * Child :- Shows filtered records with its Child records.
 * * Both :- Shows filtered records with its Parent and Child records.
 * * None :- Shows only the filetred records.
 * ```
 */
export declare type FilterHierarchyMode = 'Parent' | 'Child' | 'Both' | 'None';
/**
 * Defines Predefined toolbar items.
 * ```props
 * * Add :- Add new record.
 * * Edit :- Edit the selected record.
 * * Update :- Update the edited record.
 * * Delete :- Delete the selected record.
 * * Cancel :- Cancel the edited state.
 * * Search :- Searches the TreeGrid records by given key.
 * * ExpandAll :- Expands all the rows in TreeGrid.
 * * CollapseAll :- Collapses all the rows in TreeGrid.
 * * ExcelExport :- Export the TreeGrid to Excel.
 * * PdfExport :- Export the TreeGrid to Pdf.
 * * CsvExport :- Export the TreeGrid to Csv.
 * * Print :- Print the TreeGrid.
 * ```
 *
 * @hidden
 */
export declare type ToolbarItems = 'Add' | 'Delete' | 'Update' | 'Cancel' | 'Edit' | 'Search' | 'ExpandAll' | 'CollapseAll' | 'ExcelExport' | 'PdfExport' | 'CsvExport' | 'Print';
/**
 * Defines Predefined toolbar items.
 *
 * @hidden
 */
export declare enum ToolbarItem {
    Add = 0,
    Edit = 1,
    Update = 2,
    Delete = 3,
    Cancel = 4,
    Search = 5,
    ExpandAll = 6,
    CollapseAll = 7,
    ExcelExport = 8,
    PdfExport = 9,
    CsvExport = 10,
    Print = 11,
    RowIndent = 12,
    RowOutdent = 13
}
/**
 * Defines different PageSizeMode
 * ```props
 * * All :- Defines the pageSizeMode as All
 * * Root :- Defines the pageSizeMode as Root
 * ```
 */
export declare type PageSizeMode = 'All' | 'Root';
/**
 * Defines predefined contextmenu items.
 * ```props
 * * AutoFitAll :- Auto fit the size of all columns.
 * * AutoFit :- Auto fit the current column.
 * * SortAscending :- Sort the current column in ascending order.
 * * SortDescending :- Sort the current column in descending order.
 * * Edit :- Edit the current record.
 * * Delete :- Delete the current record.
 * * Save :- Save the edited record.
 * * Cancel :- Cancel the edited state.
 * * PdfExport :- Export the TreeGrid as Pdf format.
 * * ExcelExport :- Export the TreeGrid as Excel format.
 * * CsvExport :- Export the TreeGrid as CSV format.
 * * FirstPage :- Go to the first page.
 * * PrevPage :- Go to the previous page.
 * * LastPage :- Go to the last page.
 * * NextPage :- Go to the next page.
 * ```
 *
 * @hidden
 */
export declare type ContextMenuItem = 'AutoFitAll' | 'AutoFit' | 'SortAscending' | 'SortDescending' | 'Edit' | 'Delete' | 'Save' | 'Cancel' | 'PdfExport' | 'ExcelExport' | 'CsvExport' | 'FirstPage' | 'PrevPage' | 'LastPage' | 'NextPage' | 'AddRow' | 'Indent' | 'Outdent';
/**
 * Defines predefined contextmenu items.
 *
 * @hidden
 */
export declare enum ContextMenuItems {
    AutoFit = 0,
    AutoFitAll = 1,
    SortAscending = 2,
    SortDescending = 3,
    Edit = 4,
    Delete = 5,
    Save = 6,
    Cancel = 7,
    PdfExport = 8,
    ExcelExport = 9,
    CsvExport = 10,
    FirstPage = 11,
    PrevPage = 12,
    LastPage = 13,
    NextPage = 14,
    AddRow = 15,
    RowIndent = 16,
    RowOutdent = 17
}
/**
 * Defines modes of editing.
 * ```props
 * * Cell :- Defines the editing mode as Cell.
 * * Row :- Defines the editing mode as Row.
 * * Dialog :- Defines the editing mode as Dialog.
 * * Batch :- Defines the editing mode as Batch.
 * ```
 */
export declare type EditMode = 'Cell' | 'Row' | 'Dialog' | 'Batch';
/**
 * Defines the position where the new row has to be added.
 * ```props
 * * Top :- Defines new row position as top of all rows.
 * * Bottom :- Defines new row position as bottom of all rows.
 * * Above :- Defines new row position as above the selected row.
 * * Below :- Defines new row position as below the selected row.
 * * Child :- Defines new row position as child to the selected row.
 * ```
 */
export declare type RowPosition = 'Top' | 'Bottom' | 'Above' | 'Below' | 'Child';
/**
 * Defines types of Filter
 * ```props
 * * Menu :- Defines the filter type as Menu.
 * * Excel :- Defines the filter type as Excel.
 * * FilterBar :- Defines the filter type as FilterBar.
 * ```
 */
export declare type FilterType = 'FilterBar' | 'Excel' | 'Menu';
/**
 * Defines the wrap mode.
 * ```props
 * * Both :-  Wraps both header and content.
 * * Header :- Wraps header alone.
 * * Content :- Wraps content alone.
 */
export declare type WrapMode = 'Both' | 'Header' | 'Content';
/**
 * Defines types of CopyHierarchyMode. They are
 * ```props
 * * Parent :- Defines CopyHiearchyMode as Parent.
 * * Child :- Defines CopyHiearchyMode as Child.
 * * Both :- Defines CopyHiearchyMode as Both.
 * * None :- Defines CopyHiearchyMode as None.
 * ```
 */
export declare type CopyHierarchyType = 'Parent' | 'Child' | 'Both' | 'None';
