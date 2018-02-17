import { AppModel, appReducer } from './reducers/app.reducer';

export const STORE_APP = 'app';

export interface AppState {
  app: AppModel;
}

export const reducers = {
  app: appReducer
};
