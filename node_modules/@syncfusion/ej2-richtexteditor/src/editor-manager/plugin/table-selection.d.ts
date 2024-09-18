/**
 * Utilities to handle the table cell selection
 */
export declare class TableSelection {
    private root;
    private currentDocument;
    private BLOCK_TAGS;
    private BASIC_FORMATS;
    constructor(root: HTMLElement | HTMLBodyElement, currentDocument: Document);
    /**
     * Get the block nodes from the selected cells.
     *
     * @returns {HTMLTableCellElement[]} - Returns the selected cells
     */
    getBlockNodes(): HTMLElement[];
    private addBlockNodes;
    /**
     * Get the text nodes from the selected cells
     *
     * @returns {Node[]} - Returns the text nodes
     */
    getTextNodes(): Node[];
    private addTextNodes;
    private wrapParagraphNodes;
    private wrapInlineNodes;
}
