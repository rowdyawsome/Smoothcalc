import { cn } from "@/lib/utils";

interface CalculatorButtonProps {
  value: string;
  onClick: () => void;
  variant?: 'default' | 'operator' | 'equals' | 'clear';
}

export const CalculatorButton = ({ value, onClick, variant = 'default' }: CalculatorButtonProps) => {
  return (
    <button
      className={cn(
        'calculator-button',
        {
          'operator': variant === 'operator',
          'equals': variant === 'equals',
          'clear': variant === 'clear',
        }
      )}
      onClick={onClick}
    >
      {value}
    </button>
  );
};