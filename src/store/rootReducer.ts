import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './slices/counter/counterSlice';

const rootReducer = combineReducers({
    counter: counterReducer
});

export default rootReducer;
