/**
 * !todo
 * This file may be removed for production
 */
import { Action } from '@ngrx/store';

export const TEST_EFFECT_1 = 'TEST_EFFECT_1';
export const TEST_COMPLETE_1 = 'TEST_COMPLETE_1';

export class TestEffect1 implements Action {
  public readonly type = TEST_EFFECT_1;
}

export class TestComplete1 implements Action {
  public readonly type = TEST_COMPLETE_1;

  constructor(public payload: string) {
  }
}

export type TestActions = TestEffect1 | TestComplete1;
