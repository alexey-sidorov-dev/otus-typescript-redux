import { Action, ReducersMap, State } from "../types/types";

export function combineReducers<S extends State, A extends Action = Action>(
  reducersMap: ReducersMap<S>
) {
  return function combinationReducer(state: S, action: A) {
    const nextState: S = <S>{};

    Object.entries(reducersMap).forEach(([key, reducer]) => {
      nextState[key as keyof S] = reducer(state[key], action);
    });

    return nextState;
  };
}
