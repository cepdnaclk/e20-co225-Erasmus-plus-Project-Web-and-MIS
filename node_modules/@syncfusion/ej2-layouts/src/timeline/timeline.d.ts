import { Component, INotifyPropertyChanged, ChildProperty, BaseEventArgs, EmitType } from '@syncfusion/ej2-base';
import { TimelineModel, TimelineItemModel } from '../timeline';
/**
 * Defines the orientation type of the Timeline.
 */
export declare enum TimelineOrientation {
    /**
     * Items are displayed horizontally.
     */
    Horizontal = "Horizontal",
    /**
     * Items are displayed vertically.
     */
    Vertical = "Vertical"
}
/**
 * Specifies the alignment of item content within the Timeline.
 */
export declare enum TimelineAlign {
    /**
     * Aligns item content to the top and opposite content to the bottom when the Timeline is in a horizontal orientation, or the content to the left and opposite content to the right when the Timeline is in a vertical orientation.
     */
    Before = "Before",
    /**
     * Aligns item content to the bottom and opposite content to the top when the Timeline is in a horizontal orientation, or the content to the right and opposite content to the left when the Timeline is in a vertical orientation.
     */
    After = "After",
    /**
     * Aligns item content alternatively, regardless of the Timeline's orientation.
     */
    Alternate = "Alternate",
    /**
     * Aligns item content in alternate reverse, regardless of the Timeline's orientation.
     */
    AlternateReverse = "AlternateReverse"
}
/**
 * Specifies the items of the Timeline.
 */
export declare class TimelineItem extends ChildProperty<TimelineItem> {
    /**
     * Defines one or more CSS classes to include an icon or image in the Timeline item.
     *
     * @default ''
     */
    dotCss: string;
    /**
     * Defines the text content or template for the Timeline item. The current itemIndex passed as context to build the content.
     *
     * @default ''
     * @angularType string | object
     * @reactType string | function | JSX.Element
     * @vueType string | function
     * @aspType string
     */
    content: string | Function;
    /**
     * Defines the additional text content or template to be displayed opposite side of the item. The current itemIndex passed as context to build the content.
     *
     * @default ''
     * @angularType string | object
     * @reactType string | function | JSX.Element
     * @vueType string | function
     * @aspType string
     */
    oppositeContent: string | Function;
    /**
     * Defines whether to enable or disable the timeline item.
     *
     * @default false
     */
    disabled: boolean;
    /**
     * Defines the CSS class to customize the Timeline item appearance.
     *
     * @default ''
     */
    cssClass: string;
}
/**
 * Provides information about beforeItemRender event callback.
 */
export interface TimelineRenderingEventArgs extends BaseEventArgs {
    /**
     * Provides the timeline element.
     */
    element: HTMLElement;
    /**
     * Provides the index of the current item.
     */
    index: number;
}
/**
 * The Timeline component presents a series of events or activities in chronological order, allowing users to track the progression of time.
 *
 * ```html
 * <div id="timeline"></div>
 * ```
 * ```typescript
 * <script>
 *   let timelineObj: Timeline = new Timeline({items : [{}, {}, {}, {}, {}]});
 *   timelineObj.appendTo('#timeline');
 * </script>
 * ```
 */
export declare class Timeline extends Component<HTMLElement> implements INotifyPropertyChanged {
    /**
     * Defines the orientation type of the Timeline.
     *
     * The possible values are:
     * * Horizontal
     * * vertical
     *
     * {% codeBlock src='timeline/orientation/index.md' %}{% endcodeBlock %}
     *
     * @isenumeration true
     * @default TimelineOrientation.Vertical
     * @asptype TimelineOrientation
     */
    orientation: string | TimelineOrientation;
    /**
     * Defines the alignment of item content within the Timeline.
     *
     * The possible values are:
     * * Before
     * * After
     * * Alternate
     * * AlternateReverse
     *
     * {% codeBlock src='timeline/align/index.md' %}{% endcodeBlock %}
     *
     * @isenumeration true
     * @default TimelineAlign.After
     * @asptype TimelineAlign
     */
    align: string | TimelineAlign;
    /**
     * Defines the list of items.
     *
     * @default []
     */
    items: TimelineItemModel[];
    /**
     * Defines the CSS class to customize the Timeline appearance.
     *
     * @default ''
     */
    cssClass: string;
    /**
     * Defines whether to show the timeline items in reverse order or not.
     *
     * @default false
     */
    reverse: boolean;
    /**
     * Defines the template content for each timeline item. The template context will contain the item model.
     *
     * {% codeBlock src='timeline/template/index.md' %}{% endcodeBlock %}
     *
     * @default ''
     * @angularType string | object
     * @reactType string | function | JSX.Element
     * @vueType string | function
     * @aspType string
     */
    template: string | Function;
    /**
     * Event callback that is raised after rendering the timeline.
     *
     * @event created
     */
    created: EmitType<Event>;
    /**
     * Event triggers before rendering each item.
     *
     * @event beforeItemRender
     */
    beforeItemRender: EmitType<TimelineRenderingEventArgs>;
    private timelineListEle;
    private templateFunction;
    /**
     * * Constructor for creating the Timeline component.
     *
     * @param {TimelineModel} options - Specifies the Timeline model.
     * @param {string | HTMLElement} element - Specifies the element to render as component.
     * @private
     */
    constructor(options?: TimelineModel, element?: string | HTMLElement);
    protected preRender(): void;
    /**
     * To get component name.
     *
     * @returns {string} - It returns the current module name.
     * @private
     */
    getModuleName(): string;
    /**
     * This method is abstract member of the Component<HTMLElement>.
     *
     * @private
     * @returns {string} - It returns the persisted data.
     */
    protected getPersistData(): string;
    protected render(): void;
    protected updateOrientation(): void;
    protected updateCssClass(addCss: string, removeCss?: string): void;
    protected updateRtl(): void;
    protected updateAlign(): void;
    protected updateReverse(): void;
    private renderItems;
    private haveOneSidecontent;
    private updateItemContent;
    private updateTemplateFunction;
    private renderItemContent;
    private removeItemContent;
    /**
     * Gets template content based on the template property value.
     *
     * @param {string | Function} template - Template property value.
     * @param {boolean} notCompile - Compile property value.
     * @returns {Function} - Return template function.
     * @hidden
     */
    private getTemplateFunction;
    private removeItemElements;
    private updateElementClassArray;
    private updateContent;
    destroy(): void;
    private updateItems;
    /**
     * Called internally if any of the property value changed.
     *
     * @param  {TimelineModel} newProp - Specifies new properties
     * @param  {TimelineModel} oldProp - Specifies old properties
     * @returns {void}
     * @private
     */
    onPropertyChanged(newProp: TimelineModel, oldProp?: TimelineModel): void;
}
