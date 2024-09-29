import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { electricityReducer } from './reducers';

const rootReducer = combineReducers({
  electricity: electricityReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));