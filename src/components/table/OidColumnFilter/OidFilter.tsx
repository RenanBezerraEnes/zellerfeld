import { Button } from '@heroui/react';
import { FILTER_CONSTANTS, type FilterColumn } from '@pages/Orders/types';

interface OidFilterProps {
  filters: {
    oid: string;
  };
  onOptionClick: (column: FilterColumn, option: string) => void;
  onResetAllFilters: () => void;
}

export function OidFilter({ filters, onOptionClick, onResetAllFilters }: OidFilterProps) {
  return (
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
            onOptionClick('oid', filters.oid === FILTER_CONSTANTS.ALL ? '' : FILTER_CONSTANTS.ALL)
          }
        >
          <span className={filters.oid === FILTER_CONSTANTS.ALL ? 'font-bold' : ''}>All</span>
        </Button>
      </div>
      <div className="w-full flex flex-row justify-between gap-2 border-t border-gray-200 pt-2">
        <Button
          size="sm"
          variant="light"
          onPress={onResetAllFilters}
          className="text-xs w-full cursor-pointer"
        >
          Clear Selection
        </Button>
      </div>
    </>
  );
}
