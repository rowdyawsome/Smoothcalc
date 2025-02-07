export type Operation = '+' | '-' | '×' | '÷' | '=' | 'C';

export const calculate = (prev: number, current: number, operation: Operation): number => {
  switch (operation) {
    case '+':
      return prev + current;
    case '-':
      return prev - current;
    case '×':
      return prev * current;
    case '÷':
      if (current === 0) return NaN;
      return prev / current;
    default:
      return current;
  }
};

export const formatNumber = (num: number): string => {
  if (isNaN(num)) return 'Error';
  const formatted = num.toString();
  if (formatted.length > 12) {
    return num.toExponential(6);
  }
  return formatted;
};