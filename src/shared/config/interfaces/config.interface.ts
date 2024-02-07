export interface IConfig<S> {
  get<K extends keyof S>(key: K): S[K];
}
