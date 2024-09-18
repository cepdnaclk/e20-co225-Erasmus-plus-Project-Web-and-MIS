var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { merge, isNullOrUndefined, extend, Property } from '@syncfusion/ej2-base';
import { Query, DataUtil } from '@syncfusion/ej2-data';
import { ValueFormatter } from '../services/value-formatter';
import { getUid, templateCompiler, getForeignData, getObject } from '../base/util';
/**
 * Represents Grid `Column` model class.
 */
var Column = /** @class */ (function () {
    function Column(options, parent) {
        var _this = this;
        /**
         * If `disableHtmlEncode` is set to true, it encodes the HTML of the header and content cells.
         *
         * @default true
         */
        this.disableHtmlEncode = true;
        /**
         * If `allowSorting` set to false, then it disables sorting option of a particular column.
         * By default all columns are sortable.
         *
         * @default true
         */
        this.allowSorting = true;
        /**
         * If `allowResizing` is set to false, it disables resize option of a particular column.
         * By default all the columns can be resized.
         *
         * @default true
         */
        this.allowResizing = true;
        /**
         * If `allowFiltering` set to false, then it disables filtering option and filter bar element of a particular column.
         * By default all columns are filterable.
         *
         * @default true
         */
        this.allowFiltering = true;
        /**
         * If `allowGrouping` set to false, then it disables grouping of a particular column.
         * By default all columns are groupable.
         *
         * @default true
         */
        this.allowGrouping = true;
        /**
         * If `allowReordering` set to false, then it disables reorder of a particular column.
         * By default all columns can be reorder.
         *
         * @default true
         */
        this.allowReordering = true;
        /**
         * If `showColumnMenu` set to false, then it disable the column menu of a particular column.
         * By default column menu will show for all columns
         *
         * @default true
         */
        this.showColumnMenu = true;
        /**
         * If `enableGroupByFormat` set to true, then it groups the particular column by formatted values.
         *
         * @default true
         */
        this.enableGroupByFormat = false;
        /**
         * If `allowEditing` set to false, then it disables editing of a particular column.
         * By default all columns are editable.
         *
         * @default true
         */
        this.allowEditing = true;
        /**
         *  It is used to customize the default filter options for a specific columns.
         * * type -  Specifies the filter type as menu or checkbox.
         * * ui - to render custom component for specific column it has following functions.
         * * ui.create – It is used for creating custom components.
         * * ui.read -  It is used for read the value from the component.
         * * ui.write - It is used to apply component model as dynamically.
         * {% codeBlock src="grid/filter-menu-api/index.ts" %}{% endcodeBlock %}
         *
         * > Check the [`Filter UI`](../../grid/filtering/filter-menu/#custom-component-in-filter-menu) for its customization.
         *
         *  @default {}
         */
        this.filter = {};
        /**
         * If `showInColumnChooser` set to false, then hide the particular column in column chooser.
         *  By default all columns are displayed in column Chooser.
         *
         * @default true
         */
        this.showInColumnChooser = true;
        /**
         * Defines the `IEditCell` object to customize default edit cell.
         *
         * @default {}
         */
        this.edit = {};
        /**
         * If `allowSearching` set to false, then it disables Searching of a particular column.
         * By default all columns allow Searching.
         *
         * @default true
         */
        this.allowSearching = true;
        /**
         * If `autoFit` set to true, then the particular column content width will be
         * adjusted based on its content in the initial rendering itself.
         * Setting this property as true is equivalent to calling `autoFitColumns` method in the `dataBound` event.
         *
         * @default false
         */
        this.autoFit = false;
        this.sortDirection = 'Descending';
        /**
         * @returns {Function} returns the edit template
         * @hidden */
        this.getEditTemplate = function () { return _this.editTemplateFn; };
        /**
         * @returns {Function} returns the filter template
         * @hidden */
        this.getFilterTemplate = function () { return _this.filterTemplateFn; };
        merge(this, options);
        this.parent = parent;
        if (this.type === 'none') {
            this.type = null;
        }
        else if (this.type) {
            this.type = typeof (this.type) === 'string' ? this.type.toLowerCase() : undefined;
        }
        if (this.editType) {
            this.editType = this.editType.toLowerCase();
        }
        if (isNullOrUndefined(this.uid)) {
            this.uid = getUid('grid-column');
        }
        var valueFormatter = new ValueFormatter();
        if (options.format && (options.format.skeleton || (options.format.format &&
            typeof options.format.format === 'string'))) {
            this.setFormatter(valueFormatter.getFormatFunction(extend({}, options.format)));
            this.setParser(valueFormatter.getParserFunction(options.format));
        }
        this.toJSON = function () {
            var col = {};
            var skip = ['filter', 'dataSource', 'headerText', 'template', 'headerTemplate', 'edit',
                'editTemplate', 'filterTemplate', 'commandsTemplate', 'parent'];
            var keys = Object.keys(_this);
            for (var i = 0; i < keys.length; i++) {
                if (keys[parseInt(i.toString(), 10)] === 'columns') {
                    col[keys[parseInt(i.toString(), 10)]] = [];
                    for (var j = 0; j < _this[keys[parseInt(i.toString(), 10)]].length; j++) {
                        col[keys[parseInt(i.toString(), 10)]].push(_this[keys[parseInt(i.toString(), 10)]][parseInt(j.toString(), 10)].toJSON());
                    }
                }
                else if (skip.indexOf(keys[parseInt(i.toString(), 10)]) < 0) {
                    col[keys[parseInt(i.toString(), 10)]] = _this[keys[parseInt(i.toString(), 10)]];
                }
            }
            return col;
        };
        if (!this.field) {
            this.allowFiltering = false;
            this.allowGrouping = false;
            this.allowSorting = false;
            if (this.columns) {
                this.allowResizing = this.columns.some(function (col) {
                    return col.allowResizing;
                });
            }
        }
        if (this.commands && !this.textAlign) {
            this.textAlign = 'Right';
        }
        if (this.template || this.commandsTemplate) {
            this.templateFn = templateCompiler(this.template || this.commandsTemplate);
        }
        if (this.headerTemplate) {
            this.headerTemplateFn = templateCompiler(this.headerTemplate);
        }
        if (!isNullOrUndefined(this.filter) && this.filter.itemTemplate) {
            this.fltrTemplateFn = templateCompiler(this.filter.itemTemplate);
        }
        if (this.editTemplate) {
            this.editTemplateFn = templateCompiler(this.editTemplate);
        }
        if (this.filterTemplate) {
            this.filterTemplateFn = templateCompiler(this.filterTemplate);
        }
        if (this.isForeignColumn() &&
            (isNullOrUndefined(this.editType) || this.editType === 'dropdownedit' || this.editType === 'defaultedit')) {
            this.editType = 'dropdownedit';
            if (this.edit.params && this.edit.params.dataSource) {
                this.edit.params.ddEditedData = true;
            }
            this.edit.params = extend({
                dataSource: this.dataSource,
                query: new Query(), fields: { value: this.foreignKeyField || this.field, text: this.foreignKeyValue }
            }, this.edit.params);
        }
        if (this.sortComparer) {
            var a_1 = this.sortComparer;
            this.sortComparer = function (x, y, xObj, yObj) {
                if (typeof a_1 === 'string') {
                    a_1 = getObject(a_1, window);
                }
                if (_this.sortDirection === 'Descending') {
                    var z = x;
                    x = y;
                    y = z;
                    var obj = xObj;
                    xObj = yObj;
                    yObj = obj;
                }
                return a_1(x, y, xObj, yObj);
            };
        }
        if (!this.sortComparer && this.isForeignColumn()) {
            this.sortComparer = function (x, y) {
                x = getObject(_this.foreignKeyValue, getForeignData(_this, {}, x)[0]);
                y = getObject(_this.foreignKeyValue, getForeignData(_this, {}, y)[0]);
                return _this.sortDirection === 'Descending' ? DataUtil.fnDescending(x, y) : DataUtil.fnAscending(x, y);
            };
        }
    }
    /**
     * @returns {string} returns the sort direction
     * @hidden */
    Column.prototype.getSortDirection = function () {
        return this.sortDirection;
    };
    /**
     * @param {string} direction - specifies the direction
     * @returns {void}
     * @hidden
     */
    Column.prototype.setSortDirection = function (direction) {
        this.sortDirection = direction;
    };
    /**
     * @returns {freezeTable} returns the FreezeTable
     * @hidden */
    Column.prototype.getFreezeTableName = function () {
        return this.freezeTable;
    };
    /**
     * @param {Column} column - specifies the column
     * @returns {void}
     * @hidden
     */
    Column.prototype.setProperties = function (column) {
        //Angular two way binding
        var keys = Object.keys(column);
        var _loop_1 = function (i) {
            if (keys[parseInt(i.toString(), 10)] === 'columns') {
                var cols_1 = column[keys[parseInt(i.toString(), 10)]];
                var _loop_2 = function (j) {
                    this_1.columns.find(function (col) {
                        return col.field === cols_1[parseInt(j.toString(), 10)]
                            .field;
                    }).setProperties(cols_1[parseInt(j.toString(), 10)]);
                };
                for (var j = 0; j < cols_1.length; j++) {
                    _loop_2(j);
                }
            }
            else {
                this_1[keys[parseInt(i.toString(), 10)]] = column[keys[parseInt(i.toString(), 10)]];
            }
            //Refresh the react columnTemplates on state change
            if (this_1.parent && this_1.parent.isReact) {
                if (keys[parseInt(i.toString(), 10)] === 'template') {
                    this_1.templateFn = templateCompiler(column[keys[parseInt(i.toString(), 10)]]);
                    this_1.parent.refreshReactColumnTemplateByUid(this_1.uid, true);
                }
                else if (keys[parseInt(i.toString(), 10)] === 'headerTemplate') {
                    this_1.headerTemplateFn = templateCompiler(column[keys[parseInt(i.toString(), 10)]]);
                    this_1.parent.refreshReactHeaderTemplateByUid(this_1.uid);
                }
                else if (keys[parseInt(i.toString(), 10)] === 'editTemplate') {
                    this_1.editTemplateFn = templateCompiler(column[keys[parseInt(i.toString(), 10)]]);
                }
            }
        };
        var this_1 = this;
        for (var i = 0; i < keys.length; i++) {
            _loop_1(i);
        }
    };
    /**
     * @returns {boolean} returns true for foreign column
     * @hidden
     * It defines the column is foreign key column or not.
     */
    Column.prototype.isForeignColumn = function () {
        return !!(this.dataSource && this.foreignKeyValue);
    };
    /**
     * @returns {Function} returns the function
     * @hidden
     */
    Column.prototype.getFormatter = function () {
        return this.formatFn;
    };
    /**
     * @param {Function} value - specifies the value
     * @returns {void}
     * @hidden
     */
    Column.prototype.setFormatter = function (value) {
        this.formatFn = value;
    };
    /**
     * @returns {Function} returns the function
     * @hidden */
    Column.prototype.getParser = function () {
        return this.parserFn;
    };
    /**
     * @param {Function} value - specifies the value
     * @returns {void}
     * @hidden
     */
    Column.prototype.setParser = function (value) {
        this.parserFn = value;
    };
    /**
     * @returns {Function} returns the function
     * @hidden */
    Column.prototype.getColumnTemplate = function () {
        return this.templateFn;
    };
    /**
     * @returns {Function} returns the function
     * @hidden */
    Column.prototype.getHeaderTemplate = function () {
        return this.headerTemplateFn;
    };
    /**
     * @returns {Function} returns the function
     * @hidden */
    Column.prototype.getFilterItemTemplate = function () {
        return this.fltrTemplateFn;
    };
    /**
     * @returns {string} returns the string
     * @hidden */
    Column.prototype.getDomSetter = function () {
        return this.disableHtmlEncode ? 'textContent' : 'innerHTML';
    };
    return Column;
}());
export { Column };
/**
 * Define options for custom command buttons.
 */
var CommandColumnModel = /** @class */ (function () {
    function CommandColumnModel() {
    }
    __decorate([
        Property()
    ], CommandColumnModel.prototype, "title", void 0);
    __decorate([
        Property()
    ], CommandColumnModel.prototype, "type", void 0);
    __decorate([
        Property()
    ], CommandColumnModel.prototype, "buttonOption", void 0);
    return CommandColumnModel;
}());
export { CommandColumnModel };
/**
 * Defines Grid column
 */
var GridColumn = /** @class */ (function (_super) {
    __extends(GridColumn, _super);
    function GridColumn() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(null)
    ], GridColumn.prototype, "columns", void 0);
    return GridColumn;
}(Column));
export { GridColumn };
/**
 * Defines stacked grid column
 */
var StackedColumn = /** @class */ (function (_super) {
    __extends(StackedColumn, _super);
    function StackedColumn() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return StackedColumn;
}(GridColumn));
export { StackedColumn };
