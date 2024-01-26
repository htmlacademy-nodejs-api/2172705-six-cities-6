export interface IRESTConfig<S> {
  get<K extends keyof S>(key: K): S[K];
}
