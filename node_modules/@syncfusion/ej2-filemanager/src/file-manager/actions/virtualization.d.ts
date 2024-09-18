import { FileManager } from '../base';
export declare class Virtualization {
    constructor(instance: FileManager);
    private filemanagerInstance;
    private largeIconInstance;
    private itemCount;
    private rowItemCount;
    private items;
    private itemList;
    private scrollPosition;
    private totalHeight;
    private listItemHeight;
    private topElementHeight;
    private bottomElementHeight;
    private renderedCount;
    private lastRowCount;
    private topElement;
    private bottomElement;
    private listDiff;
    /**
     * Sets up UI virtualization for the large icon view.
     *
     * @returns {void}
     */
    setUIVirtualization(): void;
    /**
     * Sets the height of the top and bottom elements that are used for virtualization.
     * These elements are used to give the appearance of an infinitely scrolling list.
     *
     * @returns {void}
     */
    setUlElementHeight(): void;
    /**
     * Calculates the number of items to display in the list based on the available width and height.
     *
     * @param {number} dataSourceLength The length of the data source.
     * @returns {number} The number of items to display.
     */
    private getItemCount;
    /**
     * Wires or un wires the scroll event for the list element.
     *
     * @param {boolean} destroy - Set `true` to unwire the scroll event.
     * @returns {void}
     */
    wireScrollEvent(destroy: boolean): void;
    /**
     * Handles the scroll event for the list element.
     * This method updates the top and bottom elements and the displayed items based on the scroll position.
     *
     * @returns {void}
     * @private
     */
    private onVirtualUiScroll;
    /**
     * Calculates the current scroll position of the list element.
     *
     * @param {number} startingHeight The starting height from which to calculate the scroll position.
     * @returns {number} The current scroll position.
     * @private
     */
    private getscrollerHeight;
    /**
     * This method updates the displayed items and the selection based on the scroll direction.
     *
     * @param {number} listDiff The number of rows to update.
     * @param {boolean} isScrollingDown If set to true, the scroll direction is downward.
     * @returns {void}
     * @private
     */
    private onNormalScroll;
    /**
     * Updates the items in the large icons view.
     *
     * @param {boolean} isScrollingDown - If set to true, the scroll direction is downward.
     * @returns {void}
     * @private
     */
    private updateUI;
    /**
     * For internal use only - Get the module name.
     *
     * @returns {string} - returns the module name.
     * @private
     */
    private getModuleName;
    /**
     * Destroys the component.
     *
     * @returns {void}
     */
    destroy(): void;
}
