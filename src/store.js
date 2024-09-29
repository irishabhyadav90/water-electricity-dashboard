import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { electricityReducer } from './reducers';

/* Todo - Optional, but good to have if we can enable redux devtool to track redux state in application */
const rootReducer = combineReducers({
  electricity: electricityReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));