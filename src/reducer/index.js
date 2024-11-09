import {combineReducers} from "@reduxjs/toolkit";

import authReducer from "../slices/authSlice"
import profileReducer from "../slices/profileSlice";
import courseReducer from "../slices/courseSlice"
//? Error resolving - do not forget to add all reducers inside combineReducers() to avoid errors of not being able to extract entities from slices
const rootReducer  = combineReducers({
    auth: authReducer,
    profile:profileReducer,
   
    course:courseReducer,
   
})

export default rootReducer