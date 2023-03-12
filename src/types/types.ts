import { Store } from "../api/Store";

export type Action<T extends string = string, P = unknown> = {
  type: T;
  payload?: P;
};

export type State = Record<string, unknown>;

export type Reducer<S extends State, A extends Action = Action> = (
  state: S | undefined,
  action: A
) => S;

export type ReducersMap<S extends State, A extends Action = Action> = {
  [key in keyof S]: (state: S[key] | undefined, action: A) => S[key];
};

export type Listener = (state: State) => void;

export interface IStore<S extends State> {
  getState(): S | undefined;
  dispatch(action: Action): unknown;
  subscribe(listener: Listener): Unsubscriber;
  replaceReducer(nextReducer: Reducer<S>): void;
}

export type Enhancer<S extends State> = (store: Store<S>) => Store<S>;

export type StoreCreator<S extends State> = (
  reducer: Reducer<S>,
  preloadedState?: S,
  middlewares?: Middleware<S>[]
) => IStore<S>;

export type Middleware<S extends State> = (
  store: IStore<S>
) => (next: (action: Action) => unknown) => (action: Action) => unknown;

export interface Subscriber {
  (listener: Listener): Unsubscriber;
}

export interface Unsubscriber {
  (): void;
}

export type CombineReducers<
  S extends State = State,
  A extends Action = Action
> = (config: {
  [key in keyof S]: (state: S[key] | undefined, action: A) => S[key];
}) => (
  state:
    | {
        [key in keyof S]: S[key];
      }
    | undefined,
  action: A
) => {
  [key in keyof S]: S[key];
};

export type EpmtyObject = Record<string, never>;

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export type GenericObject = Record<string, any>;

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export type GenericFunction = (...args: any[]) => any;
