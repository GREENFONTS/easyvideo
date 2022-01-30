import { combineReducers } from "redux";
import videoReducer from './videoReducer';
import authReducer from './authReducer';
import captionReducer from "./captionReducer";

export default combineReducers({
    video : videoReducer,
    token: authReducer, 
    caption : captionReducer
})