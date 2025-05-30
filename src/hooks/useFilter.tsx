import { useState, useEffect } from "react";

export const useFilter = <T extends Record<string, any>>(initialState: T) => {
  const parseFromQuery = (): T => {
    const params = new URLSearchParams(window.location.search);
    const parsed = { ...initialState };

    Object.entries(initialState).forEach(([key, defaultValue]) => {
      const param = params.get(key);

      if (param === null) return;

      if (Array.isArray(defaultValue)) {
        const parts = param.split(",").map(Number);
        if (
          parts.length === defaultValue.length &&
          parts.every((n) => !isNaN(n))
        ) {
          (parsed as any)[key] = parts;
        }
      } else if (typeof defaultValue === "number") {
        const num = Number(param);
        (parsed as any)[key] = isNaN(num) ? defaultValue : num;
      } else {
        (parsed as any)[key] = param;
      }
    });

    return parsed;
  };

  const [state, setState] = useState<T>(parseFromQuery);

  const updateQueryParams = (initial: T, current: T) => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);

    Object.entries(current).forEach(([key, value]) => {
      const initialValue = initial[key as keyof T];

      const isDefault = JSON.stringify(value) === JSON.stringify(initialValue);
      const isEmpty = value === null || value === undefined || value === "";

      if (isEmpty || isDefault) {
        params.delete(key);
      } else {
        if (Array.isArray(value)) {
          params.set(key, value.join(","));
        } else {
          params.set(key, String(value));
        }
      }
    });

    const newUrl = `${url.pathname}?${params.toString()}`;
    window.history.replaceState({}, "", newUrl);
  };

  const updateFilter = <K extends keyof T>(key: K, val: T[K]) =>
    setState((prev) => {
      const newState = { ...prev, [key]: val };
      updateQueryParams(initialState, newState);
      return newState;
    });

  const resetFilter = <K extends keyof T>(key: K) =>
    setState((prev) => {
      const newState = { ...prev, [key]: initialState[key] };
      updateQueryParams(initialState, newState);
      return newState;
    });

  const resetAllFilter = () => {
    updateQueryParams(initialState, initialState);
    setState(initialState);
  };

  const canReset = () => {
    return Object.keys(initialState).some((key) => {
      const current = state[key as keyof T];
      const initial = initialState[key as keyof T];
      return JSON.stringify(current) !== JSON.stringify(initial);
    });
  };

  useEffect(() => {
    const parsed = parseFromQuery();
    setState(parsed);
  }, []);

  return {
    currentFilters: state,
    updateFilter,
    resetFilter,
    resetAllFilter,
    canReset: canReset(),
  };
};
