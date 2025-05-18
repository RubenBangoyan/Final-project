export const StorageService = {
  getItem<T = unknown>(
    storageKey: string,
    forceType?: "string"
  ): T | string | null {
    const rawValue = window.localStorage.getItem(storageKey);
    if (rawValue === null) return null;

    let value: T;
    try {
      value = JSON.parse(rawValue);
    } catch {
      value = rawValue as unknown as T;
    }

    if (forceType === "string") {
      return String(value);
    }

    return value;
  },

  setItem(storageKey: string, value: unknown): void {
    window.localStorage.setItem(storageKey, JSON.stringify(value));
  },
};
