import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/auth/authSlice';
import accessKeysReducer from './slices/auth/accessKeysSlice';
import loginReducer from './slices/users/loginSlice';
import passwordReducer from './slices/users/passwordSlice';
// import usersReducer from './slices/users/usersSlice';
import reoutesReducer from './slices/routes/reouteSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    accessKeys: accessKeysReducer,
    login: loginReducer,
    password: passwordReducer,
    // users: usersReducer,
    routes: reoutesReducer,

});

export default rootReducer;
