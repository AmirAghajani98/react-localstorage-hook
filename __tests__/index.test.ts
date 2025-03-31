import { renderHook, act } from "@testing-library/react";
import { useLocalStorageWithExpiry } from "../index";

describe("useLocalStorageWithExpiry", () => {
  beforeEach(() => {
    window.localStorage.clear();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should return initial value when no stored value exists", () => {
    const { result } = renderHook(() =>
      useLocalStorageWithExpiry("test-key", "initial")
    );

    expect(result.current[0]).toBe("initial");
  });

  it("should store and retrieve value", () => {
    const { result } = renderHook(() =>
      useLocalStorageWithExpiry("test-key", "initial")
    );

    act(() => {
      result.current[1]("new value");
    });

    const storedItem = window.localStorage.getItem("test-key");
    expect(result.current[0]).toBe("new value");
    expect(storedItem && JSON.parse(storedItem).value).toBe("new value");
  });

  it("should handle expiration", () => {
    const { result } = renderHook(() =>
      useLocalStorageWithExpiry("test-key", "initial", 5)
    );

    act(() => {
      result.current[1]("new value");
    });

    expect(result.current[0]).toBe("new value");

    act(() => {
      jest.advanceTimersByTime(6 * 60 * 1000);
    });

    const { result: newResult } = renderHook(() =>
      useLocalStorageWithExpiry("test-key", "initial", 5)
    );

    expect(newResult.current[0]).toBe("initial");
  });

  it("should handle invalid JSON", () => {
    const originalConsoleError = console.error;
    console.error = jest.fn();

    window.localStorage.setItem("test-key", "invalid json");

    const { result } = renderHook(() =>
      useLocalStorageWithExpiry("test-key", "initial")
    );

    expect(result.current[0]).toBe("initial");

    console.error = originalConsoleError;
  });
});
