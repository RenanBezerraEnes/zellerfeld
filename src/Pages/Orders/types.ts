export interface Order {
  oid: number;
  statusLeft: string;
  statusRight: string;
  type: string;
  lock: string;
  customer: string;
  daysSinceOrder: number;
  model: string;
  designer: string;
}

export const FILTER_CONSTANTS = {
  ALL: 'All',
  DAYS_RANGES: {
    LESS_THAN_5: '<5',
    LESS_THAN_15: '<15',
    LESS_THAN_30: '<30',
    LESS_THAN_60: '<60',
  },
} as const;

export const SORT_DIRECTION = {
  ASC: 'asc',
  DESC: 'desc',
} as const;

export type SortDirection = (typeof SORT_DIRECTION)[keyof typeof SORT_DIRECTION];

export const DAYS_RANGE_VALUES = {
  [FILTER_CONSTANTS.DAYS_RANGES.LESS_THAN_5]: 5,
  [FILTER_CONSTANTS.DAYS_RANGES.LESS_THAN_15]: 15,
  [FILTER_CONSTANTS.DAYS_RANGES.LESS_THAN_30]: 30,
  [FILTER_CONSTANTS.DAYS_RANGES.LESS_THAN_60]: 60,
} as const;

export type Filters = {
  oid: string;
  status: string[];
  type: string[];
  lock: string[];
  customer: string[];
  days: string[];
  model: string[];
  designer: string[];
};

export type FilterColumn =
  | 'oid'
  | 'status'
  | 'type'
  | 'lock'
  | 'customer'
  | 'days'
  | 'model'
  | 'designer';

export const initialFilters: Filters = {
  oid: '',
  status: [],
  type: [],
  lock: [],
  customer: [],
  days: [],
  model: [],
  designer: [],
};

export interface UseOrderDashboardLogicResult {
  filters: Filters;
  setFilters: (filters: Filters) => void;
  filteredOrders: Order[];
  sortedOrders: Order[];
  sortConfig: { column: FilterColumn; direction: 'asc' | 'desc' } | null;
  setSortConfig: (config: { column: FilterColumn; direction: 'asc' | 'desc' } | null) => void;
  handleSort: (column: FilterColumn) => void;
  resetAllFilters: () => void;
  selectAll: (column: Exclude<FilterColumn, 'oid'>) => void;
  clearColumn: (column: Exclude<FilterColumn, 'oid'>) => void;
  FILTER_OPTIONS: Record<FilterColumn, string[]>;
  selectAllFilters: () => void;
  handleOptionClick: (column: FilterColumn, option: string) => void;
  openFilters: Record<FilterColumn, boolean>;
  toggleRow: (oid: string | number) => void;
  expandedRows: Record<string, boolean>;
  setExpandedRows: (rows: Record<string, boolean>) => void;
}
