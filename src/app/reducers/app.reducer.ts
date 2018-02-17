import * as AppActions from '../actions/app.actions';

export interface AppModel {
  test: string,
}

const initialState: AppModel = {
  test: 'value'
};

export function appReducer(state = initialState, action: AppActions.AppActions) {
  switch (action.type) {
    case AppActions.SET_TEST:
      return {
        ...state,
        test: action.payload
      };
    default:
      return state;
  }
}

