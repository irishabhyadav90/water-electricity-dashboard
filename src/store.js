import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { electricityAndWaterReducer } from './reducers';

const rootReducer = combineReducers({
  dashboard: electricityAndWaterReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));