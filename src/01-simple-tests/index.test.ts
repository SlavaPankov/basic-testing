// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 2, action: Action.Add})).toBe(4);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 2, action: Action.Subtract})).toBe(0);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 3, b: 3, action: Action.Multiply})).toBe(9);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 9, b: 3, action: Action.Divide})).toBe(3);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 10, b: 2, action: Action.Exponentiate})).toBe(100);  
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 10, b: 2, action: 'Invalid action'})).toBeNull();  
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: '10', b: 2, action: Action.Add})).toBeNull();  
    expect(simpleCalculator({ a: 10, b: '2', action: Action.Add})).toBeNull();  
    expect(simpleCalculator({ a: null, b: 2, action: Action.Add})).toBeNull();  
    expect(simpleCalculator({ a: 10, b: null, action: Action.Add})).toBeNull();  
    expect(simpleCalculator({ a: undefined, b: 2, action: Action.Add})).toBeNull();  
    expect(simpleCalculator({ a: 10, b: undefined, action: Action.Add})).toBeNull();  
  });
});
