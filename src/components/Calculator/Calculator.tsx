import { useState } from 'react';
import { CalculatorButton } from './CalculatorButton';
import { CalculatorDisplay } from './CalculatorDisplay';
import { Operation, calculate, formatNumber } from '@/lib/calculator';

export const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operation, setOperation] = useState<Operation | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);
  const [expression, setExpression] = useState('');

  const inputDigit = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplay(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay('0.');
      setWaitingForSecondOperand(false);
      return;
    }

    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperator = (nextOperator: Operation) => {
    const inputValue = parseFloat(display);

    if (nextOperator === 'C') {
      setDisplay('0');
      setFirstOperand(null);
      setOperation(null);
      setWaitingForSecondOperand(false);
      setExpression('');
      return;
    }

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operation) {
      const result = calculate(firstOperand, inputValue, operation);
      setDisplay(formatNumber(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperation(nextOperator);
    setExpression(`${inputValue} ${nextOperator}`);
  };

  return (
    <div className="calculator-grid">
      <CalculatorDisplay value={display} expression={expression} />
      
      <CalculatorButton value="C" onClick={() => handleOperator('C')} variant="clear" />
      <CalculatorButton value="±" onClick={() => setDisplay(String(-parseFloat(display)))} variant="operator" />
      <CalculatorButton value="%" onClick={() => setDisplay(String(parseFloat(display) / 100))} variant="operator" />
      <CalculatorButton value="÷" onClick={() => handleOperator('÷')} variant="operator" />

      <CalculatorButton value="7" onClick={() => inputDigit('7')} />
      <CalculatorButton value="8" onClick={() => inputDigit('8')} />
      <CalculatorButton value="9" onClick={() => inputDigit('9')} />
      <CalculatorButton value="×" onClick={() => handleOperator('×')} variant="operator" />

      <CalculatorButton value="4" onClick={() => inputDigit('4')} />
      <CalculatorButton value="5" onClick={() => inputDigit('5')} />
      <CalculatorButton value="6" onClick={() => inputDigit('6')} />
      <CalculatorButton value="-" onClick={() => handleOperator('-')} variant="operator" />

      <CalculatorButton value="1" onClick={() => inputDigit('1')} />
      <CalculatorButton value="2" onClick={() => inputDigit('2')} />
      <CalculatorButton value="3" onClick={() => inputDigit('3')} />
      <CalculatorButton value="+" onClick={() => handleOperator('+')} variant="operator" />

      <CalculatorButton value="0" onClick={() => inputDigit('0')} />
      <CalculatorButton value="." onClick={inputDecimal} />
      <CalculatorButton value="=" onClick={() => handleOperator('=')} variant="equals" />
    </div>
  );
};