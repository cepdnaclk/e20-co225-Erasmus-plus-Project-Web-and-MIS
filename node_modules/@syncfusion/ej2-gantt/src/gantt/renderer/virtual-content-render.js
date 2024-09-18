import { createElement } from '@syncfusion/ej2-base';
/**
 * virtual Content renderer for Gantt
 */
var VirtualContentRenderer = /** @class */ (function () {
    function VirtualContentRenderer(parent) {
        this.parent = parent;
    }
    /**
     * To render a wrapper for chart body content when virtualization is enabled.
     *
     * @returns {void} .
     * @hidden
     */
    VirtualContentRenderer.prototype.renderWrapper = function () {
        this.wrapper = createElement('div', { className: 'e-virtualtable', styles: 'position: absolute; transform: translate(0px, 0px);' });
        this.parent.ganttChartModule.scrollElement.appendChild(this.wrapper);
        this.virtualTrack = createElement('div', { className: 'e-virtualtrack', styles: 'position: relative; pointer-events: none; width: 100%;' });
        this.parent.ganttChartModule.scrollElement.appendChild(this.virtualTrack);
        this.wrapper.appendChild(this.parent.ganttChartModule.chartBodyContent);
    };
    /**
     * To append child elements for wrappered element when virtualization is enabled.
     *
     * @param {HTMLElement} element .
     * @returns {void} .
     * @hidden
     */
    VirtualContentRenderer.prototype.appendChildElements = function (element) {
        this.wrapper.appendChild(element);
    };
    /**
     * To adjust gantt content table's style when virtualization is enabled
     *
     * @returns {void} .
     * @hidden
     */
    VirtualContentRenderer.prototype.adjustTable = function () {
        var content = this.parent.treeGrid.getContent().querySelector('.e-content').querySelector('.e-virtualtable');
        if (this.parent.enableTimelineVirtualization) {
            var virtualTable = document.getElementsByClassName('e-virtualtable')[1].style.transform;
            var treegridVirtualHeight = this.parent.treeGrid.element.getElementsByClassName('e-virtualtable')[0].style.transform;
            var translateXValue = void 0;
            if (virtualTable !== '') {
                translateXValue = virtualTable.match(/translate.*\((.+)\)/)[1].split(', ')[0];
            }
            else {
                var chartTransform = this.parent.ganttChartModule.scrollElement.getElementsByClassName('e-virtualtable')[0].style.transform;
                translateXValue = chartTransform.match(/translate.*\((.+)\)/)[1].split(', ')[0];
            }
            var translateYValue = treegridVirtualHeight.match(/translate.*\((.+)\)/)[1].split(', ')[1];
            this.parent.ganttChartModule.virtualRender.wrapper.style.transform = "translate(" + translateXValue + ", " + translateYValue + ")";
        }
        else {
            this.parent.ganttChartModule.virtualRender.wrapper.style.transform = content.style.transform;
        }
    };
    return VirtualContentRenderer;
}());
export { VirtualContentRenderer };
