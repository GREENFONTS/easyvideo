import {  GENERATE_VIDEO_DATA } from "../actions/actionTypes";

const initialState = {}

export default function (state = initialState, action) {
    switch (action.type) {
        case GENERATE_VIDEO_DATA:
          return {
            ...state,
            video: action.payload,
          };
    default:
        return state
    }
}