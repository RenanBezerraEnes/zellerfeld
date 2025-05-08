type ButtonStyleProps = {
  selected: boolean;
  baseClassName?: string;
};

export const getFilterButtonProps = ({ selected, baseClassName = '' }: ButtonStyleProps) => {
  const variant: 'solid' | 'light' = selected ? 'solid' : 'light';
  const color: 'primary' | 'default' = selected ? 'primary' : 'default';

  return {
    variant,
    color,
    className: `
        w-full mb-1 transition-colors duration-100 flex justify-between items-center cursor-pointer
        ${
          selected
            ? 'bg-gray-300 text-black font-bold border border-gray-400'
            : 'bg-white hover:bg-gray-200 text-black'
        }
        ${baseClassName}
      `.trim(),
  };
};
