import { isBrowser } from "../../utils";

interface ILocalStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

export type LocalStorageKey = "access_token" | "refresh_token" | "my_todos";

export abstract class LocalStorage<LocalStorageKey extends string, T> {
  private readonly storage: ILocalStorage;

  public constructor() {
    if (isBrowser()) {
      this.storage = window.localStorage;
    } else {
      this.storage = null;
    }
  }

  protected get(key: LocalStorageKey): T | null {
    return JSON.parse(this.storage?.getItem(key) ?? null); // is this really type safe?
  }

  protected set(key: LocalStorageKey, value: T): void {
    this.storage?.setItem(key, JSON.stringify(value)); // should be safe since the input type is defined
  }

  protected clear(key: LocalStorageKey): void {
    this.storage?.removeItem(key);
  }
}
