import { combineReducers } from "../src/api/combineReducers";

describe("combineReducers", () => {
  it("is a function", () => {
    expect(combineReducers).toBeInstanceOf(Function);
  });

  it("returns a function", () => {
    expect(combineReducers).toBeInstanceOf(Function);
  });

  it("returns a reducer based on the config (initial state)", () => {
    const reducer = combineReducers({
      a: (state = 2) => state,
      b: (state = "hop") => state,
    });
    expect(reducer({}, { type: "unknown" })).toEqual({
      a: 2,
      b: "hop",
    });
  });

  it("calls subreducers with proper values", () => {
    type State = { a: number; b: number };
    const config = {
      a: jest.fn((state = 5, action = {}) => state + action.payload),
      b: jest.fn((state = 6, action = {}) => state - action.payload),
    };
    const reducer = combineReducers<State, { type: string; payload: number }>(
      config
    );

    const state: State = {
      a: 55,
      b: 66,
    };
    const action1 = { type: "CHANGE_NUMBER", payload: 1 };
    const newState1 = reducer(state, { type: "CHANGE_NUMBER", payload: 1 });

    expect(config.a).toHaveBeenCalledWith(55, action1);
    expect(config.b).toHaveBeenCalledWith(66, action1);

    expect(newState1).toEqual({
      a: 56,
      b: 65,
    });

    const action2 = { type: "CHANGE_NUMBER", payload: 2 };
    const newState2 = reducer(newState1, action2);
    expect(config.a).toHaveBeenCalledWith(56, action2);
    expect(config.b).toHaveBeenCalledWith(65, action2);
    expect(newState2).toEqual({
      a: 58,
      b: 63,
    });
  });
});
