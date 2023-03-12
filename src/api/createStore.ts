import { Store } from "./Store";
import { Enhancer, Reducer, State } from "../types/types";

export function createStore<S extends State>(
  reducer: Reducer<S>,
  initialState?: S,
  middlewares?: Enhancer<S>[]
): Store<S> {
  let store = new Store<S>(reducer, initialState);
  if (middlewares) {
    for (let i = 0; i < middlewares.length; i += 1) {
      store = middlewares[i](store);
    }
  }

  return store;
}
