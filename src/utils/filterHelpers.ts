import type { Filters, FilterColumn } from '@pages/Orders/types';
import { FILTER_CONSTANTS } from '@pages/Orders/types';

export function matchesFilter<T extends string | number>(
  filter: T[] | string,
  value: T,
  allMatch: boolean = false,
): boolean {
  if (Array.isArray(filter)) return filter.length === 0 || filter.includes(value);
  if (allMatch)
    return !filter || filter === FILTER_CONSTANTS.ALL || String(value) === String(filter);
  return !filter || String(value) === String(filter);
}

export const FILTER_KEYS = (initialFilters: Filters) =>
  Object.keys(initialFilters).filter((key) => key !== 'oid') as Exclude<FilterColumn, 'oid'>[];

export function getAllFiltersSelected(
  initialFilters: Filters,
  FILTER_OPTIONS: Record<string, string[]>,
): Filters {
  const allFilters: Filters = { ...initialFilters, oid: FILTER_CONSTANTS.ALL };
  for (const key of FILTER_KEYS(initialFilters)) {
    allFilters[key] = [...FILTER_OPTIONS[key]];
  }
  return allFilters;
}

export function getFiltersWithAllSelected(
  initialFilters: Filters,
  FILTER_OPTIONS: Record<string, string[]>,
): Filters {
  return getAllFiltersSelected(initialFilters, FILTER_OPTIONS);
}
