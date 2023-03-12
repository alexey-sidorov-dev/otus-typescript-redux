import { State, Reducer, Listener, Action, Unsubscriber } from "../types/types";

export class Store<S extends State = State> {
  private state: S = <S>{};

  private reducer: Reducer<S> | undefined;

  private subscribers: Set<Listener> = new Set<Listener>();

  public constructor(reducer?: Reducer<S>, initialState?: S) {
    this.reducer = reducer;
    this.state = initialState ?? this.state;
  }

  dispatch(action: Action): void {
    this.state =
      typeof this.reducer === "function"
        ? this.reduce(this.state, action)
        : this.state;
    this.subscribers.forEach((fn) =>
      typeof fn === "function" ? fn(this.state) : this.state
    );
  }

  getState(): S {
    return this.state;
  }

  subscribe(listener: Listener): Unsubscriber {
    this.subscribers.add(listener);

    return () => {
      this.subscribers.delete(listener);
    };
  }

  replaceReducer(nextReducer: Reducer<S>): void {
    if (typeof nextReducer === "function") {
      this.reducer = nextReducer;
    }
  }

  private reduce(state: S, action: Action): S {
    return typeof this.reducer === "function"
      ? this.reducer(state, action)
      : state;
  }
}
