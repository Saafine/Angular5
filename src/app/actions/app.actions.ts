import { Action } from '@ngrx/store';

export const SET_TEST = 'SET_TEST';

export class SetTest implements Action {
  public readonly type = SET_TEST;
}

export type AppActions = SetTest;
