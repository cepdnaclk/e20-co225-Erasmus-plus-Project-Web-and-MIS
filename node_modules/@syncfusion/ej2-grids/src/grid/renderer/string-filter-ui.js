import { AutoComplete } from '@syncfusion/ej2-dropdowns';
import { DataManager, Query, Predicate } from '@syncfusion/ej2-data';
import { Browser, isNullOrUndefined, extend, getValue } from '@syncfusion/ej2-base';
import { getZIndexCalcualtion, eventPromise } from '../base/util';
import * as events from '../base/constant';
import * as literals from '../base/string-literals';
import { CheckBoxFilterBase } from '../common/checkbox-filter-base';
/**
 * `string filterui` render string column.
 *
 * @hidden
 */
var StringFilterUI = /** @class */ (function () {
    function StringFilterUI(parent, serviceLocator, filterSettings) {
        this.parent = parent;
        this.serLocator = serviceLocator;
        this.filterSettings = filterSettings;
        if (this.parent) {
            this.parent.on(events.filterMenuClose, this.destroy, this);
            this.parent.on(events.destroy, this.destroy, this);
        }
    }
    StringFilterUI.prototype.create = function (args) {
        this.instance = this.parent.createElement('input', { className: 'e-flmenu-input', id: 'strui-' + args.column.uid });
        args.target.appendChild(this.instance);
        this.dialogObj = args.dialogObj;
        this.processDataOperation(args);
    };
    StringFilterUI.prototype.processDataOperation = function (args) {
        var _this = this;
        if (args.column.isForeignColumn()) {
            this.parent.getDataModule().dataManager.executeQuery(this.parent.getDataModule().generateQuery(true))
                .then(function (result) { _this.getAutoCompleteOptions(args, result); });
            return;
        }
        this.getAutoCompleteOptions(args);
    };
    StringFilterUI.prototype.getAutoCompleteOptions = function (args, result) {
        var isForeignColumn = args.column.isForeignColumn();
        var foreignColumnQuery;
        if (isForeignColumn) {
            var filteredData = CheckBoxFilterBase.getDistinct(result.result, args.column.field)
                .records || [];
            var filterQuery = void 0;
            for (var i = 0; i < filteredData.length; i++) {
                if (filterQuery) {
                    filterQuery = filterQuery.or(args.column.field, 'contains', filteredData[parseInt(i.toString(), 10)][args.column.field], this.parent
                        .filterSettings.enableCaseSensitivity, this.parent.filterSettings.ignoreAccent);
                }
                else {
                    filterQuery = new Predicate(args.column.field, 'contains', filteredData[parseInt(i.toString(), 10)][args.column.field], this.parent
                        .filterSettings.enableCaseSensitivity, this.parent.filterSettings.ignoreAccent);
                }
            }
            foreignColumnQuery = new Query().where(filterQuery);
            foreignColumnQuery.params = this.parent.query.params;
        }
        var dataSource = isForeignColumn ? args.column.dataSource : this.parent.dataSource;
        var fields = { value: isForeignColumn ? args.column.foreignKeyValue : args.column.field };
        var autoComplete = new AutoComplete(extend({
            dataSource: dataSource instanceof DataManager ? dataSource : new DataManager(dataSource),
            fields: fields,
            locale: this.parent.locale,
            enableRtl: this.parent.enableRtl,
            query: isForeignColumn ? foreignColumnQuery : this.parent.getDataModule().generateQuery(true, true),
            sortOrder: 'Ascending',
            cssClass: this.parent.cssClass ? 'e-popup-flmenu' + ' ' + this.parent.cssClass : 'e-popup-flmenu',
            autofill: true,
            placeholder: args.localizeText.getConstant('EnterValue'),
            actionBegin: function () {
                if (this.query.queries.length && this.query.queries[0].fn === 'onWhere' && this.query.queries[0].e
                    && this.query.queries[0].e.predicates) {
                    for (var i = 0; i < this.query.queries[0].e.predicates.length; i++) {
                        if (this.properties.fields.value === this.query.queries[0].e.predicates["" + i].field) {
                            this.query.queries[0].e.predicates.splice(i, 1);
                            i = i - 1;
                        }
                    }
                    if (!this.query.queries[0].e.predicates.length) {
                        this.query.queries.splice(0, 1);
                    }
                }
            }
        }, args.column.filter.params));
        this.acFocus = this.focus(autoComplete, args);
        this.acComplete = this.actionComplete(autoComplete);
        this.acOpen = this.openPopup.bind(this);
        autoComplete.addEventListener(literals.focus, this.acFocus);
        autoComplete.addEventListener(literals['open'], this.acOpen);
        autoComplete.addEventListener(events.actionComplete, this.acComplete);
        if (dataSource && 'result' in dataSource) {
            var query = this.parent.getQuery ? this.parent.getQuery().clone() : new Query();
            var defObj = eventPromise({ requestType: 'stringfilterrequest' }, query);
            this.parent.trigger(events.dataStateChange, defObj.state);
            var def = defObj.deffered;
            def.promise.then(function (e) {
                autoComplete.dataSource = new DataManager(e);
            });
        }
        this.actObj = autoComplete;
        this.actObj.appendTo(this.instance);
        if (isForeignColumn) {
            this.parent.filterModule.filterModule.afterRenderFilterUI();
        }
    };
    StringFilterUI.prototype.write = function (args) {
        if (args.filteredValue !== '' && !isNullOrUndefined(args.filteredValue)) {
            var struiObj = document.querySelector('#strui-' + args.column.uid).ej2_instances[0];
            struiObj.value = args.filteredValue;
        }
    };
    StringFilterUI.prototype.read = function (element, column, filterOptr, filterObj) {
        var actuiObj = document.querySelector('#strui-' + column.uid).ej2_instances[0];
        if (Browser.isDevice) {
            actuiObj.hidePopup();
            actuiObj.focusOut();
        }
        var filterValue = actuiObj.value;
        if (isNullOrUndefined(filterValue) || filterValue === '') {
            filterValue = null;
        }
        filterObj.filterByColumn(column.field, filterOptr, filterValue, 'and', this.parent.filterSettings.enableCaseSensitivity);
    };
    StringFilterUI.prototype.openPopup = function (args) {
        getZIndexCalcualtion(args, this.dialogObj);
    };
    StringFilterUI.prototype.focus = function (actObj, args) {
        return function () {
            actObj.filterType = args.getOptrInstance.getFlOperator();
        };
    };
    StringFilterUI.prototype.actionComplete = function (actObj) {
        return function (e) {
            e.result = e.result.filter(function (obj, index, arr) {
                return arr.map(function (mapObj) {
                    return (getValue(actObj.fields.value, mapObj));
                }).indexOf(getValue((actObj.fields.value), obj)) === index;
            });
        };
    };
    StringFilterUI.prototype.destroy = function () {
        if (!this.actObj || this.actObj.isDestroyed) {
            return;
        }
        this.actObj.removeEventListener(literals.focus, this.acFocus);
        this.actObj.removeEventListener(literals['open'], this.acOpen);
        this.actObj.removeEventListener(events.actionComplete, this.acComplete);
        this.actObj.destroy();
        this.parent.off(events.filterMenuClose, this.destroy);
        this.parent.off(events.destroy, this.destroy);
    };
    return StringFilterUI;
}());
export { StringFilterUI };
