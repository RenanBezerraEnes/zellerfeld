import { Button } from '@heroui/react';
import type { FilterColumnMenuProps } from './types';
import { getFilterButtonProps } from '@styles/buttonStyles';
import { CheckIcon } from 'lucide-react';

export const FilterColumnMenu = ({
  col,
  filters,
  options,
  onOptionClick,
  onSelectAll,
  onClear,
}: FilterColumnMenuProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div onClick={handleClick} className="relative">
      <div className="flex-1 w-full max-h-32 overflow-y-auto flex flex-col gap-1 items-center">
        {options.map((option) => {
          const isSelected = filters[col].includes(option);
          return (
            <Button
              key={option}
              size="sm"
              {...getFilterButtonProps({ selected: isSelected })}
              onPress={() => onOptionClick(col, option)}
            >
              <span>{option}</span>
              {isSelected && <CheckIcon className="ml-1 w-4 h-4 text-green-600" />}
            </Button>
          );
        })}
      </div>
      <div className="w-full flex flex-row justify-between gap-2 border-t border-gray-200 pt-4">
        <Button
          size="sm"
          variant="light"
          onPress={() => onSelectAll(col)}
          className="text-xs w-full cursor-pointer"
        >
          Select All
        </Button>
        <Button
          size="sm"
          variant="light"
          onPress={() => onClear(col)}
          className="text-xs w-full cursor-pointer"
        >
          Clear
        </Button>
      </div>
    </div>
  );
};
