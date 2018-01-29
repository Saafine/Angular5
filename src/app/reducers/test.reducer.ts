import * as TestActions from '../actions/test.actions';

export interface TestModel {
  test: string;
}

const initialState = {
  test: 'initial'
};

export function testReducer(state = initialState, action: TestActions.TestActions) {
  switch (action.type) {
    case TestActions.TEST_COMPLETE_1:
      return {
        ...state,
        test: action.payload
      };
    default:
      return state;
  }
}

