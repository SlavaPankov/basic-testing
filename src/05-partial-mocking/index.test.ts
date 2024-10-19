// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule = jest.requireActual<typeof import('./index')>('./index');

  return {
    ...originalModule,
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    mockOne();
    expect(mockOne).toHaveBeenCalledTimes(1);

    mockTwo();
    expect(mockTwo).toHaveBeenCalledTimes(1);

    mockThree();
    expect(mockThree).toHaveBeenCalledTimes(1);

    expect(jest.spyOn(console, 'log').mockImplementation(() => {})).not.toHaveBeenCalled();
  });

  test('unmockedFunction should log into console', () => {
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    unmockedFunction();
    expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    expect(consoleLogSpy).toHaveBeenCalled();
  });
});
