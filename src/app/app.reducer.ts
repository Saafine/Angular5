import { TestModel, testReducer } from './reducers/test.reducer';

export const STORE_TEST = 'test';

export interface AppState {
  test: TestModel;
}

export const reducers = {
  test: testReducer
};
