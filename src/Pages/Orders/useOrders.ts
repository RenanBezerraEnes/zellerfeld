import { useState, useMemo, useCallback } from 'react';
import {
  type Order,
  type Filters,
  type FilterColumn,
  type UseOrderDashboardLogicResult,
  initialFilters,
  DAYS_RANGE_VALUES,
} from './types';
import { matchesFilter, getAllFiltersSelected } from '@utils/filterHelpers';
import { getSortValue, compareSortValues } from '@utils/orderSort';

function unique<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

export function useOrders(orders: Order[]): UseOrderDashboardLogicResult {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [sortConfig, setSortConfig] = useState<{
    column: FilterColumn;
    direction: 'asc' | 'desc';
  } | null>(null);
  const [openFilters] = useState<Record<FilterColumn, boolean>>({
    oid: false,
    status: false,
    type: false,
    lock: false,
    customer: false,
    days: false,
    model: false,
    designer: false,
  });
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  const FILTER_OPTIONS = useMemo(() => {
    return {
      oid: [''],
      status: unique([...orders.map((o) => o.statusLeft), ...orders.map((o) => o.statusRight)]),
      type: unique(orders.map((o) => o.type)),
      lock: unique(orders.map((o) => o.lock).filter(Boolean)),
      customer: unique(orders.map((o) => o.customer)),
      days: ['<5', '<15', '<30', '<60'],
      model: unique(orders.map((o) => o.model)),
      designer: unique(orders.map((o) => o.designer)),
    };
  }, [orders]);

  const filteredOrders = useMemo(() => {
    return orders.filter(
      (order) =>
        matchesFilter(filters.oid, order.oid, true) &&
        (matchesFilter(filters.status, order.statusLeft) ||
          matchesFilter(filters.status, order.statusRight)) &&
        matchesFilter(filters.type, order.type) &&
        matchesFilter(filters.lock, order.lock) &&
        matchesFilter(filters.customer, order.customer) &&
        (filters.days.length === 0 ||
          filters.days.some(
            (d) =>
              d in DAYS_RANGE_VALUES &&
              order.daysSinceOrder < DAYS_RANGE_VALUES[d as keyof typeof DAYS_RANGE_VALUES],
          )) &&
        matchesFilter(filters.model, order.model) &&
        matchesFilter(filters.designer, order.designer),
    );
  }, [orders, filters]);

  const resetAllFilters = useCallback(() => setFilters(initialFilters), []);

  const sortedOrders = useMemo(() => {
    return sortConfig
      ? [...filteredOrders].sort((a, b) =>
          compareSortValues(
            getSortValue(a, sortConfig.column),
            getSortValue(b, sortConfig.column),
            sortConfig.direction,
          ),
        )
      : filteredOrders;
  }, [filteredOrders, sortConfig]);

  const handleSort = useCallback((column: FilterColumn) => {
    setSortConfig((prev) => {
      if (prev && prev.column === column) {
        return { column, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { column, direction: 'asc' };
    });
  }, []);

  const selectAll = (column: Exclude<FilterColumn, 'oid'>) => {
    setFilters((f) => ({ ...f, [column]: [...FILTER_OPTIONS[column]] }));
  };
  const clearColumn = (column: Exclude<FilterColumn, 'oid'>) => {
    setFilters((f) => ({ ...f, [column]: [] }));
  };

  const selectAllFilters = () => {
    setFilters(getAllFiltersSelected(initialFilters, FILTER_OPTIONS));
  };

  const handleOptionClick = useCallback(
    (column: FilterColumn, option: string) => {
      if (column === 'oid') {
        if (filters.oid === 'All') {
          resetAllFilters();
        } else {
          setFilters(getAllFiltersSelected(initialFilters, FILTER_OPTIONS));
        }
        return;
      }

      setFilters((prev) => {
        const arr = prev[column as Exclude<FilterColumn, 'oid'>];
        return arr.includes(option)
          ? { ...prev, [column]: arr.filter((v) => v !== option) }
          : { ...prev, [column]: [...arr, option] };
      });
    },
    [filters.oid, resetAllFilters, FILTER_OPTIONS],
  );

  const toggleRow = useCallback((oid: string | number) => {
    setExpandedRows((prev) => ({
      ...prev,
      [String(oid)]: !prev[String(oid)],
    }));
  }, []);

  return {
    filters,
    setFilters,
    filteredOrders,
    sortedOrders,
    sortConfig,
    setSortConfig,
    handleSort,
    resetAllFilters,
    selectAll,
    clearColumn,
    FILTER_OPTIONS,
    selectAllFilters,
    handleOptionClick,
    openFilters,
    toggleRow,
    expandedRows,
    setExpandedRows,
  };
}
