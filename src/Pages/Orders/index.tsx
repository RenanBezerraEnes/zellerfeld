import { useMemo } from 'react';
import { Button } from '@heroui/react';

import { OrdersRow } from '@components/table/OrdersRow';
import { FilterColumnMenu } from '@components/table/FilterColumnsMenu/FilterColumsMenu';
import { useOrders } from './useOrders';
import { orders } from 'Mock/DB/db.data';
import { FILTER_CONSTANTS, SORT_DIRECTION } from './types';

const COLUMNS = [
  { key: 'oid', label: 'Oid', width: 'w-12' },
  { key: 'status', label: 'Status', width: 'w-80' },
  { key: 'type', label: 'Type', width: 'w-28' },
  { key: 'lock', label: 'Lock', width: 'w-28' },
  { key: 'customer', label: 'Customer', width: 'w-28' },
  { key: 'days', label: 'Days', width: 'w-28' },
  { key: 'model', label: 'Model', width: 'w-28' },
  { key: 'designer', label: 'Designer', width: 'w-28' },
] as const;

type ColumnKey = (typeof COLUMNS)[number]['key'];

export function OrdersDashboard() {
  const {
    filters,
    sortedOrders,
    sortConfig,
    handleSort,
    resetAllFilters,
    selectAll,
    clearColumn,
    openFilters,
    toggleRow,
    expandedRows,
    handleOptionClick,
    FILTER_OPTIONS,
  } = useOrders(orders);

  const toggleRowById = useMemo(() => {
    return Object.fromEntries(sortedOrders.map((o) => [o.oid, () => toggleRow(o.oid)]));
  }, [sortedOrders, toggleRow]);

  return (
    <div className="overflow-x-auto rounded-xl shadow bg-white py-12 px-20 flex flex-col">
      <table className="min-w-full border-separate border-spacing-x-4 border-2 border-gray-500 p-5">
        <thead>
          <tr className="bg-gray-900 text-white border-b-2 border-gray-300">
            {COLUMNS.map(({ key, label, width }) => {
              const isActive = openFilters[key];
              const isFiltered =
                key === 'oid'
                  ? filters.oid !== FILTER_CONSTANTS.ALL
                  : (filters[key as Exclude<ColumnKey, 'oid'>] as string[]).length > 0;

              return (
                <th
                  key={key}
                  className={`p-0 cursor-pointer transition-colors duration-150 ${
                    width || 'w-28'
                  } py-4 ${
                    isActive ? 'bg-gray-800' : isFiltered ? 'bg-primary/80 text-white' : ''
                  }`}
                >
                  <div className="flex justify-between items-center font-bold text-xs px-2 py-3">
                    <span>{label}</span>
                    {key !== 'oid' && (
                      <span
                        className="ml-2 cursor-pointer select-none"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSort(key);
                        }}
                      >
                        {sortConfig?.column === key
                          ? sortConfig.direction === SORT_DIRECTION.ASC
                            ? '▲'
                            : '▼'
                          : '▼'}
                      </span>
                    )}
                  </div>
                </th>
              );
            })}
          </tr>

          <tr className="bg-gray-100 border-gray-300">
            {COLUMNS.map(({ key }) => (
              <td key={key} className="p-2 text-center align-top">
                {key === 'oid' ? (
                  <>
                    <div className="flex flex-col justify-between h-[120px]">
                      <Button
                        key="oid-all"
                        size="sm"
                        variant={filters.oid === FILTER_CONSTANTS.ALL ? 'solid' : 'light'}
                        color={filters.oid === FILTER_CONSTANTS.ALL ? 'primary' : 'default'}
                        className={`w-full mb-1 transition-colors duration-100 flex justify-between items-center cursor-pointer ${
                          filters.oid === FILTER_CONSTANTS.ALL
                            ? 'bg-gray-300 text-black font-bold border border-gray-400'
                            : 'bg-white hover:bg-gray-200 text-black'
                        }`}
                        onPress={() =>
                          handleOptionClick(
                            'oid',
                            filters.oid === FILTER_CONSTANTS.ALL ? '' : FILTER_CONSTANTS.ALL,
                          )
                        }
                      >
                        <span className={filters.oid === FILTER_CONSTANTS.ALL ? 'font-bold' : ''}>
                          All
                        </span>
                      </Button>
                    </div>
                    <div className="w-full flex flex-row justify-between gap-2 border-t border-gray-200 pt-2">
                      <Button
                        size="sm"
                        variant="light"
                        onPress={resetAllFilters}
                        className="text-xs w-full cursor-pointer"
                      >
                        Clear Selection
                      </Button>
                    </div>
                  </>
                ) : (
                  <FilterColumnMenu
                    col={key as Exclude<ColumnKey, 'oid'>}
                    filters={filters}
                    options={FILTER_OPTIONS[key]}
                    onOptionClick={handleOptionClick}
                    onSelectAll={selectAll}
                    onClear={clearColumn}
                  />
                )}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedOrders.map((order) => (
            <OrdersRow
              key={order.oid}
              order={order}
              expanded={!!expandedRows[String(order.oid)]}
              onToggle={toggleRowById[order.oid]}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
