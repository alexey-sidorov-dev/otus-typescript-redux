import { Action } from "../types/types";

export function createAction<T extends string = string, P = unknown>(
  type: T,
  payload: P
): Action<T, P> {
  return { type, payload };
}
