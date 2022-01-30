import { FETCH_CAPTIONS } from "../actions/actionTypes";

const initialState = {caption : []}

export default function (state = initialState, action) {
    switch (action.type) {
      case FETCH_CAPTIONS:
        return {
          ...state,
          caption: action.payload,
        };
    default:
        return state
    }
}