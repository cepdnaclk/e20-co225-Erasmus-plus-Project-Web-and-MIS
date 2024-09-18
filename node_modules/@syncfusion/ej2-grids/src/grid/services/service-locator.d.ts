import { Filter } from '../actions/filter';
import { Sort } from '../actions/sort';
import { ColumnChooser } from '../actions/column-chooser';
import { ResponsiveDialogAction } from '../base/enum';
import { ColumnMenu } from '../..';
/**
 * ServiceLocator
 *
 * @hidden
 */
export declare class ServiceLocator {
    private services;
    register<T>(name: string, type: T): void;
    getService<T>(name: string): T;
    registerAdaptiveService(type: Filter | Sort | ColumnChooser | ColumnMenu, isAdaptiveUI: boolean, action: ResponsiveDialogAction): void;
}
