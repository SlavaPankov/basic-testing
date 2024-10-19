import {  simpleCalculator, Action } from './index';

const testCases = [
    { a: 1, b: 2, action: Action.Add, expected: 3 },
    { a: 2, b: 2, action: Action.Subtract, expected: 0 },
    { a: 3, b: 2, action: Action.Multiply, expected: 6 },
    { a: 6, b: 2, action: Action.Divide, expected: 3 },
    { a: 6, b: 2, action: Action.Exponentiate, expected: 36 },
    { a: 6, b: 2, action: 'Invalid action', expected: null },
    { a: '6', b: 2, action: Action.Add, expected: null },
    { a: 6, b: '2', action: Action.Add, expected: null },
    { a: null, b: 2, action: Action.Add, expected: null },
    { a: 1, b: null, action: Action.Add, expected: null },
    { a: undefined, b: 1, action: Action.Add, expected: null },
    { a: 1, b: undefined, action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'table tests', 
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    }
  );
});
