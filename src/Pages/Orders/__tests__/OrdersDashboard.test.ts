import { renderHook, act } from '@testing-library/react';
import { useOrders } from '../useOrders';
import type { UseOrderDashboardLogicResult } from '../types';

const mockOrders = [
  {
    oid: 12845,
    statusLeft: 'Ready for Packaging',
    statusRight: 'Ready for Packaging',
    type: 'Sample',
    lock: 'Model not released',
    customer: 'Peter Maffei',
    daysSinceOrder: 5,
    model: 'Nami',
    designer: 'Finn Rush Taylor',
  },
  {
    oid: 12345,
    statusLeft: 'Drying',
    statusRight: 'Ready for Packaging',
    type: 'Sample',
    lock: 'Address Issue',
    customer: 'Peter Orloff',
    daysSinceOrder: 5,
    model: 'Nami',
    designer: 'Finn Rush Taylor',
  },
];

describe('useOrders hook', () => {
  let result: { current: UseOrderDashboardLogicResult };

  beforeEach(() => {
    const { result: hookResult } = renderHook(() => useOrders(mockOrders));
    result = hookResult;
  });

  it('initializes with default filters and sorted orders', () => {
    expect(result.current.sortedOrders).toEqual(mockOrders);
  });

  it('filters orders based on status', () => {
    act(() => {
      result.current.setFilters({
        ...result.current.filters,
        status: ['Ready for Packaging'],
      });
    });

    const filtered = result.current.filteredOrders;

    expect(filtered).toEqual([
      {
        oid: 12845,
        statusLeft: 'Ready for Packaging',
        statusRight: 'Ready for Packaging',
        type: 'Sample',
        lock: 'Model not released',
        customer: 'Peter Maffei',
        daysSinceOrder: 5,
        model: 'Nami',
        designer: 'Finn Rush Taylor',
      },
      {
        oid: 12345,
        statusLeft: 'Drying',
        statusRight: 'Ready for Packaging',
        type: 'Sample',
        lock: 'Address Issue',
        customer: 'Peter Orloff',
        daysSinceOrder: 5,
        model: 'Nami',
        designer: 'Finn Rush Taylor',
      },
    ]);
  });

  it('filters orders with multiple filters', () => {
    act(() => {
      result.current.setFilters({
        ...result.current.filters,
        status: ['Drying'],
        customer: ['Peter Orloff'],
      });
    });

    expect(result.current.filteredOrders).toEqual([
      expect.objectContaining({ customer: 'Peter Orloff', statusLeft: 'Drying' }),
    ]);
  });

  it('FILTER_OPTIONS contains expected unique values', () => {
    expect(result.current.FILTER_OPTIONS.status.sort()).toEqual(
      ['Drying', 'Ready for Packaging'].sort(),
    );
    expect(result.current.FILTER_OPTIONS.customer).toEqual(['Peter Maffei', 'Peter Orloff']);
  });

  it('resets all filters', () => {
    act(() => {
      result.current.setFilters({
        ...result.current.filters,
        status: ['QC'],
      });
    });

    expect(result.current.filteredOrders.length).toBeLessThan(mockOrders.length);

    act(() => {
      result.current.resetAllFilters();
    });

    expect(result.current.filteredOrders).toEqual(mockOrders);
  });

  it('sorts orders by column and toggles direction', () => {
    act(() => {
      result.current.setSortConfig({ column: 'status', direction: 'asc' });
    });

    expect(result.current.sortedOrders[0].statusLeft).toBe('Drying');

    act(() => {
      result.current.setSortConfig({ column: 'status', direction: 'desc' });
    });
    expect(result.current.sortedOrders[0].statusLeft).toBe('Ready for Packaging');
  });

  it('handleSort works correctly', () => {
    act(() => {
      result.current.handleSort('status');
    });

    expect(result.current.sortConfig).toEqual({ column: 'status', direction: 'asc' });

    act(() => {
      result.current.handleSort('status');
    });
    expect(result.current.sortConfig).toEqual({ column: 'status', direction: 'desc' });

    act(() => {
      result.current.handleSort('type');
    });
    expect(result.current.sortConfig).toEqual({ column: 'type', direction: 'asc' });
  });

  it('Toggles expanded rows', () => {
    act(() => {
      result.current.toggleRow(12845);
    });
    expect(result.current.expandedRows[12845]).toBe(true);

    act(() => {
      result.current.toggleRow(12845);
    });
    expect(result.current.expandedRows[12845]).toBe(false);
  });

  it('selectAll work correctly', () => {
    act(() => {
      result.current.selectAll('status');
    });
    expect(result.current.filters.status).toEqual(['Ready for Packaging', 'Drying']);
  });

  it('clear Colums works correctly', () => {
    act(() => {
      result.current.clearColumn('status');
    });
    expect(result.current.filters.status).toEqual([]);
  });

  it('selectAllFilters works correctly', () => {
    act(() => {
      result.current.selectAllFilters();
    });

    expect(result.current.filters.status).toEqual(['Ready for Packaging', 'Drying']);
    expect(result.current.filters.type).toEqual(['Sample']);
    expect(result.current.filters.lock).toEqual(['Model not released', 'Address Issue']);
    expect(result.current.filters.customer).toEqual(['Peter Maffei', 'Peter Orloff']);
    expect(result.current.filters.days).toEqual(['<5', '<15', '<30', '<60']);
    expect(result.current.filters.model).toEqual(['Nami']);
    expect(result.current.filters.designer).toEqual(['Finn Rush Taylor']);
  });

  it('handleOptionClick works correctly for filters within OID', () => {
    act(() => {
      result.current.handleOptionClick('status', 'Ready for Packaging');
    });

    expect(result.current.filters.status).toEqual(['Ready for Packaging']);

    act(() => {
      result.current.handleOptionClick('status', 'Ready for Packaging');
    });
    expect(result.current.filters.status).toEqual([]);
  });

  it('handleOptionClick for oid toggles between All and reset', () => {
    act(() => {
      result.current.handleOptionClick('oid', 'All');
    });

    expect(result.current.filters.status).toEqual(result.current.FILTER_OPTIONS.status);
    expect(result.current.filters.type).toEqual(result.current.FILTER_OPTIONS.type);
    expect(result.current.filters.lock).toEqual(result.current.FILTER_OPTIONS.lock);
    expect(result.current.filters.customer).toEqual(result.current.FILTER_OPTIONS.customer);
    expect(result.current.filters.days).toEqual(result.current.FILTER_OPTIONS.days);
    expect(result.current.filters.model).toEqual(result.current.FILTER_OPTIONS.model);
    expect(result.current.filters.designer).toEqual(result.current.FILTER_OPTIONS.designer);

    act(() => {
      result.current.handleOptionClick('oid', '');
    });

    expect(result.current.filters).toEqual({
      ...result.current.filters,
      ...{
        oid: '',
        status: [],
        type: [],
        lock: [],
        customer: [],
        days: [],
        model: [],
        designer: [],
      },
    });
  });
});
