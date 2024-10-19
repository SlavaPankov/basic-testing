// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';

jest.mock('fs');
jest.mock('fs/promises');

let callback: jest.Mock;
const ms = 1000;

beforeEach(() => {
  jest.useFakeTimers();
  callback = jest.fn();
  jest.spyOn(global, 'setTimeout');
  jest.spyOn(global, 'setInterval');
});

afterEach(() => {
  jest.clearAllMocks();
  jest.useRealTimers();
});

describe('doStuffByTimeout', () => {
  test('should set timeout with provided callback and timeout', () => {
    doStuffByTimeout(callback, ms);
    
    expect(setTimeout).toHaveBeenCalledWith(callback, ms);
    
    jest.runAllTimers();
    
    expect(callback).toHaveBeenCalled();
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(callback, ms);

    expect(callback).not.toHaveBeenCalled();
    
    jest.advanceTimersByTime(ms);
    
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  test('should set interval with provided callback and timeout', () => {
    doStuffByInterval(callback, ms);

    expect(setInterval).toHaveBeenCalledWith(callback, ms);
  });

  test('should call callback multiple times after multiple intervals', () => {
    doStuffByInterval(callback, ms);
    
    expect(setInterval).toHaveBeenCalledWith(callback, ms);
    
    for (let i = 0; i < 5; i++) {
      jest.advanceTimersByTime(ms);
    }
    
    expect(callback).toHaveBeenCalledTimes(5);
  });
});

describe('readFileAsynchronously', () => {
  const fileTxt = 'readme.txt';
  const fileContent = 'File content';
  
  test('should call join with pathToFile', async () => {
    const joinSpy = jest
      .spyOn(path, 'join')
      .mockReturnValue('mocked/path/to/readme.txt');
  
    await readFileAsynchronously(fileTxt);
  
    expect(joinSpy).toHaveBeenCalledWith(__dirname, fileTxt);
  
    joinSpy.mockRestore();
  });

  test('should call join with pathToFile', async () => {
    (existsSync as jest.Mock).mockReturnValue(false);
  
    const result = await readFileAsynchronously(fileTxt);
  
    expect(result).toBeNull();
  });

  test('should return null if file does not exist', async () => {
    (existsSync as jest.Mock).mockReturnValue(false);
  
    const result = await readFileAsynchronously(fileTxt);
  
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    (existsSync as jest.Mock).mockReturnValue(true);
  
    (readFile as jest.Mock).mockReturnValue(fileContent);
  
    const result = await readFileAsynchronously(fileTxt);
    
    expect(result).toBe(fileContent);
  });
});
