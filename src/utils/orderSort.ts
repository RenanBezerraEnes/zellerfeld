import type { Order } from '@pages/Orders/types';
import type { FilterColumn } from '@pages/Orders/types';

export function getSortValue(order: Order, col: FilterColumn): string | number {
  switch (col) {
    case 'status':
      return `${order.statusLeft} ${order.statusRight}`;
    case 'days':
      return order.daysSinceOrder;
    default:
      return order[col] ?? '';
  }
}

export function compareSortValues(
  a: string | number,
  b: string | number,
  direction: 'asc' | 'desc',
): number {
  if (typeof a === 'number' && typeof b === 'number') {
    return direction === 'asc' ? a - b : b - a;
  }
  if (a === '' && b !== '') return direction === 'asc' ? -1 : 1;
  if (b === '' && a !== '') return direction === 'asc' ? 1 : -1;

  const aStr = String(a);
  const bStr = String(b);

  return direction === 'asc' ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr);
}
