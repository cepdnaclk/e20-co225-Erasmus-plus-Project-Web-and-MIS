import { createElement, detach, isNullOrUndefined as isNOU } from '@syncfusion/ej2-base';
import { insertItemsAtIndex } from '../../common/util';
/**
 * Utilities to handle the table cell selection
 */
var TableSelection = /** @class */ (function () {
    function TableSelection(root, currentDocument) {
        this.BLOCK_TAGS = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'li', 'pre', 'td', 'th', 'div', 'hr', 'section', 'figure'];
        this.BASIC_FORMATS = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'pre'];
        this.root = root;
        this.currentDocument = currentDocument;
    }
    /**
     * Get the block nodes from the selected cells.
     *
     * @returns {HTMLTableCellElement[]} - Returns the selected cells
     */
    TableSelection.prototype.getBlockNodes = function () {
        var blockNodes = [];
        if (isNOU(this.root.querySelector('.e-cell-select'))) {
            return blockNodes;
        }
        var currentTable = this.root.querySelector('.e-cell-select').closest('table');
        var cellSelectNode = currentTable.querySelectorAll('.e-cell-select');
        if (isNOU(cellSelectNode) || cellSelectNode.length < 2) {
            return blockNodes;
        }
        // Generate block nodes
        for (var i = 0; i < cellSelectNode.length; i++) {
            this.addBlockNodes(cellSelectNode[i], blockNodes);
        }
        this.wrapParagraphNodes(blockNodes);
        return blockNodes;
    };
    TableSelection.prototype.addBlockNodes = function (node, blockNodes) {
        var nodes = node.childNodes;
        if (nodes.length === 0) {
            blockNodes.push(node);
            return;
        }
        for (var j = 0; j < nodes.length; j++) {
            var currentNode = nodes[j];
            if (blockNodes.indexOf(currentNode.parentElement) >= 0) {
                continue;
            }
            if (currentNode.parentElement && (currentNode.parentElement.nodeName === 'TD' || currentNode.parentElement.nodeName === 'TH')
                && currentNode.parentElement.childNodes.length === 1) {
                if (currentNode.nodeName === 'BR') {
                    blockNodes.push(currentNode.parentElement);
                }
                else if (currentNode.nodeType === Node.TEXT_NODE) {
                    blockNodes.push(currentNode.parentElement);
                }
                else {
                    blockNodes.push(currentNode.parentElement);
                }
            }
            else {
                blockNodes.push(currentNode.parentElement);
            }
        }
    };
    /**
     * Get the text nodes from the selected cells
     *
     * @returns {Node[]} - Returns the text nodes
     */
    TableSelection.prototype.getTextNodes = function () {
        var textNodes = [];
        if (isNOU(this.root.querySelector('.e-cell-select'))) {
            return textNodes;
        }
        var currentTable = this.root.querySelector('.e-cell-select').closest('table');
        var cellSelectNode = currentTable.querySelectorAll('.e-cell-select');
        if (isNOU(cellSelectNode) || cellSelectNode.length < 2) {
            return textNodes;
        }
        // Generate text nodes
        for (var i = 0; i < cellSelectNode.length; i++) {
            this.addTextNodes(cellSelectNode[i], textNodes);
        }
        return textNodes;
    };
    TableSelection.prototype.addTextNodes = function (parent, textNodes) {
        var nodes = parent.childNodes;
        if (nodes.length === 0 && (parent.nodeName === 'TD' || parent.nodeName === 'TH')) {
            var text = this.currentDocument.createTextNode('\u200B');
            parent.appendChild(text);
            textNodes.push(text);
            return;
        } // If the BR element is the only child of the TD element, add a zero width space character
        else if (nodes.length === 1 && (parent.nodeName === 'TD' || parent.nodeName === 'TH') && nodes[0].nodeName === 'BR') {
            var text = this.currentDocument.createTextNode('\u200B');
            parent.insertBefore(text, nodes[0]);
            textNodes.push(text);
            return;
        }
        for (var j = 0; j < nodes.length; j++) {
            var currentNode = nodes[j];
            if (currentNode.nodeType === Node.TEXT_NODE) {
                textNodes.push(currentNode);
            }
            else if (currentNode.nodeType === Node.ELEMENT_NODE) {
                // Recursively check all descendants
                this.addTextNodes(currentNode, textNodes);
            }
        }
    };
    TableSelection.prototype.wrapParagraphNodes = function (blockNodes) {
        var blockNodesArry = Array.from(blockNodes);
        for (var i = 0; i < blockNodesArry.length; i++) {
            var node = blockNodesArry[i];
            if (node.nodeName === 'TD' || node.nodeName === 'TH') {
                // Case 1: Simple TD with BR or inline or text nodes
                if (node.childNodes.length === 1 && (node.childNodes[0].nodeName === 'BR' || node.childNodes[0].nodeType === Node.TEXT_NODE)) {
                    var childNode = node.childNodes[0];
                    var paragraph = createElement('p');
                    childNode.parentElement.insertBefore(paragraph, childNode);
                    paragraph.appendChild(childNode);
                    var index = blockNodes.indexOf(node);
                    blockNodes[index] = paragraph;
                }
                // Case 2 TD with inline and block nodes
                else {
                    var newIndex = blockNodes.indexOf(node);
                    this.wrapInlineNodes(node, blockNodes, newIndex);
                }
            }
        }
        for (var i = 0; i < blockNodes.length; i++) {
            var currentNode = blockNodes[i];
            if (currentNode.nodeName === 'LI' && currentNode.childNodes.length === 1) {
                var firstChild = currentNode.childNodes[0];
                if (firstChild.nodeType === Node.ELEMENT_NODE && this.BASIC_FORMATS.indexOf(firstChild.nodeName.toLocaleLowerCase()) >= 0
                    && firstChild.textContent === currentNode.textContent) {
                    blockNodes[i] = firstChild;
                }
            }
        }
    };
    TableSelection.prototype.wrapInlineNodes = function (node, blockNodes, index) {
        var child = node.childNodes[0];
        var wrapperElement = createElement('p');
        var tempBlockNodes = [];
        if (isNOU(child)) {
            node.appendChild(wrapperElement);
            tempBlockNodes.push(wrapperElement);
            insertItemsAtIndex(blockNodes, tempBlockNodes, index);
            return;
        }
        while (child) {
            // CASE 1: BR Elements
            if (child.nodeName === 'BR') {
                child.parentNode.insertBefore(wrapperElement, child);
                wrapperElement.appendChild(child);
                if (wrapperElement.childNodes.length > 0 && tempBlockNodes.indexOf(wrapperElement) < 0) {
                    tempBlockNodes.push(wrapperElement);
                }
                child = wrapperElement.nextSibling;
                wrapperElement = createElement('p');
            } // CASE 2: Block elements
            else if (this.BLOCK_TAGS.indexOf(child.nodeName.toLocaleLowerCase()) >= 0) {
                tempBlockNodes.push(child);
                if (wrapperElement.childNodes.length > 0) {
                    child = wrapperElement.nextSibling;
                }
                else {
                    // Check if any nested list items are present
                    if (child && child.nodeName === 'LI' && child.querySelectorAll('li').length > 0) {
                        var listNodes = child.querySelectorAll('li');
                        for (var i = 0; i < listNodes.length; i++) {
                            tempBlockNodes.push(listNodes[i]);
                        }
                    }
                    if (child.nodeName === 'LI' && isNOU(child.nextSibling)) {
                        child = child.parentElement.nextSibling;
                    }
                    else {
                        child = child.nextSibling;
                    }
                }
            } // CASE 3: Text node
            else if (child.nodeType === Node.TEXT_NODE) {
                // Remove empty text nodes
                if (child.textContent.trim() === '' && child.textContent.indexOf('\u200B') < 0) {
                    var nextSibling = child.nextSibling;
                    detach(child);
                    child = nextSibling;
                    continue;
                }
                child.parentNode.insertBefore(wrapperElement, child);
                var textNode = child;
                wrapperElement.appendChild(textNode);
                if (wrapperElement.childNodes.length > 0 && tempBlockNodes.indexOf(wrapperElement) < 0) {
                    tempBlockNodes.push(wrapperElement);
                }
                child = wrapperElement.nextSibling;
            } // CASE 4: Edge case UL, OL, TABLE, etc.
            else if (child.nodeName === 'TABLE' || child.nodeName === 'UL' || child.nodeName === 'OL') {
                if (child.nodeName === 'TABLE') {
                    var nestedBlockNodes = [];
                    var cellSelectNode = child.querySelectorAll('td, th');
                    for (var i = 0; i < cellSelectNode.length; i++) {
                        this.addBlockNodes(cellSelectNode[i], nestedBlockNodes);
                    }
                    this.wrapParagraphNodes(nestedBlockNodes);
                    for (var i = 0; i < nestedBlockNodes.length; i++) {
                        tempBlockNodes.push(nestedBlockNodes[i]);
                    }
                    child = child.nextSibling;
                }
                else {
                    child = child.firstElementChild;
                }
            } // CASE 5: Inline elements
            else if (this.BLOCK_TAGS.indexOf(child.nodeName.toLocaleLowerCase()) < 0) {
                child.parentNode.insertBefore(wrapperElement, child);
                wrapperElement.appendChild(child);
                if (wrapperElement.childNodes.length > 0 && tempBlockNodes.indexOf(wrapperElement) < 0) {
                    tempBlockNodes.push(wrapperElement);
                }
                child = wrapperElement.nextSibling;
            }
        }
        // Merge the block nodes
        insertItemsAtIndex(blockNodes, tempBlockNodes, index);
    };
    return TableSelection;
}());
export { TableSelection };
