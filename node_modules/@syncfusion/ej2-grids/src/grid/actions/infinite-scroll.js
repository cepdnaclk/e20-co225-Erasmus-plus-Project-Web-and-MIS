import { isNullOrUndefined, remove, extend } from '@syncfusion/ej2-base';
import { RowModelGenerator } from '../services/row-model-generator';
import { RowRenderer } from '../renderer/row-renderer';
import * as events from '../base/constant';
import { getScrollBarWidth, getEditedDataIndex, resetRowIndex, setRowElements, getRowIndexFromElement, getGroupKeysAndFields, getPredicates, generateExpandPredicates } from '../base/util';
import * as literals from '../base/string-literals';
/**
 * Infinite Scrolling class
 *
 * @hidden
 */
var InfiniteScroll = /** @class */ (function () {
    /**
     * Constructor for the Grid infinite scrolling.
     *
     * @param {IGrid} parent - specifies the IGrid
     * @param {ServiceLocator} serviceLocator - specifies the ServiceLocator
     * @hidden
     */
    function InfiniteScroll(parent, serviceLocator) {
        this.infiniteCache = {};
        this.infiniteCurrentViewData = {};
        this.isDownScroll = false;
        this.isUpScroll = false;
        this.isScroll = true;
        this.enableContinuousScroll = false;
        this.initialRender = true;
        this.isRemove = false;
        this.isInitialCollapse = false;
        this.prevScrollTop = 0;
        this.actions = ['filtering', 'searching', 'grouping', 'ungrouping', 'reorder', 'sorting', 'refresh'];
        this.keys = [literals.downArrow, literals.upArrow, literals.enter, literals.shiftEnter];
        this.rowTop = 0;
        this.virtualInfiniteData = {};
        this.isCancel = false;
        this.emptyRowData = {};
        this.isNormaledit = false;
        this.isInfiniteScroll = false;
        this.isLastPage = false;
        this.isInitialRender = true;
        this.isFocusScroll = false;
        this.isGroupCollapse = false;
        this.parent = parent;
        this.serviceLocator = serviceLocator;
        this.isNormaledit = this.parent.editSettings.mode === 'Normal';
        this.addEventListener();
        this.widthService = serviceLocator.getService('widthService');
        this.rowModelGenerator = new RowModelGenerator(this.parent);
    }
    InfiniteScroll.prototype.getModuleName = function () {
        return 'infiniteScroll';
    };
    /**
     * @returns {void}
     * @hidden
     */
    InfiniteScroll.prototype.addEventListener = function () {
        this.parent.on(events.dataReady, this.onDataReady, this);
        this.parent.on(events.dataSourceModified, this.dataSourceModified, this);
        this.parent.on(events.infinitePageQuery, this.infinitePageQuery, this);
        this.parent.on(events.infiniteScrollHandler, this.infiniteScrollHandler, this);
        this.parent.on(events.beforeCellFocused, this.infiniteCellFocus, this);
        this.parent.on(events.appendInfiniteContent, this.appendInfiniteRows, this);
        this.parent.on(events.removeInfiniteRows, this.removeInfiniteCacheRows, this);
        this.parent.on(events.resetInfiniteBlocks, this.resetInfiniteBlocks, this);
        this.parent.on(events.setInfiniteCache, this.setCache, this);
        this.parent.on(events.initialCollapse, this.ensureIntialCollapse, this);
        this.parent.on(events.keyPressed, this.infiniteCellFocus, this);
        this.parent.on(events.infiniteShowHide, this.setDisplayNone, this);
        this.parent.on(events.virtualScrollEditActionBegin, this.editActionBegin, this);
        this.parent.on(events.getVirtualData, this.getVirtualInfiniteData, this);
        this.parent.on(events.editReset, this.resetInfiniteEdit, this);
        this.parent.on(events.virtualScrollEditSuccess, this.infiniteEditSuccess, this);
        this.parent.on(events.refreshVirtualCache, this.refreshInfiniteCache, this);
        this.parent.on(events.refreshInfiniteEditrowindex, this.refreshInfiniteEditrowindex, this);
        this.parent.on(events.infiniteEditHandler, this.infiniteEditHandler, this);
        this.parent.on(events.virtualScrollAddActionBegin, this.infiniteAddActionBegin, this);
        this.parent.on(events.modelChanged, this.modelChanged, this);
        this.parent.on(events.refreshInfiniteCurrentViewData, this.refreshInfiniteCurrentViewData, this);
        this.parent.on(events.destroy, this.destroy, this);
        this.parent.on(events.contentReady, this.selectNewRow, this);
        this.parent.on(events.captionActionComplete, this.captionActionComplete, this);
        this.parent.on(events.setVirtualPageQuery, this.setGroupCollapsePageQuery, this);
        this.parent.on(events.infiniteScrollComplete, this.onActionComplete, this);
        this.actionBeginFunction = this.actionBegin.bind(this);
        this.actionCompleteFunction = this.actionComplete.bind(this);
        this.dataBoundFunction = this.dataBound.bind(this);
        this.parent.addEventListener(events.actionBegin, this.actionBeginFunction);
        this.parent.addEventListener(events.actionComplete, this.actionCompleteFunction);
        this.parent.addEventListener(events.dataBound, this.dataBoundFunction);
    };
    /**
     * @returns {void}
     * @hidden
     */
    InfiniteScroll.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off(events.dataReady, this.onDataReady);
        this.parent.off(events.dataSourceModified, this.dataSourceModified);
        this.parent.off(events.infinitePageQuery, this.infinitePageQuery);
        this.parent.off(events.infiniteScrollHandler, this.infiniteScrollHandler);
        this.parent.off(events.beforeCellFocused, this.infiniteCellFocus);
        this.parent.off(events.appendInfiniteContent, this.appendInfiniteRows);
        this.parent.off(events.removeInfiniteRows, this.removeInfiniteCacheRows);
        this.parent.off(events.resetInfiniteBlocks, this.resetInfiniteBlocks);
        this.parent.off(events.setInfiniteCache, this.setCache);
        this.parent.off(events.initialCollapse, this.ensureIntialCollapse);
        this.parent.off(events.keyPressed, this.infiniteCellFocus);
        this.parent.off(events.infiniteShowHide, this.setDisplayNone);
        this.parent.off(events.virtualScrollEditActionBegin, this.editActionBegin);
        this.parent.off(events.getVirtualData, this.getVirtualInfiniteData);
        this.parent.off(events.editReset, this.resetInfiniteEdit);
        this.parent.off(events.virtualScrollEditSuccess, this.infiniteEditSuccess);
        this.parent.off(events.refreshVirtualCache, this.refreshInfiniteCache);
        this.parent.on(events.refreshInfiniteEditrowindex, this.refreshInfiniteEditrowindex);
        this.parent.off(events.infiniteEditHandler, this.infiniteEditHandler);
        this.parent.off(events.virtualScrollAddActionBegin, this.infiniteAddActionBegin);
        this.parent.off(events.modelChanged, this.modelChanged);
        this.parent.off(events.refreshInfiniteCurrentViewData, this.refreshInfiniteCurrentViewData);
        this.parent.off(events.destroy, this.destroy);
        this.parent.off(events.contentReady, this.selectNewRow);
        this.parent.off(events.captionActionComplete, this.captionActionComplete);
        this.parent.off(events.setVirtualPageQuery, this.setGroupCollapsePageQuery);
        this.parent.off(events.infiniteScrollComplete, this.onActionComplete);
        this.parent.removeEventListener(events.actionBegin, this.actionBeginFunction);
        this.parent.removeEventListener(events.actionComplete, this.actionCompleteFunction);
        this.parent.removeEventListener(events.dataBound, this.dataBoundFunction);
    };
    InfiniteScroll.prototype.dataBound = function () {
        if (this.groupCaptionAction === 'collapse') {
            this.groupCaptionAction = 'refresh';
            this.makeGroupCollapseRequest();
        }
        else if (this.groupCaptionAction === 'refresh') {
            this.parent.hideSpinner();
            this.groupCaptionAction = this.empty;
        }
    };
    InfiniteScroll.prototype.setGroupCollapsePageQuery = function (args) {
        var gObj = this.parent;
        if (!gObj.infiniteScrollSettings.enableCache && this.isGroupCollapse) {
            args.skipPage = true;
            this.isGroupCollapse = false;
            if (this.groupCaptionAction === 'collapse') {
                var captionRow = gObj.getRowObjectFromUID(this.parentCapUid);
                var rowObjs = gObj.getRowsObject();
                var childCount = 0;
                for (var i = rowObjs.length - 1; i >= 0; i--) {
                    if (rowObjs[parseInt(i.toString(), 10)].indent === captionRow.indent) {
                        break;
                    }
                    if (rowObjs[parseInt(i.toString(), 10)].isDataRow) {
                        childCount++;
                    }
                }
                var key = getGroupKeysAndFields(rowObjs.indexOf(captionRow), rowObjs);
                var pred = generateExpandPredicates(key.fields, key.keys, this);
                var predicateList = getPredicates(pred);
                pred = predicateList[predicateList.length - 1];
                for (var i = predicateList.length - 2; i >= 0; i--) {
                    pred = pred.and(predicateList[parseInt(i.toString(), 10)]);
                }
                args.query.where(pred);
                args.query.skip(childCount);
                this.parentCapUid = this.empty;
            }
            else {
                var rows = gObj.getRows();
                var size = gObj.pageSettings.pageSize;
                var skip = getRowIndexFromElement(rows[rows.length - 1]) + 1;
                var additionalCnt = ((skip - (skip % size)) + size) - skip;
                if ((skip % size) === 0) {
                    additionalCnt = 0;
                }
                args.query.skip(skip);
                args.query.take((gObj.infiniteScrollSettings.initialBlocks * gObj.pageSettings.pageSize) + additionalCnt);
            }
        }
    };
    InfiniteScroll.prototype.captionActionComplete = function (args) {
        var gObj = this.parent;
        if (!gObj.infiniteScrollSettings.enableCache && args.isCollapse) {
            var contetRect = gObj.getContent().firstElementChild.getBoundingClientRect();
            var tableReact = gObj.contentModule.getTable().getBoundingClientRect();
            if (Math.round(tableReact.bottom - gObj.getRowHeight()) <= Math.round(contetRect.bottom)) {
                this.parentCapUid = args.parentUid;
                this.groupCaptionAction = 'collapse';
                gObj.showSpinner();
                var caption = gObj.getRowObjectFromUID(args.parentUid);
                var childCount = this.getCaptionChildCount(caption);
                if (!childCount) {
                    this.groupCaptionAction = 'refresh';
                    this.makeGroupCollapseRequest();
                }
                else {
                    this.makeGroupCollapseRequest(args.parentUid);
                }
            }
        }
    };
    InfiniteScroll.prototype.makeGroupCollapseRequest = function (parentUid) {
        var gObj = this.parent;
        var captionRows = [].slice.call(gObj.getContentTable().querySelectorAll('tr'));
        var rows = gObj.groupSettings.enableLazyLoading ? captionRows : gObj.getRows();
        var index = !gObj.groupSettings.enableLazyLoading ? getRowIndexFromElement(rows[rows.length - 1]) :
            gObj.contentModule['visibleRows'].length - 1;
        var prevPage = this.parent.pageSettings.currentPage;
        var nextPage = Math.ceil(index / this.parent.pageSettings.pageSize) + 1;
        if ((prevPage >= this.maxPage) || (nextPage > this.maxPage)) {
            gObj.hideSpinner();
            return;
        }
        this.parent.pageSettings.currentPage = nextPage;
        var scrollArg = {
            requestType: 'infiniteScroll',
            currentPage: this.parent.pageSettings.currentPage,
            prevPage: prevPage,
            startIndex: index + 1,
            direction: 'down',
            isCaptionCollapse: true,
            parentUid: parentUid
        };
        this.isGroupCollapse = true;
        this.parent.notify('model-changed', scrollArg);
    };
    InfiniteScroll.prototype.getCaptionChildCount = function (caption) {
        var rowObj = this.parent.getRowsObject();
        var index = rowObj.indexOf(caption);
        var make = false;
        for (var i = index; i < rowObj.length; i++) {
            if ((rowObj[parseInt(i.toString(), 10)].indent === caption.indent || rowObj[parseInt(i.toString(), 10)].indent < caption.indent)
                && rowObj[parseInt(i.toString(), 10)].data.key !== caption.data.key) {
                break;
            }
            if (rowObj[parseInt(i.toString(), 10)].isCaptionRow && !this.childCheck(rowObj, rowObj[parseInt(i.toString(), 10)], i)) {
                make = true;
                break;
            }
        }
        return make;
    };
    InfiniteScroll.prototype.childCheck = function (rowObj, row, index) {
        var childCount = 0;
        for (var i = index + 1; i < rowObj.length; i++) {
            if (rowObj[parseInt(i.toString(), 10)].indent === row.indent) {
                break;
            }
            if (rowObj[parseInt(i.toString(), 10)].indent === (row.indent + 1)
                && rowObj[parseInt(i.toString(), 10)].parentUid === row.uid) {
                childCount++;
            }
        }
        return row.data.count === childCount;
    };
    InfiniteScroll.prototype.updateCurrentViewData = function () {
        var gObj = this.parent;
        if (gObj.groupSettings.columns.length) {
            return;
        }
        var keys = Object.keys(this.infiniteCurrentViewData);
        gObj.currentViewData = [];
        var page = gObj.pageSettings.currentPage;
        var isCache = gObj.infiniteScrollSettings.enableCache;
        var blocks = gObj.infiniteScrollSettings.maxBlocks;
        var isMiddlePage = isCache && (page > blocks || (this.isUpScroll && page > 1));
        var start = isMiddlePage ? this.isUpScroll ? page : (page - blocks) + 1 : 1;
        var end = isMiddlePage ? (start + blocks) - 1 : isCache ? blocks : keys.length;
        for (var i = start; i <= end; i++) {
            if (this.infiniteCurrentViewData[parseInt(i.toString(), 10)]) {
                gObj.currentViewData = gObj.currentViewData.concat(this.infiniteCurrentViewData[parseInt(i.toString(), 10)]);
            }
        }
    };
    InfiniteScroll.prototype.refreshInfiniteCurrentViewData = function (e) {
        if (e.args.action === 'add' && e.args.requestType === 'save') {
            this.parent.pageSettings.currentPage = Math.ceil(e.args['index'] / this.parent.pageSettings.pageSize) ?
                Math.ceil(e.args['index'] / this.parent.pageSettings.pageSize) : 1;
        }
        var page = this.parent.pageSettings.currentPage;
        var size = this.parent.pageSettings.pageSize;
        var blocks = this.parent.infiniteScrollSettings.initialBlocks;
        var keys = Object.keys(this.infiniteCurrentViewData);
        var cache = this.parent.infiniteScrollSettings.enableCache;
        if (!this.parent.groupSettings.columns.length) {
            var isAdd = e.args.requestType === 'save' && !(this.parent.sortSettings.columns.length
                || this.parent.filterSettings.columns.length || this.parent.groupSettings.columns.length
                || this.parent.searchSettings.key);
            var isDelete = e.args.requestType === 'delete';
            if (!cache && (isAdd || isDelete)) {
                if (isAdd) {
                    var indexCount = 0;
                    for (var i = 1; i <= keys.length; i++) {
                        indexCount += this.infiniteCurrentViewData[parseInt(i.toString(), 10)].length - 1;
                        if (e.args.index <= indexCount) {
                            this.resetCurrentViewData(i);
                            this.infiniteCurrentViewData[parseInt(i.toString(), 10)]
                                .splice(e.args.index, 0, e.args.data);
                            break;
                        }
                    }
                }
                else {
                    this.infiniteCurrentViewData[keys[keys.length - 1]].push(e.data[0]);
                }
            }
            else {
                if (blocks > 1 && e.data.length === (blocks * size)) {
                    this.setInitialCache(e.data.slice(), {}, cache && e.args.requestType === 'delete', true);
                }
                else {
                    this.infiniteCurrentViewData[parseInt(page.toString(), 10)] = e.data.slice();
                }
            }
        }
    };
    InfiniteScroll.prototype.resetCurrentViewData = function (startIndex) {
        var keys = Object.keys(this.infiniteCurrentViewData);
        for (var i = startIndex; i <= keys.length; i++) {
            var lastViewData = this.infiniteCurrentViewData[parseInt(i.toString(), 10)][this
                .infiniteCurrentViewData[parseInt(i.toString(), 10)].length - 1];
            if (this.infiniteCurrentViewData[i + 1]) {
                this.infiniteCurrentViewData[i + 1].splice(0, 0, lastViewData);
            }
            this.infiniteCurrentViewData[parseInt(i.toString(), 10)].pop();
        }
    };
    InfiniteScroll.prototype.modelChanged = function (args) {
        var rows = this.parent.getRows();
        if (args.requestType === 'save' && args.index && args.data) {
            this.addRowIndex = args.index;
        }
        if (rows && rows.length && args.requestType !== 'infiniteScroll' && (args.requestType === 'delete' || this.requestType === 'add')) {
            this.firstIndex = getRowIndexFromElement(rows[0]);
            this.firstBlock = Math.ceil((this.firstIndex + 1) / this.parent.pageSettings.pageSize);
            this.lastIndex = getRowIndexFromElement(rows[rows.length - 1]);
            if (args.requestType === 'delete') {
                var rowObj = this.parent.getRowsObject();
                args.startIndex = this.parent.infiniteScrollSettings.enableCache
                    ? (this.firstBlock - 1) * this.parent.pageSettings.pageSize : rowObj[rowObj.length - 1].index;
            }
            else {
                args.startIndex = this.firstIndex;
            }
            if (!this.parent.infiniteScrollSettings.enableCache
                && this.parent.pageSettings.currentPage === this.maxPage && args.requestType === 'delete') {
                this.isLastPage = true;
                this.lastIndex = this.lastIndex - 1;
            }
        }
    };
    InfiniteScroll.prototype.infiniteAddActionBegin = function (args) {
        if (this.isNormaledit) {
            this.isAdd = true;
            if (this.parent.infiniteScrollSettings.enableCache) {
                if (!Object.keys(this.emptyRowData).length) {
                    this.createEmptyRowdata();
                }
                if (this.parent.pageSettings.currentPage > 1) {
                    args.startEdit = false;
                    this.resetInfiniteBlocks({}, true);
                    this.makeRequest({ currentPage: 1 });
                }
            }
        }
    };
    InfiniteScroll.prototype.infiniteEditHandler = function (args) {
        if (!this.parent.infiniteScrollSettings.enableCache && (args.e.requestType === 'delete'
            || (args.e.requestType === 'save' && this.requestType === 'add'))) {
            var rowElms = this.parent.getRows();
            var rows = this.parent.getRowsObject();
            if (this.ensureRowAvailability(rows, args.result[0])) {
                if (rowElms.length && !(this.addRowIndex && this.addRowIndex >= rowElms.length)) {
                    this.resetRowIndex(rows, args.e, rowElms, this.requestType === 'add', true);
                }
                if (!this.isLastPage) {
                    this.createRow(rows, args);
                }
                else {
                    this.isLastPage = false;
                    this.parent.pageSettings.currentPage = this.maxPage;
                    if (this.parent.selectionModule.index < this.parent.frozenRows) {
                        remove(rowElms[this.parent.frozenRows - 1]);
                        this.createRow([rows[this.parent.frozenRows - 1]], args, false, true);
                        setRowElements(this.parent);
                    }
                }
            }
            this.parent.hideSpinner();
            this.parent.notify(events.refreshInfinitePersistSelection, {});
            if (this.requestType === 'delete') {
                this.parent.notify(events.deleteComplete, args.e);
            }
            else {
                this.parent.notify(events.saveComplete, args.e);
            }
        }
        this.parent.notify(events.freezeRender, { case: 'refreshHeight' });
    };
    InfiniteScroll.prototype.createRow = function (rows, args, isMovable, isFrozenRows, isFrozenRight) {
        var row = !isFrozenRows ? this.generateRows(args.result, args.e) : rows;
        var rowRenderer = new RowRenderer(this.serviceLocator, null, this.parent);
        this.parent.removeMaskRow();
        if (args.e.requestType === 'save' && args.e.index && args.e.data) {
            row[0].index = this.addRowIndex;
            this.addRowIndex = null;
            if (row[0].index >= rows.length) {
                return;
            }
        }
        var tbody;
        tbody = this.parent.getContent().querySelector(literals.tbody);
        if (this.parent.frozenRows) {
            tbody = isFrozenRows && this.requestType !== 'add' || !isFrozenRows && this.requestType === 'add'
                ? this.parent.getHeaderContent().querySelector(literals.tbody) : tbody;
        }
        var notifyArgs = {
            rows: rows, cancel: false, args: args, isMovable: isMovable,
            isFrozenRows: isFrozenRows, isFrozenRight: isFrozenRows, row: row
        };
        this.parent.notify(events.infiniteCrudCancel, notifyArgs);
        if (!notifyArgs.cancel) {
            for (var i = row.length - 1; i >= 0; i--) {
                if (this.requestType === 'delete') {
                    tbody.appendChild(rowRenderer.render(row[parseInt(i.toString(), 10)], this.parent.getColumns()));
                }
                else {
                    tbody.insertBefore(rowRenderer.render(row[parseInt(i.toString(), 10)], this.parent.getColumns()), tbody.rows[(args.e.index)]);
                }
            }
        }
        if (!isFrozenRows && this.parent.frozenRows
            && (this.parent.selectionModule.index < this.parent.frozenRows || this.requestType === 'add')) {
            var rowElems = this.parent.getRows();
            var index = (isMovable || isFrozenRight) && this.requestType === 'add'
                ? this.parent.frozenRows : this.parent.frozenRows - 1;
            remove(rowElems[parseInt(index.toString(), 10)]);
            this.createRow([rows[this.parent.frozenRows - 1]], args, false, true, false);
        }
        if (!this.parent.infiniteScrollSettings.enableCache && !isFrozenRows) {
            setRowElements(this.parent);
            this.parent.contentModule.visibleRows = this.requestType === 'add'
                ? row.concat(rows) : rows.concat(row);
        }
    };
    InfiniteScroll.prototype.ensureRowAvailability = function (rows, data) {
        var resume = true;
        if (this.parent.frozenRows && !this.parent.infiniteScrollSettings.enableCache
            && this.parent.sortSettings.columns && this.requestType === 'add') {
            var key = this.parent.getPrimaryKeyFieldNames()[0];
            for (var i = 0; i < rows.length; i++) {
                if (rows[parseInt(i.toString(), 10)].data["" + key] === data["" + key]) {
                    resume = false;
                    break;
                }
            }
        }
        return resume;
    };
    InfiniteScroll.prototype.generateRows = function (data, args) {
        return this.rowModelGenerator.generateRows(data, args);
    };
    InfiniteScroll.prototype.resetRowIndex = function (rows, args, rowElms, isAdd, isFrozen) {
        var _this = this;
        var keyField = this.parent.getPrimaryKeyFieldNames()[0];
        var isRemove = !(rowElms.length % this.parent.pageSettings.pageSize);
        if (isAdd) {
            if (isRemove) {
                if (isFrozen && !this.parent.groupSettings.columns.length) {
                    this.swapCurrentViewData(1, true);
                }
                remove(rowElms[rows.length - 1]);
                rowElms.splice(rows.length - 1, 1);
                rows.splice(rows.length - 1, 1);
            }
        }
        else {
            rows.filter(function (e, index) {
                if (e.data["" + keyField] === args.data[0]["" + keyField]) {
                    if (isFrozen && !_this.parent.groupSettings.columns.length) {
                        var page = Math.ceil((index + 1) / _this.parent.pageSettings.pageSize);
                        _this.resetInfiniteCurrentViewData(page, index);
                    }
                    rows.splice(index, 1);
                    var rowElement = _this.parent.getRowElementByUID(e.uid);
                    if (rowElement) {
                        var rowElementIndex = rowElms.indexOf(rowElement);
                        remove(rowElement);
                        rowElms.splice(rowElementIndex, 1);
                    }
                }
            });
        }
        var startIndex = isAdd ? this.addRowIndex ? this.addRowIndex + 1 : 1 : 0;
        resetRowIndex(this.parent, rows, rowElms, startIndex, this.addRowIndex ? this.addRowIndex : 0);
    };
    InfiniteScroll.prototype.resetInfiniteCurrentViewData = function (page, index) {
        index = index - ((page - 1) * this.parent.pageSettings.pageSize);
        this.infiniteCurrentViewData[parseInt(page.toString(), 10)].splice(index, 1);
        this.swapCurrentViewData(page, false);
    };
    InfiniteScroll.prototype.swapCurrentViewData = function (page, isAdd) {
        var keys = Object.keys(this.infiniteCurrentViewData);
        var end = isAdd ? keys.length + 1 : keys.length;
        for (var i = page; i < end; i++) {
            if (this.infiniteCurrentViewData[i + 1]) {
                var pageIndex = isAdd ? i : i + 1;
                var index = isAdd ? this.infiniteCurrentViewData[parseInt(i.toString(), 10)].length - 1 : 0;
                var data = this.infiniteCurrentViewData[parseInt(pageIndex.toString(), 10)].splice(index, 1);
                if (isAdd) {
                    this.infiniteCurrentViewData[i + 1] = data.concat(this.infiniteCurrentViewData[i + 1]);
                    if ((i + 1) === end - 1) {
                        this.infiniteCurrentViewData[i + 1].splice(this.infiniteCurrentViewData[i + 1].length - 1, 1);
                    }
                }
                else {
                    this.infiniteCurrentViewData[parseInt(i.toString(), 10)].push(data[0]);
                }
            }
        }
        this.updateCurrentViewData();
    };
    InfiniteScroll.prototype.setDisplayNone = function (args) {
        if (this.parent.infiniteScrollSettings.enableCache) {
            var keys = Object.keys(this.infiniteCache);
            for (var i = 1; i <= keys.length; i++) {
                var cache = this.infiniteCache[parseInt(i.toString(), 10)];
                cache.filter(function (e) {
                    e.cells[args.index].visible = args.visible === '';
                });
            }
            this.resetContentModuleCache(this.infiniteCache);
        }
    };
    InfiniteScroll.prototype.refreshInfiniteCache = function (args) {
        this.getEditedRowObject().data = args.data;
    };
    InfiniteScroll.prototype.refreshInfiniteCacheRowVisibleLength = function (args, currentPage) {
        var cPageRowArray = args[parseInt(currentPage.toString(), 10)];
        if (this.parent.enableInfiniteScrolling && this.parent.infiniteScrollSettings.enableCache) {
            var length_1 = 0;
            var vRowLen = 0;
            var hRowLen = 0;
            for (var i = 0; i < cPageRowArray.length; i++) {
                if (cPageRowArray[parseInt(i.toString(), 10)].visible
                    || isNullOrUndefined(cPageRowArray[parseInt(i.toString(), 10)].visible)) {
                    vRowLen++;
                }
                else {
                    hRowLen++;
                }
            }
            if (hRowLen > vRowLen) {
                length_1 = hRowLen - vRowLen;
                if (length_1 > vRowLen) {
                    length_1 = vRowLen;
                }
            }
            else {
                length_1 = vRowLen - hRowLen;
                if (length_1 > hRowLen) {
                    length_1 = hRowLen;
                }
            }
            if (length_1 === 0) {
                length_1 = 1;
            }
            return length_1;
        }
        else {
            return cPageRowArray.length;
        }
    };
    InfiniteScroll.prototype.refreshInfiniteEditrowindex = function (args) {
        this.editRowIndex = args.index;
    };
    InfiniteScroll.prototype.getEditedRowObject = function () {
        var rowObjects = this.parent.getRowsObject();
        var editedrow;
        for (var i = 0; i < rowObjects.length; i++) {
            if (rowObjects[parseInt(i.toString(), 10)].index === this.editRowIndex) {
                editedrow = rowObjects[parseInt(i.toString(), 10)];
            }
        }
        return editedrow;
    };
    InfiniteScroll.prototype.infiniteEditSuccess = function (args) {
        if (this.isNormaledit) {
            if (!this.isAdd && args.data) {
                this.updateCurrentViewRecords(args.data);
            }
            this.isAdd = false || this.parent.editSettings.showAddNewRow;
        }
    };
    InfiniteScroll.prototype.updateCurrentViewRecords = function (data) {
        var index = getEditedDataIndex(this.parent, data);
        if (!isNullOrUndefined(index)) {
            this.parent.getCurrentViewRecords()[parseInt(index.toString(), 10)] = data;
        }
    };
    InfiniteScroll.prototype.actionBegin = function (args) {
        if (args.requestType === 'add' || args.requestType === 'delete') {
            this.requestType = args.requestType;
        }
        else if (args.action === 'add' && args.requestType === 'save') {
            this.requestType = args.action;
        }
        if (this.parent.isFrozenGrid() && !args.cancel && args.requestType === 'searching'
            || args.requestType === 'sorting' || args.requestType === 'filtering') {
            this.isInitialRender = true;
        }
    };
    InfiniteScroll.prototype.actionComplete = function (args) {
        if (args.requestType === 'delete' || args.requestType === 'save' || args.requestType === 'cancel') {
            this.requestType = this.empty;
            this.isCancel = args.requestType === 'cancel' || args.requestType === 'save';
            this.isAdd = this.isEdit = false || this.parent.editSettings.showAddNewRow;
            if (this.isNormaledit) {
                this.editRowIndex = this.empty;
                this.virtualInfiniteData = {};
                this.parent.editModule.previousVirtualData = {};
            }
        }
    };
    /**
     * The function used to trigger onActionComplete
     *
     * @param {NotifyArgs} e - specifies the NotifyArgs
     * @returns {void}
     * @hidden
     */
    InfiniteScroll.prototype.onActionComplete = function (e) {
        var args = { type: events.actionComplete };
        this.parent.trigger(events.actionComplete, extend(e, args));
    };
    InfiniteScroll.prototype.resetInfiniteEdit = function () {
        if (this.parent.enableInfiniteScrolling && this.isNormaledit) {
            if ((this.parent.editSettings.allowEditing && this.isEdit) || (this.parent.editSettings.allowAdding && this.isAdd)) {
                this.parent.isEdit = true;
            }
        }
    };
    InfiniteScroll.prototype.getVirtualInfiniteData = function (data) {
        this.getVirtualInfiniteEditedData();
        data.virtualData = this.parent.enableColumnVirtualization && !this.parent.infiniteScrollSettings.enableCache ? data.virtualData
            : this.virtualInfiniteData;
        data.isAdd = this.isAdd;
        data.isCancel = this.isCancel;
    };
    InfiniteScroll.prototype.editActionBegin = function (e) {
        this.isEdit = true;
        this.editRowIndex = e.index;
        var rowObject = extend({}, this.getEditedRowObject().data);
        e.data = Object.keys(this.virtualInfiniteData).length ? this.virtualInfiniteData : rowObject;
    };
    InfiniteScroll.prototype.dataSourceModified = function () {
        this.resetInfiniteBlocks({ requestType: this.empty }, true);
    };
    InfiniteScroll.prototype.onDataReady = function (e) {
        if (!isNullOrUndefined(e.count) && e.requestType !== 'infiniteScroll') {
            this.maxPage = Math.ceil(e.count / this.parent.pageSettings.pageSize);
        }
    };
    InfiniteScroll.prototype.ensureIntialCollapse = function (isExpand) {
        this.isInitialCollapse = !isExpand;
    };
    InfiniteScroll.prototype.infiniteScrollHandler = function (e) {
        this.restoreInfiniteEdit();
        this.restoreInfiniteAdd();
        var targetEle = e.target;
        var isInfinite = targetEle.classList.contains(literals.content);
        if (isInfinite && this.parent.enableInfiniteScrolling && !e.isLeft) {
            var scrollEle = this.parent.getContent().firstElementChild;
            var captionRows = [].slice.call(this.parent.getContentTable().querySelectorAll('tr'));
            this.prevScrollTop = scrollEle.scrollTop;
            var rows = this.parent.groupSettings.enableLazyLoading ? captionRows : this.parent.getRows();
            if (!rows.length) {
                return;
            }
            var index = getRowIndexFromElement(rows[rows.length - 1]) + 1;
            var prevPage = this.parent.pageSettings.currentPage;
            var args = void 0;
            var offset = targetEle.scrollHeight - targetEle.scrollTop;
            var round = Math.round(targetEle.scrollHeight - targetEle.scrollTop);
            var floor = offset < targetEle.clientHeight ? Math.ceil(offset) : Math.floor(offset);
            if (floor > targetEle.clientHeight) {
                floor = floor - 1;
            }
            var isBottom = (floor === targetEle.clientHeight || round === targetEle.clientHeight);
            if (!isNullOrUndefined(this.groupCaptionAction)) {
                return;
            }
            if (this.isScroll && isBottom && (this.parent.pageSettings.currentPage <= this.maxPage - 1 || this.enableContinuousScroll)) {
                if (this.parent.infiniteScrollSettings.enableCache) {
                    this.isUpScroll = false;
                    this.isDownScroll = true;
                }
                var rows_1 = [].slice.call(scrollEle.querySelectorAll('.e-row:not(.e-addedrow)'));
                var row = rows_1[rows_1.length - 1];
                var rowIndex = !(this.parent.groupSettings.enableLazyLoading && this.parent.groupSettings.columns.length)
                    ? getRowIndexFromElement(row) : this.parent.contentModule['visibleRows'].length - 1;
                this.parent.pageSettings.currentPage = Math.ceil(rowIndex / this.parent.pageSettings.pageSize) + 1;
                args = {
                    requestType: 'infiniteScroll',
                    currentPage: this.parent.pageSettings.currentPage,
                    prevPage: prevPage,
                    startIndex: index,
                    direction: 'down'
                };
                this.makeRequest(args);
            }
            if (this.isScroll && this.parent.infiniteScrollSettings.enableCache && targetEle.scrollTop === 0
                && this.parent.pageSettings.currentPage !== 1) {
                if (this.parent.infiniteScrollSettings.enableCache) {
                    this.isDownScroll = false;
                    this.isUpScroll = true;
                }
                var row = [].slice.call(scrollEle.getElementsByClassName(literals.row));
                var rowIndex = getRowIndexFromElement(row[this.parent.pageSettings.pageSize - 1]);
                var startIndex = getRowIndexFromElement(row[0]) - this.parent.pageSettings.pageSize;
                this.parent.pageSettings.currentPage = Math.ceil(rowIndex / this.parent.pageSettings.pageSize) - 1;
                if (this.parent.pageSettings.currentPage) {
                    args = {
                        requestType: 'infiniteScroll',
                        currentPage: this.parent.pageSettings.currentPage,
                        prevPage: prevPage,
                        startIndex: startIndex,
                        direction: 'up'
                    };
                    this.makeRequest(args);
                }
            }
            if (this.parent.infiniteScrollSettings.enableCache && !this.isScroll && isNullOrUndefined(args)) {
                if (this.isDownScroll || this.isUpScroll) {
                    scrollEle.scrollTop = this.top;
                }
            }
        }
    };
    InfiniteScroll.prototype.makeRequest = function (args) {
        var _this = this;
        if (this.parent.pageSettings.currentPage !== args.prevPage) {
            var initBlocks = this.parent.infiniteScrollSettings.initialBlocks;
            if (initBlocks < this.maxPage && this.parent.pageSettings.currentPage <= this.maxPage) {
                this.isInfiniteScroll = true;
                if (isNullOrUndefined(this.infiniteCache[args.currentPage])) {
                    setTimeout(function () {
                        _this.getVirtualInfiniteEditedData();
                        _this.parent.notify('model-changed', args);
                    }, 100);
                }
                else {
                    setTimeout(function () {
                        _this.getVirtualInfiniteEditedData();
                        _this.parent.notify(events.refreshInfiniteModeBlocks, args);
                    }, 100);
                }
            }
            else {
                this.parent.pageSettings.currentPage = this.parent.groupSettings.enableLazyLoading
                    && this.parent.groupSettings.columns.length && initBlocks >= this.maxPage ? 1 : this.maxPage;
            }
        }
    };
    InfiniteScroll.prototype.infinitePageQuery = function (query) {
        if (this.initialRender) {
            this.initialRender = false;
            this.intialPageQuery(query);
        }
        else {
            if ((this.requestType === 'delete' || this.requestType === 'add')) {
                if (!this.isInfiniteScroll && !this.parent.groupSettings.enableLazyLoading) {
                    this.editPageQuery(query);
                }
                else if (this.parent.groupSettings.enableLazyLoading && !this.parent.infiniteScrollSettings.enableCache) {
                    if (this.parent.infiniteScrollSettings.initialBlocks < this.parent.pageSettings.currentPage) {
                        query.page(1, this.parent.pageSettings.pageSize * this.parent.pageSettings.currentPage);
                    }
                    else {
                        query.page(1, this.parent.pageSettings.pageSize * this.parent.infiniteScrollSettings.initialBlocks);
                    }
                }
                else {
                    query.page(this.parent.pageSettings.currentPage, this.parent.pageSettings.pageSize);
                }
            }
            else {
                query.page(this.parent.pageSettings.currentPage, this.parent.pageSettings.pageSize);
            }
        }
    };
    InfiniteScroll.prototype.editPageQuery = function (query) {
        var initialBlocks = this.parent.infiniteScrollSettings.initialBlocks;
        var isCache = this.parent.infiniteScrollSettings.enableCache;
        if (isCache) {
            this.infiniteCache = {};
            this.infiniteCurrentViewData = {};
            query.skip(this.firstIndex);
            query.take(initialBlocks * this.parent.pageSettings.pageSize);
        }
        else {
            if (this.parent.editSettings.mode === 'Dialog') {
                this.parent.clearSelection();
            }
            var index = this.requestType === 'delete' ? this.lastIndex : this.addRowIndex ? this.addRowIndex : this.firstIndex;
            query.skip(index);
            if (!isNullOrUndefined(this.parent.getDataModule().dataManager.dataSource.url) &&
                this.parent.getDataModule().dataManager.dataSource.url !== '' && (this.requestType === 'delete' ||
                this.requestType === 'add')) {
                query.take(initialBlocks * this.parent.pageSettings.pageSize);
            }
            else {
                query.take(1);
            }
        }
    };
    InfiniteScroll.prototype.intialPageQuery = function (query) {
        if (this.parent.infiniteScrollSettings.enableCache
            && this.parent.infiniteScrollSettings.initialBlocks > this.parent.infiniteScrollSettings.maxBlocks) {
            this.parent.infiniteScrollSettings.initialBlocks = this.parent.infiniteScrollSettings.maxBlocks;
        }
        var pageSize = this.parent.pageSettings.pageSize * this.parent.infiniteScrollSettings.initialBlocks;
        query.page(1, pageSize);
    };
    InfiniteScroll.prototype.scrollToLastFocusedCell = function (e) {
        var gObj = this.parent;
        var rowIdx = this.lastFocusInfo.rowIdx + (e.keyArgs.action === literals.upArrow ? -1 : 1);
        var cellIdx = this.lastFocusInfo.cellIdx;
        var row = gObj.getRowByIndex(rowIdx);
        if (!row) {
            var rowRenderer = new RowRenderer(this.serviceLocator, null, this.parent);
            var page = Math.floor(rowIdx / this.parent.pageSettings.pageSize) + 1;
            gObj.pageSettings.currentPage = page;
            var cols = gObj.getColumns();
            remove(gObj.getContent().querySelector('tbody'));
            gObj.getContent().querySelector('table').appendChild(gObj.createElement('tbody', { attrs: { 'role': 'rowgroup' } }));
            var focusRows = [];
            // eslint-disable-next-line @typescript-eslint/tslint/config
            for (var i = (page === 1 || this.maxPage === page) ? 0 : -1, k = 0; k < gObj.infiniteScrollSettings.maxBlocks; this.maxPage === page ? i-- : i++, k++) {
                var rows = this.infiniteCache[page + i];
                if (rows) {
                    focusRows = focusRows.concat(rows);
                    for (var j = 0; j < rows.length; j++) {
                        gObj.getContent().querySelector('tbody').appendChild(rowRenderer.render(rows[parseInt(j.toString(), 10)], cols));
                    }
                }
            }
            gObj.notify(events.contentReady, { rows: focusRows, args: {} });
            setRowElements(gObj);
        }
        row = gObj.getRowByIndex(rowIdx);
        var target = row.cells[parseInt(cellIdx.toString(), 10)];
        gObj.focusModule.isInfiniteScroll = true;
        gObj.focusModule.onClick({ target: target }, true);
        gObj.selectRow(rowIdx);
        target.focus();
        this.isFocusScroll = false;
        e.cancel = true;
    };
    InfiniteScroll.prototype.setLastCellFocusInfo = function (e) {
        var cell = ((e.byClick && e.clickArgs.target) || (e.byKey && e.keyArgs.target)
            || (!this.isFocusScroll && e).target);
        if (cell && cell.classList.contains('e-rowcell')) {
            var cellIdx = parseInt(cell.getAttribute('data-colindex'), 10);
            var rowIdx = parseInt(cell.parentElement.getAttribute('data-rowindex'), 10);
            this.lastFocusInfo = { rowIdx: rowIdx, cellIdx: cellIdx };
        }
    };
    InfiniteScroll.prototype.infiniteCellFocus = function (e) {
        var gObj = this.parent;
        var cache = gObj.infiniteScrollSettings.enableCache;
        if (e.byKey) {
            if (cache && this.isFocusScroll) {
                this.scrollToLastFocusedCell(e);
                return;
            }
            var cell = document.activeElement;
            var rowIndex = getRowIndexFromElement(cell.parentElement);
            this.cellIndex = parseInt(cell.getAttribute(literals.dataColIndex), 10);
            var content = gObj.getContent().firstElementChild;
            var totalRowsCount = (this.maxPage * gObj.pageSettings.pageSize) - 1;
            var visibleRowCount = Math.floor(content.offsetHeight / this.parent.getRowHeight());
            var contentRect = content.getBoundingClientRect();
            if (!isNaN(rowIndex)) {
                if (e.keyArgs.action === literals.downArrow || e.keyArgs.action === literals.enter) {
                    this.rowIndex = rowIndex += 1;
                    var row = gObj.getRowByIndex(rowIndex);
                    var rowRect = row && row.getBoundingClientRect();
                    if (cache) {
                        rowIndex = cell.parentElement.rowIndex + 1;
                    }
                    if (this.isFocusScroll || (!row && rowIndex < totalRowsCount)
                        || (rowRect && rowRect.bottom >= contentRect.bottom)) {
                        if (!this.isFocusScroll) {
                            this.pressedKey = e.keyArgs.action;
                        }
                        this.isFocusScroll = false;
                        content.scrollTop = ((rowIndex - visibleRowCount) + 1) * this.parent.getRowHeight();
                    }
                    else if (!cache && row) {
                        if (rowRect && (rowRect.bottom >= contentRect.bottom || rowRect.top < contentRect.top)) {
                            row.cells[this.cellIndex].scrollIntoView();
                        }
                    }
                }
                else if (e.keyArgs.action === literals.upArrow || e.keyArgs.action === literals.shiftEnter) {
                    this.rowIndex = rowIndex -= 1;
                    var row = gObj.getRowByIndex(rowIndex);
                    var rowRect = row && row.getBoundingClientRect();
                    if (cache) {
                        rowIndex = cell.parentElement.rowIndex - 1;
                    }
                    if (!row || rowRect.top <= contentRect.top) {
                        this.pressedKey = e.keyArgs.action;
                        content.scrollTop = rowIndex * this.parent.getRowHeight();
                    }
                }
            }
        }
        else if (e.key === 'PageDown' || e.key === 'PageUp') {
            this.pressedKey = e.key;
        }
        this.setLastCellFocusInfo(e);
    };
    InfiniteScroll.prototype.createEmptyRowdata = function () {
        var _this = this;
        this.parent.getColumns().filter(function (e) {
            _this.emptyRowData[e.field] = _this.empty;
        });
    };
    InfiniteScroll.prototype.getVirtualInfiniteEditedData = function () {
        var editForm = this.parent.element.querySelector('.' + literals.editedRow);
        var addForm = this.parent.element.querySelector('.' + literals.addedRow);
        var gridForm = this.parent.element.querySelector('.e-gridform');
        if (this.parent.infiniteScrollSettings.enableCache && (editForm || addForm)) {
            var rowData = editForm ? extend({}, this.getEditedRowObject().data)
                : extend({}, this.emptyRowData);
            this.virtualInfiniteData = this.parent.editModule.getCurrentEditedData(gridForm, rowData);
            var hiddenColumn = this.parent.getHiddenColumns();
            for (var i = 0; i < hiddenColumn.length; i++) {
                if (hiddenColumn[parseInt(i.toString(), 10)].defaultValue) {
                    this.virtualInfiniteData[hiddenColumn[parseInt(i.toString(), 10)].field] =
                        hiddenColumn[parseInt(i.toString(), 10)].defaultValue;
                }
            }
        }
    };
    InfiniteScroll.prototype.restoreInfiniteEdit = function () {
        var content = this.parent.getContent().firstElementChild;
        var frozenEdit = this.parent.frozenRows ? this.editRowIndex >= this.parent.frozenRows : true;
        if (this.isNormaledit && this.parent.infiniteScrollSettings.enableCache && frozenEdit) {
            if (this.parent.editSettings.allowEditing && !isNullOrUndefined(this.editRowIndex)) {
                var row = this.parent.getRowByIndex(this.editRowIndex);
                if (Object.keys(this.virtualInfiniteData).length && row && !this.parent.getContent().querySelector('.' + literals.editedRow)) {
                    var top_1 = row.getBoundingClientRect().top;
                    if (top_1 < content.offsetHeight && top_1 > this.parent.getRowHeight()) {
                        this.parent.isEdit = false;
                        this.parent.editModule.startEdit(row);
                    }
                }
            }
        }
    };
    InfiniteScroll.prototype.restoreInfiniteAdd = function () {
        var content = this.parent.getContent().firstElementChild;
        if (this.parent.getCurrentViewRecords().length && this.parent.getRowByIndex(0) && this.isNormaledit &&
            this.parent.infiniteScrollSettings.enableCache && this.isAdd && !content.querySelector('.' + literals.addedRow)) {
            var isTop = content.scrollTop < this.parent.getRowHeight();
            if (isTop) {
                this.parent.isEdit = false;
                this.parent.addRecord();
            }
        }
    };
    InfiniteScroll.prototype.appendInfiniteRows = function (e) {
        var scrollEle = this.parent.getContent().firstElementChild;
        var isInfiniteScroll = this.parent.enableInfiniteScrolling && e.args.requestType === 'infiniteScroll';
        if ((this.parent.isAngular || this.parent.isReact || this.parent.isVue || this.parent.isVue3) && isInfiniteScroll &&
            !e.args.isFrozen && this.parent.infiniteScrollSettings.enableCache) {
            var isChildGrid = this.parent.childGrid && this.parent.element.querySelectorAll('.e-childgrid').length ? true : false;
            var rows = this.parent.getDataRows();
            this.parent.refreshReactTemplateTD(rows, isChildGrid);
        }
        if ((isInfiniteScroll && !e.args.isFrozen) || !isInfiniteScroll) {
            if (isInfiniteScroll && e.args.direction === 'up') {
                e.tbody.insertBefore(e.frag, e.tbody.firstElementChild);
            }
            else {
                e.tbody.appendChild(e.frag);
            }
        }
        this.parent.contentModule.getTable().appendChild(e.tbody);
        this.updateCurrentViewData();
        if (this.isInitialRender && !e.args.isFrozen) {
            this.isInitialRender = false;
            this.parent.scrollModule.setHeight();
        }
        if (!e.args.isFrozen) {
            this.rowTop = !this.rowTop ? this.parent.getRows()[0].getBoundingClientRect().top : this.rowTop;
            if (isInfiniteScroll) {
                if (this.parent.infiniteScrollSettings.enableCache && this.isRemove) {
                    scrollEle.scrollTop = this.top;
                }
                setRowElements(this.parent);
            }
            this.restoreInfiniteAdd();
            this.isScroll = true;
        }
        this.isInfiniteScroll = false;
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    InfiniteScroll.prototype.selectNewRow = function (args) {
        var _this = this;
        var gObj = this.parent;
        var row = gObj.getRowByIndex(this.rowIndex);
        var cache = gObj.infiniteScrollSettings.enableCache;
        if (row && this.keys.some(function (value) { return value === _this.pressedKey; })) {
            var content = gObj.getContent().firstElementChild;
            var rowHeight = gObj.getRowHeight();
            var target = row.cells[this.cellIndex];
            if ((this.pressedKey === literals.downArrow || this.pressedKey === literals.enter)
                || (cache && (this.pressedKey === literals.upArrow || this.pressedKey === literals.shiftEnter))) {
                if (!cache && this.pressedKey !== literals.upArrow && this.pressedKey !== literals.shiftEnter) {
                    content.scrollTop = content.scrollTop + rowHeight;
                }
                gObj.focusModule.isInfiniteScroll = true;
                gObj.focusModule.onClick({ target: target }, true);
                gObj.selectRow(this.rowIndex);
            }
        }
        else if (this.lastFocusInfo && (this.pressedKey === literals.pageDown || this.pressedKey === literals.pageUp)) {
            var idx = cache ? 0 : this.lastFocusInfo.rowIdx;
            if (gObj.getRowByIndex(idx)) {
                var target = gObj.getCellFromIndex(idx, this.lastFocusInfo.cellIdx);
                if (target) {
                    this.isFocusScroll = true;
                    if (!cache) {
                        gObj.focusModule.isInfiniteScroll = true;
                        gObj.focusModule.onClick({ target: target }, true);
                    }
                    else {
                        target.focus({ preventScroll: true });
                    }
                }
            }
        }
        this.pressedKey = undefined;
    };
    InfiniteScroll.prototype.removeInfiniteCacheRows = function (e) {
        var isInfiniteScroll = this.parent.enableInfiniteScrolling && e.args.requestType === 'infiniteScroll';
        if (!e.args.isFrozen && isInfiniteScroll && this.parent.infiniteScrollSettings.enableCache && this.isRemove) {
            var rows = [].slice.call(this.parent.getContentTable().getElementsByClassName(literals.row));
            if (e.args.direction === 'down') {
                if (this.parent.allowGrouping && this.parent.groupSettings.columns.length) {
                    var captionRows = [].slice.call(this.parent.getContentTable().querySelectorAll('tr'));
                    this.removeCaptionRows(captionRows, e.args);
                }
                var addRowCount = this.parent.element.querySelector('.' + literals.addedRow) ? 0 : 1;
                this.removeTopRows(rows, this.parent.pageSettings.pageSize - addRowCount);
            }
            if (e.args.direction === 'up') {
                if (this.parent.allowGrouping && this.parent.groupSettings.columns.length) {
                    var captionRows = [].slice.call(this.parent.getContentTable().querySelectorAll('tr'));
                    this.removeCaptionRows(captionRows, e.args);
                }
                else {
                    this.removeBottomRows(rows, rows.length - 1, e.args);
                }
            }
            this.isScroll = false;
            this.top = this.calculateScrollTop(e.args);
        }
    };
    InfiniteScroll.prototype.calculateScrollTop = function (args) {
        var top = 0;
        var scrollCnt = this.parent.getContent().firstElementChild;
        if (args.direction === 'down') {
            if (this.parent.allowGrouping && this.parent.groupSettings.columns.length && !this.isInitialCollapse) {
                top = this.captionRowHeight();
            }
            var captionRows = [].slice.call(this.parent.getContent().firstElementChild.querySelectorAll('tr:not(.e-row)'));
            var captionCount = 0;
            if (this.isInitialCollapse && !isNullOrUndefined(captionRows)) {
                captionCount = Math.round((captionRows.length - 1) / this.parent.groupSettings.columns.length);
            }
            var value = captionCount ? captionCount
                : this.parent.pageSettings.pageSize * (this.parent.infiniteScrollSettings.maxBlocks - 1);
            var currentViewRowCount = 0;
            var i = 0;
            while (currentViewRowCount < scrollCnt.clientHeight) {
                i++;
                currentViewRowCount = i * this.parent.getRowHeight();
            }
            i = i - 1;
            top += (value - i) * this.parent.getRowHeight();
        }
        if (args.direction === 'up') {
            if (this.parent.allowGrouping && this.parent.groupSettings.columns.length && !this.isInitialCollapse) {
                var len = this.refreshInfiniteCacheRowVisibleLength(this.infiniteCache, this.parent.pageSettings.currentPage);
                top = len * this.parent.getRowHeight();
            }
            else if (this.isInitialCollapse) {
                var groupedData = this.infiniteCache[this.parent.pageSettings.currentPage];
                var count = 0;
                for (var i = 0; i < groupedData.length; i++) {
                    if (groupedData[parseInt(i.toString(), 10)].isCaptionRow) {
                        count++;
                    }
                }
                top += Math.round(count / this.parent.groupSettings.columns.length) * this.parent.getRowHeight();
            }
            else {
                top += (this.parent.pageSettings.pageSize * this.parent.getRowHeight() + getScrollBarWidth());
            }
        }
        return top;
    };
    InfiniteScroll.prototype.captionRowHeight = function () {
        var rows = [].slice.call(this.parent.getContent().querySelectorAll('tr:not(.e-row)'));
        return rows.length * this.parent.getRowHeight();
    };
    InfiniteScroll.prototype.removeTopRows = function (rows, maxIndx) {
        for (var i = 0; i <= maxIndx; i++) {
            if (this.parent.frozenRows && this.parent.pageSettings.currentPage === this.parent.infiniteScrollSettings.maxBlocks + 1
                && i > (maxIndx - this.parent.frozenRows)) {
                continue;
            }
            remove(rows[parseInt(i.toString(), 10)]);
        }
    };
    InfiniteScroll.prototype.removeBottomRows = function (rows, maxIndx, args) {
        var cnt = 0;
        var pageSize = this.parent.pageSettings.pageSize;
        if (this.infiniteCache[args.prevPage].length < pageSize) {
            cnt = this.parent.pageSettings.pageSize - this.infiniteCache[args.prevPage].length;
        }
        for (var i = maxIndx; cnt < pageSize; i--) {
            cnt++;
            remove(rows[parseInt(i.toString(), 10)]);
        }
    };
    InfiniteScroll.prototype.removeCaptionRows = function (rows, args) {
        var rowElements = [].slice.call(this.parent.getContent().getElementsByClassName(literals.row));
        if (args.direction === 'down') {
            var lastRow = rowElements[this.parent.pageSettings.pageSize - 1];
            var lastRowIndex = getRowIndexFromElement(lastRow) - 1;
            var k = 0;
            for (var i = 0; k < lastRowIndex; i++) {
                if (!rows[parseInt(i.toString(), 10)].classList.contains(literals.row)) {
                    remove(rows[parseInt(i.toString(), 10)]);
                }
                else {
                    k = getRowIndexFromElement(rows[parseInt(i.toString(), 10)]);
                }
            }
        }
        if (args.direction === 'up') {
            var lastIndex = getRowIndexFromElement(rowElements[rowElements.length - 1]);
            var page = Math.ceil(lastIndex / this.parent.pageSettings.pageSize);
            var startIndex = 0;
            for (var i = this.parent.pageSettings.currentPage + 1; i < page; i++) {
                startIndex += this.infiniteCache[parseInt(i.toString(), 10)].length;
            }
            for (var i = startIndex; i < rows.length; i++) {
                remove(rows[parseInt(i.toString(), 10)]);
            }
        }
    };
    InfiniteScroll.prototype.resetInfiniteBlocks = function (args, isDataModified) {
        var isInfiniteScroll = this.parent.enableInfiniteScrolling && args.requestType !== 'infiniteScroll';
        if (!this.initialRender && !isNullOrUndefined(this.parent.infiniteScrollModule) && isInfiniteScroll) {
            if (this.actions.some(function (value) { return value === args.requestType; }) || isDataModified || (args.requestType === 'save'
                && (this.parent.sortSettings.columns.length || this.parent.filterSettings.columns.length
                    || this.parent.groupSettings.columns.length || this.parent.searchSettings.key))) {
                var scrollEle = this.parent.getContent().firstElementChild;
                this.initialRender = true;
                scrollEle.scrollTop = 0;
                this.parent.pageSettings.currentPage = 1;
                this.infiniteCache = {};
                this.infiniteCurrentViewData = {};
                this.resetContentModuleCache({});
                this.isRemove = false;
                this.top = 0;
                this.isInitialCollapse = false;
                this.parent.contentModule.isRemove = this.isRemove;
                this.parent.contentModule.isAddRows = this.isRemove;
                this.parent.contentModule.visibleRows = [];
                this.parent.contentModule.visibleFrozenRows = [];
            }
        }
    };
    InfiniteScroll.prototype.setCache = function (e) {
        if (this.parent.enableInfiniteScrolling && this.parent.infiniteScrollSettings.enableCache) {
            var isEdit = e.args.requestType !== 'infiniteScroll'
                && (this.requestType === 'delete' || this.requestType === 'add');
            var currentPage = this.parent.pageSettings.currentPage;
            if (!Object.keys(this.infiniteCache).length || isEdit) {
                this.setInitialCache(e.modelData, e.args, isEdit);
            }
            if (isNullOrUndefined(this.infiniteCache[this.parent.pageSettings.currentPage])) {
                this.infiniteCache[this.parent.pageSettings.currentPage] = e.modelData;
                this.resetContentModuleCache(this.infiniteCache);
            }
            if (e.isInfiniteScroll && !this.isRemove) {
                this.isRemove = (currentPage - 1) % this.parent.infiniteScrollSettings.maxBlocks === 0;
                this.parent.contentModule.isRemove = this.isRemove;
            }
        }
    };
    InfiniteScroll.prototype.setInitialCache = function (data, args, isEdit, isCurrentViewData) {
        var k = !isEdit ? 1 : isNullOrUndefined(this.firstBlock) ? 1 : this.firstBlock;
        for (var i = 1; i <= this.parent.infiniteScrollSettings.initialBlocks; i++) {
            var startIndex = (i - 1) * this.parent.pageSettings.pageSize;
            var endIndex = i * this.parent.pageSettings.pageSize;
            if (this.parent.allowGrouping && this.parent.groupSettings.columns.length && !isCurrentViewData) {
                this.setInitialGroupCache(data, k, startIndex, endIndex);
            }
            else {
                if (isCurrentViewData) {
                    this.infiniteCurrentViewData[parseInt(k.toString(), 10)] = data.slice(startIndex, endIndex);
                }
                else {
                    this.infiniteCache[parseInt(k.toString(), 10)] = data.slice(startIndex, endIndex);
                    this.resetContentModuleCache(this.infiniteCache);
                }
            }
            k++;
        }
    };
    InfiniteScroll.prototype.setInitialGroupCache = function (data, index, sIndex, eIndex) {
        var pageData = [];
        var startIndex = 0;
        for (var i = 1; i <= Object.keys(this.infiniteCache).length; i++) {
            startIndex += this.infiniteCache[parseInt(i.toString(), 10)].length;
        }
        var k = sIndex;
        for (var i = startIndex; i < data.length && k < eIndex; i++) {
            if (data[parseInt(i.toString(), 10)].index < eIndex || data[parseInt(i.toString(), 10)].isCaptionRow) {
                k = data[parseInt(i.toString(), 10)].isCaptionRow ? k : data[parseInt(i.toString(), 10)].index;
                pageData.push(data[parseInt(i.toString(), 10)]);
            }
            if (data[parseInt(i.toString(), 10)].index >= eIndex || data[parseInt(i.toString(), 10)].index === eIndex - 1) {
                break;
            }
        }
        this.infiniteCache[parseInt(index.toString(), 10)] = pageData;
        this.resetContentModuleCache(this.infiniteCache);
    };
    InfiniteScroll.prototype.resetContentModuleCache = function (data) {
        this.parent.contentModule
            .infiniteCache = data;
    };
    /**
     * @param {Row<Column>[]} rowObjects - Defines the grid's row objects
     * @returns {void}
     * @hidden
     */
    InfiniteScroll.prototype.resetInfiniteCache = function (rowObjects) {
        var blockLength = Object.keys(this.infiniteCache).length;
        this.infiniteCache = {};
        for (var i = 1; i <= blockLength; i++) {
            var startIndex = (i - 1) * this.parent.pageSettings.pageSize;
            var endIndex = i * this.parent.pageSettings.pageSize;
            if (this.parent.allowGrouping && this.parent.groupSettings.columns.length) {
                this.setInitialGroupCache(rowObjects, i, startIndex, endIndex);
            }
            else {
                this.infiniteCache[parseInt(i.toString(), 10)] = rowObjects.slice(startIndex, endIndex);
                this.resetContentModuleCache(this.infiniteCache);
            }
        }
    };
    /**
     * @returns {void}
     * @hidden
     */
    InfiniteScroll.prototype.destroy = function () {
        this.removeEventListener();
    };
    return InfiniteScroll;
}());
export { InfiniteScroll };
