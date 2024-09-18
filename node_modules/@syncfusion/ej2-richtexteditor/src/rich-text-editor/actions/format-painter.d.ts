import { IFormatPainter, IRichTextEditor } from '../base/interface';
export declare class FormatPainter implements IFormatPainter {
    private parent;
    private isSticky;
    private isActive;
    previousAction: string;
    private isDestroyed;
    constructor(parent?: IRichTextEditor);
    private addEventListener;
    private toolbarClick;
    private toolbarDoubleClick;
    private onKeyDown;
    private actionHandler;
    private updateCursor;
    private updateToolbarBtn;
    private editAreaClick;
    destroy(): void;
    /**
     * For internal use only - Get the module name.
     *
     * @returns {void}
     * @hidden
     */
    private getModuleName;
}
