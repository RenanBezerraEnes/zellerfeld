import type { FilterColumn, Filters } from '../../../Pages/Orders/types';

export interface FilterColumnMenuProps {
  col: Exclude<FilterColumn, 'oid'>;
  filters: Filters;
  options: string[];
  onOptionClick: (col: FilterColumn, option: string) => void;
  onSelectAll: (col: Exclude<FilterColumn, 'oid'>) => void;
  onClear: (col: Exclude<FilterColumn, 'oid'>) => void;
}
