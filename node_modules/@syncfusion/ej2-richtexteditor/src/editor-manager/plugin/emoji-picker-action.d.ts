import { EditorManager } from './../base/editor-manager';
export declare class EmojiPickerAction {
    private parent;
    constructor(parent?: EditorManager);
    private addEventListener;
    private removeEventListener;
    private emojiInsert;
    private beforeApplyFormat;
    destroy(): void;
}
