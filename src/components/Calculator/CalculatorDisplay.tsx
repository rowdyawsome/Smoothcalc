interface CalculatorDisplayProps {
  value: string;
  expression: string;
}

export const CalculatorDisplay = ({ value, expression }: CalculatorDisplayProps) => {
  return (
    <div className="calculator-display">
      <div className="text-sm text-gray-500 mb-1">{expression || '\u00A0'}</div>
      <div className="text-3xl font-semibold">{value}</div>
    </div>
  );
};