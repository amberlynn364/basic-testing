import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;

    doStuffByTimeout(callback, timeout);

    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(timeout);

    expect(callback).toBeCalled();
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 2000;

    doStuffByTimeout(callback, timeout);

    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(timeout - 1000);

    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(1000);

    expect(callback).toBeCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const interval = 500;

    doStuffByInterval(callback, interval);

    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(interval);

    expect(callback).toBeCalled();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const interval = 1000;

    doStuffByInterval(callback, interval);

    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(interval);

    expect(callback).toBeCalledTimes(1);

    jest.advanceTimersByTime(interval);

    expect(callback).toBeCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const mockJoin = jest.spyOn(path, 'join');

    await readFileAsynchronously('test.txt');

    expect(mockJoin).toHaveBeenCalledWith(__dirname, 'test.txt');
  });

  test('should return null if file does not exist', async () => {
    const fileContent = await readFileAsynchronously('nonexistent-file.txt');

    expect(fileContent).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const filePath = 'forTest.txt';
    const fileContent = 'Hello, World!';

    const content = await readFileAsynchronously(filePath);

    expect(content).toBe(fileContent);
  });
});
