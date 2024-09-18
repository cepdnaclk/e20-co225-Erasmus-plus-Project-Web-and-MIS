import { Query, DataManager } from '@syncfusion/ej2-data';
import { getObject, calculateAggregate, Aggregate as GridAggregate, Grid, appendChildren } from '@syncfusion/ej2-grids';
import { findParentRecords } from '../utils';
import { isNullOrUndefined, setValue, createElement, extend } from '@syncfusion/ej2-base';
/**
 * TreeGrid Aggregate module
 *
 * @hidden
 */
var Aggregate = /** @class */ (function () {
    /**
     * Constructor for Aggregate module
     *
     * @param {TreeGrid} parent - Tree Grid instance
     */
    function Aggregate(parent) {
        Grid.Inject(GridAggregate);
        this.parent = parent;
        this.flatChildRecords = [];
        this.summaryQuery = [];
    }
    /**
     * For internal use only - Get the module name.
     *
     * @private
     * @returns {string} Returns Summary module name
     */
    Aggregate.prototype.getModuleName = function () {
        return 'summary';
    };
    Aggregate.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
    };
    /**
     * Function to calculate summary values
     *
     * @param {QueryOptions[]} summaryQuery - DataManager query for aggregate operations
     * @param {Object[]} filteredData - Filtered data collection
     * @param {boolean} isSort - Specified whether sorting operation performed
     * @hidden
     * @returns {Object[]} -  return flat records with summary values
     */
    Aggregate.prototype.calculateSummaryValue = function (summaryQuery, filteredData, isSort) {
        this.summaryQuery = summaryQuery;
        var parentRecord;
        var parentDataLength = Object.keys(filteredData).length;
        var parentData = [];
        for (var p = 0, len = parentDataLength; p < len; p++) {
            var summaryRow = getObject('isSummaryRow', filteredData[parseInt(p.toString(), 10)]);
            if (!summaryRow) {
                parentData.push(filteredData[parseInt(p.toString(), 10)]);
            }
        }
        var parentRecords = findParentRecords(parentData);
        var flatRecords = parentData.slice();
        var summaryLength = Object.keys(this.parent.aggregates).length;
        var dataLength = Object.keys(parentRecords).length;
        var childRecordsLength;
        var columns = this.parent.getColumns();
        if (this.parent.aggregates.filter(function (x) { return x.showChildSummary; }).length) {
            for (var i = 0, len = dataLength; i < len; i++) {
                parentRecord = parentRecords[parseInt(i.toString(), 10)];
                childRecordsLength = this.getChildRecordsLength(parentRecord, flatRecords);
                if (childRecordsLength) {
                    var _loop_1 = function (summaryRowIndex, len_1) {
                        var item = void 0;
                        item = {};
                        for (var i_1 = 0; i_1 < columns.length; i_1++) {
                            var field = (isNullOrUndefined(getObject('field', columns[parseInt(i_1.toString(), 10)]))) ?
                                columns[parseInt(i_1.toString(), 10)] : getObject('field', (columns[parseInt(i_1.toString(), 10)]));
                            item["" + field] = null;
                        }
                        item = this_1.createSummaryItem(item, this_1.parent.aggregates[summaryRowIndex - 1]);
                        if (this_1.parent.aggregates[summaryRowIndex - 1].showChildSummary) {
                            var idx_1;
                            flatRecords.map(function (e, i) {
                                if (e.uniqueID === parentRecord.uniqueID) {
                                    idx_1 = i;
                                    return;
                                }
                            });
                            var currentIndex = idx_1 + childRecordsLength + summaryRowIndex;
                            var summaryParent = extend({}, parentRecord);
                            delete summaryParent.childRecords;
                            delete summaryParent[this_1.parent.childMapping];
                            setValue('parentItem', summaryParent, item);
                            var level = getObject('level', summaryParent);
                            setValue('level', level + 1, item);
                            setValue('isSummaryRow', true, item);
                            setValue('parentUniqueID', summaryParent.uniqueID, item);
                            if (isSort) {
                                var childRecords = getObject('childRecords', parentRecord);
                                if (childRecords.length) {
                                    childRecords.push(item);
                                }
                            }
                            flatRecords.splice(currentIndex, 0, item);
                        }
                        else {
                            return "continue";
                        }
                    };
                    var this_1 = this;
                    for (var summaryRowIndex = 1, len_1 = summaryLength; summaryRowIndex <= len_1; summaryRowIndex++) {
                        _loop_1(summaryRowIndex, len_1);
                    }
                    this.flatChildRecords = [];
                }
            }
        }
        else {
            var items = {};
            for (var columnIndex = 0, length_1 = columns.length; columnIndex < length_1; columnIndex++) {
                var fields = isNullOrUndefined(getObject('field', columns[parseInt(columnIndex.toString(), 10)])) ?
                    columns[parseInt(columnIndex.toString(), 10)] : getObject('field', columns[parseInt(columnIndex.toString(), 10)]);
                items["" + fields] = null;
            }
            for (var summaryRowIndex = 1, length_2 = summaryLength; summaryRowIndex <= length_2; summaryRowIndex++) {
                this.createSummaryItem(items, this.parent.aggregates[summaryRowIndex - 1]);
            }
        }
        return flatRecords;
    };
    Aggregate.prototype.getChildRecordsLength = function (parentData, flatData) {
        var recordLength = Object.keys(flatData).length;
        var record;
        for (var i = 0, len = recordLength; i < len; i++) {
            record = flatData[parseInt(i.toString(), 10)];
            var parent_1 = isNullOrUndefined(record.parentItem) ? null :
                flatData.filter(function (e) { return e.uniqueID === record.parentItem.uniqueID; })[0];
            if (parentData === parent_1) {
                this.flatChildRecords.push(record);
                var hasChild = getObject('hasChildRecords', record);
                if (hasChild) {
                    this.getChildRecordsLength(record, flatData);
                }
                else {
                    continue;
                }
            }
        }
        return this.flatChildRecords.length;
    };
    Aggregate.prototype.createSummaryItem = function (itemData, summary) {
        var summaryColumnLength = Object.keys(summary.columns).length;
        for (var i = 0, len = summaryColumnLength; i < len; i++) {
            var displayColumn = isNullOrUndefined(summary.columns[parseInt(i.toString(), 10)].columnName) ?
                summary.columns[parseInt(i.toString(), 10)].field : summary.columns[parseInt(i.toString(), 10)].columnName;
            var keys = Object.keys(itemData);
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var key = keys_1[_i];
                if (key === displayColumn) {
                    if (this.flatChildRecords.length) {
                        itemData["" + key] = this.getSummaryValues(summary.columns[parseInt(i.toString(), 10)], this.flatChildRecords);
                    }
                    else if (this.parent.isLocalData) {
                        var data = this.parent.dataSource instanceof DataManager ? this.parent.dataSource.dataSource.json
                            : this.parent.flatData;
                        itemData["" + key] = this.getSummaryValues(summary.columns[parseInt(i.toString(), 10)], data);
                    }
                }
                else {
                    continue;
                }
            }
        }
        return itemData;
    };
    Aggregate.prototype.getSummaryValues = function (summaryColumn, summaryData) {
        var qry = new Query();
        var single = {};
        var helper = {};
        var type = !isNullOrUndefined(summaryColumn.field) ?
            this.parent.getColumnByField(summaryColumn.field).type : undefined;
        summaryColumn.setPropertiesSilent({ format: this.getFormatFromType(summaryColumn.format, type) });
        summaryColumn.setFormatter(this.parent.grid.locale);
        var formatFn = summaryColumn.getFormatter() || (function () { return function (a) { return a; }; })();
        summaryColumn.setTemplate(helper);
        var tempObj = summaryColumn.getTemplate(2);
        qry.queries = this.summaryQuery;
        qry.requiresCount();
        var sumData = new DataManager(summaryData).executeLocal(qry);
        var types = summaryColumn.type;
        var summaryKey;
        types = [summaryColumn.type];
        for (var i = 0; i < types.length; i++) {
            summaryKey = types[parseInt(i.toString(), 10)];
            var key = summaryColumn.field + ' - ' + types[parseInt(i.toString(), 10)].toLowerCase();
            var val = types[parseInt(i.toString(), 10)] !== 'Custom' ? getObject('aggregates', sumData) :
                /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                calculateAggregate(types[parseInt(i.toString(), 10)], sumData, summaryColumn, this.parent);
            var disp = summaryColumn.columnName;
            var value_1 = types[parseInt(i.toString(), 10)] !== 'Custom' ? val["" + key] : val;
            single["" + disp] = single["" + disp] || {};
            single["" + disp]["" + key] = value_1;
            single["" + disp][types[parseInt(i.toString(), 10)]] = !isNullOrUndefined(val) ? formatFn(value_1) : ' ';
        }
        helper.format = summaryColumn.getFormatter();
        var cellElement = createElement('td', {
            className: 'e-summary'
        });
        if (this.parent.isReact) {
            var renderReactTemplates = 'renderReactTemplates';
            tempObj.fn(single[summaryColumn.columnName], this.parent, tempObj.property, '', null, null, cellElement);
            this.parent["" + renderReactTemplates]();
        }
        else {
            appendChildren(cellElement, tempObj.fn(single[summaryColumn.columnName], this.parent, tempObj.property));
        }
        var value = single["" + summaryColumn.columnName]["" + summaryKey];
        var summaryValue;
        if (cellElement.innerHTML.indexOf(value) === -1) {
            summaryValue = cellElement.innerHTML + value;
            return summaryValue;
        }
        else {
            return cellElement.innerHTML;
        }
    };
    Aggregate.prototype.getFormatFromType = function (summaryformat, type) {
        if (isNullOrUndefined(type) || typeof summaryformat !== 'string') {
            return summaryformat;
        }
        var obj;
        switch (type) {
            case 'number':
                obj = { format: summaryformat };
                break;
            case 'datetime':
                obj = { type: 'dateTime', skeleton: summaryformat };
                break;
            case 'date':
                obj = { type: type, skeleton: summaryformat };
                break;
        }
        return obj;
    };
    /**
     * To destroy the Aggregate module
     *
     * @returns {void}
     * @hidden
     */
    Aggregate.prototype.destroy = function () {
        this.removeEventListener();
    };
    return Aggregate;
}());
export { Aggregate };
