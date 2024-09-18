import { ChildProperty } from '@syncfusion/ej2-base';
/**
 * Specifies the filter type for Search settings of the File Manager.
 * ```props
 * contains :- It will only show files and folders whose names contain the entered word.
 * startsWith :- It will only show files and folders whose names start with entered word.
 * endsWith :- It will only show files and folders whose names end with entered word.
 * ```
 */
export declare type FilterType = 'contains' | 'startsWith' | 'endsWith';
/**
 * Specifies the Search settings of the File Manager.
 */
export declare class SearchSettings extends ChildProperty<SearchSettings> {
    /**
     * Enables or disables the allowSearchOnTyping.
     *
     * @default true
     */
    allowSearchOnTyping: boolean;
    /**
     * Specifies the filter type while searching the content. The available filter types are:
     * * `contains`
     * * `startsWith`
     * * `endsWith`
     *
     * @default 'contains'
     */
    filterType: FilterType;
    /**
     * If ignoreCase is set to false, searches files that match exactly,
     * else searches files that are case insensitive(uppercase and lowercase letters treated the same).
     *
     * @default true
     */
    ignoreCase: boolean;
    /**
     * Specifies the placeholder value to the search input of the File Manager component.
     * It accepts string.
     *
     * @default null
     */
    placeholder: string;
}
