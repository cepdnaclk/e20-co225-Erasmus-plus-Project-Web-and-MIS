import { EventHandler, closest, Browser, isNullOrUndefined } from '@syncfusion/ej2-base';
import { remove } from '@syncfusion/ej2-base';
import { ContextMenu as Menu } from '@syncfusion/ej2-navigations';
import { parentsUntil, applyBiggerTheme } from '../base/util';
import * as events from '../base/constant';
import { calculatePosition } from '@syncfusion/ej2-popups';
import { createCheckBox } from '@syncfusion/ej2-buttons';
import { Group } from '../actions/group';
import { Sort } from '../actions/sort';
import { Filter } from '../actions/filter';
import { Resize } from '../actions/resize';
import { ResponsiveDialogAction } from '../base/enum';
import * as literals from '../base/string-literals';
/**
 * 'column menu module used to handle column menu actions'
 *
 * @hidden
 */
var ColumnMenu = /** @class */ (function () {
    function ColumnMenu(parent, serviceLocator) {
        this.defaultItems = {};
        this.localeText = this.setLocaleKey();
        this.disableItems = [];
        this.hiddenItems = [];
        this.isOpen = false;
        // default class names
        this.GROUP = 'e-icon-group';
        this.UNGROUP = 'e-icon-ungroup';
        this.ASCENDING = 'e-icon-ascending';
        this.DESCENDING = 'e-icon-descending';
        this.ROOT = 'e-columnmenu';
        this.FILTER = 'e-icon-filter';
        this.POP = 'e-filter-popup';
        this.WRAP = 'e-col-menu';
        this.COL_POP = 'e-colmenu-popup';
        this.CHOOSER = '_chooser_';
        this.parent = parent;
        this.gridID = parent.element.id;
        this.serviceLocator = serviceLocator;
        this.addEventListener();
        if (this.parent.enableAdaptiveUI) {
            this.setFullScreenDialog();
        }
    }
    ColumnMenu.prototype.wireEvents = function () {
        if (!this.parent.enableAdaptiveUI) {
            var elements = this.getColumnMenuHandlers();
            for (var i = 0; i < elements.length; i++) {
                EventHandler.add(elements[parseInt(i.toString(), 10)], 'mousedown', this.columnMenuHandlerDown, this);
            }
        }
    };
    ColumnMenu.prototype.unwireEvents = function () {
        if (!this.parent.enableAdaptiveUI) {
            var elements = this.getColumnMenuHandlers();
            for (var i = 0; i < elements.length; i++) {
                EventHandler.remove(elements[parseInt(i.toString(), 10)], 'mousedown', this.columnMenuHandlerDown);
            }
        }
    };
    ColumnMenu.prototype.setFullScreenDialog = function () {
        if (this.serviceLocator) {
            this.serviceLocator.registerAdaptiveService(this, this.parent.enableAdaptiveUI, ResponsiveDialogAction.isColMenu);
        }
    };
    /**
     * To destroy the resize
     *
     * @returns {void}
     * @hidden
     */
    ColumnMenu.prototype.destroy = function () {
        var gridElement = this.parent.element;
        if (!gridElement.querySelector('.' + literals.gridContent) && (!gridElement.querySelector('.' + literals.gridHeader)) || !gridElement) {
            return;
        }
        if (this.columnMenu) {
            this.columnMenu.destroy();
        }
        this.removeEventListener();
        this.unwireFilterEvents();
        this.unwireEvents();
        if (!this.parent.enableAdaptiveUI && this.element.parentNode) {
            remove(this.element);
        }
    };
    ColumnMenu.prototype.columnMenuHandlerClick = function (e) {
        if (e.target.classList.contains('e-columnmenu')) {
            if (this.parent.enableAdaptiveUI) {
                this.headerCell = this.getHeaderCell(e);
                var col = this.getColumn();
                this.responsiveDialogRenderer.isCustomDialog = true;
                this.parent.notify(events.renderResponsiveChangeAction, { action: 4 });
                this.parent.notify(events.filterOpen, { col: col, target: e.target, isClose: null, id: null });
                this.responsiveDialogRenderer.showResponsiveDialog(null, col);
            }
            else {
                this.columnMenu.items = this.getItems();
                this.columnMenu.dataBind();
                if ((this.isOpen && this.headerCell !== this.getHeaderCell(e)) ||
                    document.querySelector('.e-grid-menu .e-menu-parent.e-ul')) {
                    this.columnMenu.close();
                    this.openColumnMenu(e);
                }
                else if (!this.isOpen) {
                    this.openColumnMenu(e);
                }
                else {
                    this.columnMenu.close();
                }
            }
        }
    };
    /**
     * @param {string} field - specifies the field name
     * @returns {void}
     * @hidden
     */
    ColumnMenu.prototype.openColumnMenuByField = function (field) {
        this.openColumnMenu({ target: this.parent.getColumnHeaderByField(field).querySelector('.e-columnmenu') });
    };
    ColumnMenu.prototype.afterFilterColumnMenuClose = function () {
        if (this.columnMenu) {
            this.columnMenu.items = this.getItems();
            this.columnMenu.dataBind();
            this.columnMenu.close();
        }
    };
    ColumnMenu.prototype.openColumnMenu = function (e) {
        var contentRect = this.parent.getContent().getClientRects()[0];
        var headerEle = this.parent.getHeaderContent();
        var headerElemCliRect = headerEle.getBoundingClientRect();
        var pos = { top: 0, left: 0 };
        this.element.style.cssText = 'display:block;visibility:hidden';
        var elePos = this.element.getBoundingClientRect();
        var gClient = this.parent.element.getBoundingClientRect();
        this.element.style.cssText = 'display:none;visibility:visible';
        this.headerCell = this.getHeaderCell(e);
        if (this.parent.enableRtl) {
            pos = this.parent.enableStickyHeader ? calculatePosition(this.headerCell, 'left', 'bottom', true) :
                calculatePosition(this.headerCell, 'left', 'bottom');
        }
        else {
            pos = this.parent.enableStickyHeader ? calculatePosition(this.headerCell, 'right', 'bottom', true) :
                calculatePosition(this.headerCell, 'right', 'bottom');
            pos.left -= elePos.width;
            if (headerEle.classList.contains('e-sticky')) {
                pos.top = this.parent.element.offsetTop + headerElemCliRect.top + headerElemCliRect.height;
                if (headerElemCliRect.top + headerElemCliRect.height > contentRect.top) {
                    pos.top += ((headerElemCliRect.top + headerElemCliRect.height) - contentRect.top);
                }
            }
            else if (this.parent.enableStickyHeader) {
                pos.top = this.parent.element.offsetTop + headerEle.offsetTop + headerElemCliRect.height;
            }
            if ((pos.left + elePos.width + 1) >= gClient.right) {
                pos.left -= 35;
            }
        }
        this.columnMenu['open'](pos.top, pos.left);
        if (e.preventDefault) {
            e.preventDefault();
        }
        applyBiggerTheme(this.parent.element, this.columnMenu.element.parentElement);
    };
    ColumnMenu.prototype.columnMenuHandlerDown = function () {
        this.isOpen = !(this.element.style.display === 'none' || this.element.style.display === '');
    };
    ColumnMenu.prototype.getColumnMenuHandlers = function () {
        return [].slice.call(this.parent.getHeaderTable().getElementsByClassName(this.ROOT));
    };
    /**
     * @returns {void}
     * @hidden
     */
    ColumnMenu.prototype.addEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on(events.headerRefreshed, this.wireEvents, this);
        this.parent.on(events.uiUpdate, this.enableAfterRenderMenu, this);
        this.parent.on(events.initialEnd, this.render, this);
        if (this.isFilterItemAdded()) {
            this.parent.on(events.filterDialogCreated, this.filterPosition, this);
        }
        this.parent.on(events.setFullScreenDialog, this.setFullScreenDialog, this);
        this.parent.on(events.renderResponsiveChangeAction, this.renderResponsiveChangeAction, this);
        this.parent.on(events.click, this.columnMenuHandlerClick, this);
        this.parent.on(events.afterFilterColumnMenuClose, this.afterFilterColumnMenuClose, this);
        this.parent.on(events.keyPressed, this.keyPressHandler, this);
        this.parent.on(events.destroy, this.destroy, this);
    };
    /**
     * @returns {void}
     * @hidden
     */
    ColumnMenu.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off(events.headerRefreshed, this.unwireEvents);
        this.parent.off(events.uiUpdate, this.enableAfterRenderMenu);
        this.parent.off(events.initialEnd, this.render);
        if (this.isFilterItemAdded()) {
            this.parent.off(events.filterDialogCreated, this.filterPosition);
        }
        this.parent.off(events.setFullScreenDialog, this.setFullScreenDialog);
        this.parent.off(events.renderResponsiveChangeAction, this.renderResponsiveChangeAction);
        this.parent.off(events.click, this.columnMenuHandlerClick);
        this.parent.on(events.afterFilterColumnMenuClose, this.afterFilterColumnMenuClose);
        this.parent.off(events.keyPressed, this.keyPressHandler);
        this.parent.off(events.destroy, this.destroy);
    };
    ColumnMenu.prototype.keyPressHandler = function (e) {
        var gObj = this.parent;
        if (e.action === 'altDownArrow') {
            var element = gObj.focusModule.currentInfo.element;
            if (element && element.classList.contains('e-headercell')) {
                var column = gObj.getColumnByUid(element.firstElementChild.getAttribute('e-mappinguid'));
                this.openColumnMenuByField(column.field);
            }
        }
    };
    ColumnMenu.prototype.enableAfterRenderMenu = function (e) {
        if (e.module === this.getModuleName() && e.enable) {
            if (this.columnMenu) {
                this.columnMenu.destroy();
                remove(this.element);
            }
            if (!this.parent.enableAdaptiveUI) {
                this.render();
            }
        }
    };
    ColumnMenu.prototype.render = function () {
        if (this.parent.enableAdaptiveUI) {
            return;
        }
        this.l10n = this.serviceLocator.getService('localization');
        this.element = this.parent.createElement('ul', { id: this.gridID + '_columnmenu', className: 'e-colmenu' });
        this.element.setAttribute('aria-label', this.l10n.getConstant('ColumnMenuDialogARIA'));
        this.parent.element.appendChild(this.element);
        this.columnMenu = new Menu({
            cssClass: this.parent.cssClass ? 'e-grid-menu' + ' ' + this.parent.cssClass : 'e-grid-menu',
            enableRtl: this.parent.enableRtl,
            enablePersistence: this.parent.enablePersistence,
            locale: this.parent.locale,
            items: this.getItems(),
            select: this.columnMenuItemClick.bind(this),
            beforeOpen: this.columnMenuBeforeOpen.bind(this),
            onOpen: this.columnMenuOnOpen.bind(this),
            onClose: this.columnMenuOnClose.bind(this),
            beforeItemRender: this.beforeMenuItemRender.bind(this),
            beforeClose: this.columnMenuBeforeClose.bind(this)
        });
        if (this.element && parentsUntil(this.element, 'e-popup')) {
            this.element.classList.add(this.COL_POP);
        }
        this.columnMenu.appendTo(this.element);
        this.wireFilterEvents();
    };
    ColumnMenu.prototype.wireFilterEvents = function () {
        if (!Browser.isDevice && this.isFilterItemAdded()) {
            EventHandler.add(this.element, 'mouseover', this.appendFilter, this);
        }
    };
    ColumnMenu.prototype.unwireFilterEvents = function () {
        if (!Browser.isDevice && this.isFilterItemAdded() && !this.parent.enableAdaptiveUI) {
            EventHandler.remove(this.element, 'mouseover', this.appendFilter);
        }
    };
    ColumnMenu.prototype.beforeMenuItemRender = function (args) {
        var _a;
        if (this.isChooserItem(args.item)) {
            var field_1 = this.getKeyFromId(args.item.id, this.CHOOSER);
            var column = this.parent.columnModel.filter(function (col) { return col.field === field_1; });
            var check = createCheckBox(this.parent.createElement, false, {
                label: args.item.text,
                checked: column[0].visible
            });
            if (this.parent.enableRtl) {
                check.classList.add('e-rtl');
            }
            if (this.parent.cssClass) {
                if (this.parent.cssClass.indexOf(' ') !== -1) {
                    (_a = check.classList).add.apply(_a, this.parent.cssClass.split(' '));
                }
                else {
                    check.classList.add(this.parent.cssClass);
                }
            }
            args.element.innerHTML = '';
            args.element.appendChild(check);
        }
        else if (args.item.id && this.getKeyFromId(args.item.id) === 'Filter') {
            args.element.appendChild(this.parent.createElement('span', { className: 'e-icons e-caret' }));
            args.element.className += 'e-filter-item e-menu-caret-icon';
        }
    };
    ColumnMenu.prototype.columnMenuBeforeClose = function (args) {
        var colChooser = args.event ? closest(args.event.target, '.e-menu-item') : null;
        if (!isNullOrUndefined(args.parentItem) &&
            this.getKeyFromId(args.parentItem.id) === 'ColumnChooser' &&
            colChooser && this.isChooserItem(colChooser)) {
            args.cancel = args.event && args.event.code === 'Escape' ? false : true;
        }
        else if (args.event && (closest(args.event.target, '.' + this.POP)
            || (args.event.currentTarget && args.event.currentTarget.activeElement &&
                parentsUntil(args.event.currentTarget.activeElement, 'e-filter-popup'))
            || (parentsUntil(args.event.target, 'e-popup') && parentsUntil(args.event.target, 'e-colmenu-popup'))
            || (parentsUntil(args.event.target, 'e-popup-wrapper'))) && !Browser.isDevice) {
            args.cancel = true;
        }
        else if (args.event && args.event.target && args.event.target.classList.contains('e-filter-item') && args.event.key === 'Enter') {
            args.cancel = true;
        }
    };
    ColumnMenu.prototype.isChooserItem = function (item) {
        return item.id && item.id.indexOf('_colmenu_') >= 0 &&
            this.getKeyFromId(item.id, this.CHOOSER).indexOf('_colmenu_') === -1;
    };
    ColumnMenu.prototype.columnMenuBeforeOpen = function (args) {
        args.column = this.targetColumn = this.getColumn();
        this.parent.trigger(events.columnMenuOpen, args);
        for (var _i = 0, _a = args.items; _i < _a.length; _i++) {
            var item = _a[_i];
            var key = this.getKeyFromId(item.id);
            var dItem = this.defaultItems["" + key];
            if (this.getDefaultItems().indexOf(key) !== -1 && this.ensureDisabledStatus(key) && !dItem.hide) {
                this.disableItems.push(item.text);
            }
            if (item.hide) {
                this.hiddenItems.push(item.text);
            }
        }
        this.columnMenu.enableItems(this.disableItems, false);
        this.columnMenu.hideItems(this.hiddenItems);
    };
    ColumnMenu.prototype.columnMenuOnOpen = function (args) {
        if (args.element.className === 'e-menu-parent e-ul ') {
            if (args.element.offsetHeight > window.innerHeight || this.parent.element.offsetHeight > window.innerHeight) {
                args.element.style.maxHeight = (window.innerHeight) * 0.8 + 'px';
                args.element.style.overflowY = 'auto';
                if (this.parent.enableStickyHeader) {
                    args.element.style.position = 'fixed';
                }
            }
        }
    };
    ColumnMenu.prototype.ensureDisabledStatus = function (item) {
        var status = false;
        switch (item) {
            case 'Group':
                if (!this.parent.allowGrouping || (this.parent.ensureModuleInjected(Group) && this.targetColumn
                    && this.parent.groupSettings.columns.indexOf(this.targetColumn.field) >= 0 ||
                    this.targetColumn && !this.targetColumn.allowGrouping)) {
                    status = true;
                }
                break;
            case 'AutoFitAll':
            case 'AutoFit':
                status = !this.parent.ensureModuleInjected(Resize);
                break;
            case 'Ungroup':
                if (!this.parent.ensureModuleInjected(Group) || (this.parent.ensureModuleInjected(Group) && this.targetColumn
                    && this.parent.groupSettings.columns.indexOf(this.targetColumn.field) < 0)) {
                    status = true;
                }
                break;
            case 'SortDescending':
            case 'SortAscending':
                if (this.parent.allowSorting && this.parent.ensureModuleInjected(Sort)
                    && this.parent.sortSettings.columns.length > 0 && this.targetColumn && this.targetColumn.allowSorting) {
                    var sortColumns = this.parent.sortSettings.columns;
                    for (var i = 0; i < sortColumns.length; i++) {
                        if (sortColumns[parseInt(i.toString(), 10)].field === this.targetColumn.field
                            && sortColumns[parseInt(i.toString(), 10)].direction.toLocaleLowerCase() === item.toLocaleLowerCase().replace('sort', '')) {
                            status = true;
                        }
                    }
                }
                else if (!this.parent.allowSorting || !this.parent.ensureModuleInjected(Sort) ||
                    this.parent.allowSorting && this.targetColumn && !this.targetColumn.allowSorting) {
                    status = true;
                }
                break;
            case 'Filter':
                if (this.parent.allowFiltering && (this.parent.filterSettings.type !== 'FilterBar')
                    && this.parent.ensureModuleInjected(Filter) && this.targetColumn && this.targetColumn.allowFiltering) {
                    status = false;
                }
                else if (this.parent.ensureModuleInjected(Filter) && this.parent.allowFiltering
                    && this.targetColumn && (!this.targetColumn.allowFiltering || this.parent.filterSettings.type === 'FilterBar')) {
                    status = true;
                }
        }
        return status;
    };
    ColumnMenu.prototype.columnMenuItemClick = function (args) {
        var item = this.isChooserItem(args.item) ? 'ColumnChooser' : this.getKeyFromId(args.item.id);
        switch (item) {
            case 'AutoFit':
                this.parent.autoFitColumns(this.targetColumn.field);
                break;
            case 'AutoFitAll':
                this.parent.autoFitColumns([]);
                break;
            case 'Ungroup':
                this.parent.ungroupColumn(this.targetColumn.field);
                break;
            case 'Group':
                this.parent.groupColumn(this.targetColumn.field);
                break;
            case 'SortAscending':
                this.parent.sortColumn(this.targetColumn.field, 'Ascending');
                break;
            case 'SortDescending':
                this.parent.sortColumn(this.targetColumn.field, 'Descending');
                break;
            case 'ColumnChooser':
                // eslint-disable-next-line no-case-declarations
                var key = this.getKeyFromId(args.item.id, this.CHOOSER);
                // eslint-disable-next-line no-case-declarations
                var checkbox = args.element.querySelector('.e-checkbox-wrapper .e-frame');
                if (checkbox && checkbox.classList.contains('e-check')) {
                    checkbox.classList.remove('e-check');
                    this.parent.hideColumns(key, 'field');
                }
                else if (checkbox) {
                    this.parent.showColumns(key, 'field');
                    checkbox.classList.add('e-check');
                }
                break;
            case 'Filter':
                this.getFilter(args.element, args.item.id);
                break;
        }
        args.column = this.targetColumn;
        this.parent.trigger(events.columnMenuClick, args);
    };
    ColumnMenu.prototype.columnMenuOnClose = function (args) {
        var parent = 'parentObj';
        if (args.items.length > 0 && args.items[0]["" + parent] instanceof Menu) {
            this.columnMenu.enableItems(this.disableItems, false);
            this.disableItems = [];
            this.columnMenu.showItems(this.hiddenItems);
            this.hiddenItems = [];
            if (this.isFilterPopupOpen()) {
                this.getFilter(args.element, args.element.id, true);
            }
        }
        if (!isNullOrUndefined(args.parentItem) && this.getKeyFromId(args.parentItem.id) === 'ColumnChooser'
            && this.columnMenu.element.querySelector('.e-selected')) {
            this.columnMenu.element.querySelector('.e-selected').focus();
        }
        else {
            this.parent.notify(events.restoreFocus, {});
        }
    };
    ColumnMenu.prototype.getDefaultItems = function () {
        return ['AutoFitAll', 'AutoFit', 'SortAscending', 'SortDescending', 'Group', 'Ungroup', 'ColumnChooser', 'Filter'];
    };
    ColumnMenu.prototype.getItems = function () {
        var items = [];
        var defultItems = this.parent.columnMenuItems ? this.parent.columnMenuItems : this.getDefault();
        for (var _i = 0, defultItems_1 = defultItems; _i < defultItems_1.length; _i++) {
            var item = defultItems_1[_i];
            if (typeof item === 'string') {
                if (item === 'ColumnChooser') {
                    var col = this.getDefaultItem(item);
                    col.items = this.createChooserItems();
                    items.push(col);
                }
                else {
                    items.push(this.getDefaultItem(item));
                }
            }
            else {
                items.push(item);
            }
        }
        return items;
    };
    ColumnMenu.prototype.getDefaultItem = function (item) {
        var menuItem = {};
        switch (item) {
            case 'SortAscending':
                menuItem = { iconCss: this.ASCENDING };
                break;
            case 'SortDescending':
                menuItem = { iconCss: this.DESCENDING };
                break;
            case 'Group':
                menuItem = { iconCss: this.GROUP };
                break;
            case 'Ungroup':
                menuItem = { iconCss: this.UNGROUP };
                break;
            case 'Filter':
                menuItem = { iconCss: this.FILTER };
                break;
        }
        this.defaultItems["" + item] = {
            text: this.getLocaleText(item), id: this.generateID(item),
            iconCss: menuItem.iconCss ? 'e-icons ' + menuItem.iconCss : null
        };
        return this.defaultItems["" + item];
    };
    ColumnMenu.prototype.getLocaleText = function (item) {
        return this.l10n.getConstant(this.localeText["" + item]);
    };
    ColumnMenu.prototype.generateID = function (item, append) {
        return this.gridID + '_colmenu_' + (append ? append + item : item);
    };
    ColumnMenu.prototype.getKeyFromId = function (id, append) {
        return id.indexOf('_colmenu_') > 0 &&
            id.replace(this.gridID + '_colmenu_' + (append ? append : ''), '');
    };
    /**
     * @returns {HTMLElement} returns the HTMLElement
     * @hidden
     */
    ColumnMenu.prototype.getColumnMenu = function () {
        return this.element;
    };
    ColumnMenu.prototype.getModuleName = function () {
        return 'columnMenu';
    };
    ColumnMenu.prototype.setLocaleKey = function () {
        var localeKeys = {
            'AutoFitAll': 'autoFitAll',
            'AutoFit': 'autoFit',
            'Group': 'Group',
            'Ungroup': 'Ungroup',
            'SortAscending': 'SortAscending',
            'SortDescending': 'SortDescending',
            'ColumnChooser': 'Columnchooser',
            'Filter': 'FilterMenu'
        };
        return localeKeys;
    };
    ColumnMenu.prototype.getHeaderCell = function (e) {
        return closest(e.target, 'th.e-headercell');
    };
    ColumnMenu.prototype.getColumn = function () {
        if (this.headerCell) {
            var uid = this.headerCell.querySelector('.e-headercelldiv').getAttribute('e-mappinguid');
            return this.parent.getColumnByUid(uid);
        }
        return null;
    };
    ColumnMenu.prototype.createChooserItems = function () {
        var items = [];
        for (var _i = 0, _a = this.parent.columnModel; _i < _a.length; _i++) {
            var col = _a[_i];
            if (col.showInColumnChooser && col.field) {
                items.push({ id: this.generateID(col.field, this.CHOOSER), text: col.headerText ? col.headerText : col.field });
            }
        }
        return items;
    };
    ColumnMenu.prototype.appendFilter = function (e) {
        var filter = 'Filter';
        if (!this.defaultItems["" + filter]) {
            return;
        }
        else {
            var key = this.defaultItems["" + filter].id;
            if (closest(e.target, '#' + key) && !this.isFilterPopupOpen()) {
                this.getFilter(e.target, key);
            }
            else if (!closest(e.target, '#' + key) && this.isFilterPopupOpen()) {
                this.getFilter(e.target, key, true);
            }
        }
    };
    ColumnMenu.prototype.getFilter = function (target, id, isClose) {
        var filterPopup = this.getFilterPop();
        if (filterPopup) {
            filterPopup.style.display = !Browser.isDevice && isClose ? 'none' : 'block';
        }
        else {
            this.parent.notify(events.filterOpen, {
                col: this.targetColumn, target: target, isClose: isClose, id: id
            });
        }
    };
    ColumnMenu.prototype.setPosition = function (li, ul) {
        var gridPos = this.parent.element.getBoundingClientRect();
        var liPos = li.getBoundingClientRect();
        var left = liPos.left - gridPos.left;
        var top = liPos.top - gridPos.top;
        if (gridPos.height < top) {
            top = top - ul.offsetHeight + liPos.height;
        }
        else if (gridPos.height < top + ul.offsetHeight) {
            top = gridPos.height - ul.offsetHeight;
        }
        if (window.innerHeight < ul.offsetHeight + top + gridPos.top) {
            top = window.innerHeight - ul.offsetHeight - gridPos.top;
        }
        if (top + gridPos.top < 0) {
            top = 0;
        }
        left += (this.parent.enableRtl ? -ul.offsetWidth : liPos.width);
        if (gridPos.width <= left + ul.offsetWidth) {
            left -= liPos.width + ul.offsetWidth;
            if (liPos.left < ul.offsetWidth) {
                left = liPos.left + ul.offsetWidth / 2;
            }
        }
        else if (left < 0) {
            left += ul.offsetWidth + liPos.width;
        }
        ul.style.top = top + 'px';
        ul.style.left = left + 'px';
    };
    ColumnMenu.prototype.filterPosition = function () {
        var filterPopup = this.getFilterPop();
        if (this.parent.enableAdaptiveUI) {
            return;
        }
        filterPopup.classList.add(this.WRAP);
        if (!Browser.isDevice) {
            var disp = filterPopup.style.display;
            filterPopup.style.cssText += 'display:block;visibility:hidden';
            var li = this.element.querySelector('.' + this.FILTER);
            if (li) {
                this.setPosition(li.parentElement, filterPopup);
                filterPopup.style.cssText += 'display:' + disp + ';visibility:visible';
            }
        }
    };
    ColumnMenu.prototype.getDefault = function () {
        var items = [];
        if (this.parent.ensureModuleInjected(Resize)) {
            items.push('AutoFitAll');
            items.push('AutoFit');
        }
        if (this.parent.allowGrouping && this.parent.ensureModuleInjected(Group)) {
            items.push('Group');
            items.push('Ungroup');
        }
        if (this.parent.allowSorting && this.parent.ensureModuleInjected(Sort)) {
            items.push('SortAscending');
            items.push('SortDescending');
        }
        items.push('ColumnChooser');
        if (this.parent.allowFiltering && (this.parent.filterSettings.type !== 'FilterBar') &&
            this.parent.ensureModuleInjected(Filter)) {
            items.push('Filter');
        }
        return items;
    };
    ColumnMenu.prototype.isFilterPopupOpen = function () {
        var filterPopup = this.getFilterPop();
        return filterPopup && filterPopup.style.display !== 'none';
    };
    ColumnMenu.prototype.getFilterPop = function () {
        if (!isNullOrUndefined(this.targetColumn) && this.parent.filterSettings.type === 'Menu' && Browser.isDevice) {
            return document.getElementById(this.targetColumn.uid + '-flmdlg');
        }
        return this.parent.element.querySelector('.' + this.POP);
    };
    ColumnMenu.prototype.isFilterItemAdded = function () {
        return (this.parent.columnMenuItems &&
            this.parent.columnMenuItems.indexOf('Filter') >= 0) || !this.parent.columnMenuItems;
    };
    ColumnMenu.prototype.renderResponsiveChangeAction = function (args) {
        this.responsiveDialogRenderer.action = args.action;
    };
    return ColumnMenu;
}());
export { ColumnMenu };
