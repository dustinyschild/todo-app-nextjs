import {
  LocalStorage,
  LocalStorageKey
} from "../types/services/localStorageService";

export default class StorageService<T> extends LocalStorage<
  LocalStorageKey,
  T
> {
  private key: LocalStorageKey;

  constructor(key: LocalStorageKey) {
    super();
    this.key = key;
  }

  public initializeData(defaultValue: T) {
    this.setData(defaultValue);
  }

  public getData() {
    return this.get(this.key);
  }

  public setData(data: T) {
    this.set(this.key, data);
  }

  public clearData() {
    this.clear(this.key);
  }
}
