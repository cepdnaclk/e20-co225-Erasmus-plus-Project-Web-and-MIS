import * as events from '../base/constant';
/**
 * `Freeze` module is used to handle Frozen rows and columns.
 *
 * @hidden
 */
var Freeze = /** @class */ (function () {
    function Freeze(parent, locator) {
        this.parent = parent;
        this.locator = locator;
        this.addEventListener();
    }
    Freeze.prototype.getModuleName = function () {
        return 'freeze';
    };
    Freeze.prototype.addEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on(events.initialLoad, this.instantiateRenderer, this);
        this.parent.on(events.destroy, this.destroy, this);
    };
    Freeze.prototype.instantiateRenderer = function () {
        this.parent.log('limitation', this.getModuleName());
    };
    Freeze.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off(events.initialLoad, this.instantiateRenderer);
        this.parent.off(events.destroy, this.destroy);
    };
    Freeze.prototype.destroy = function () {
        this.removeEventListener();
    };
    return Freeze;
}());
export { Freeze };
