import { GET_AUTH_TOKEN } from "../actions/actionTypes";

const initialState = {}

export default function (state = initialState, action) {
    switch (action.type) {
      case GET_AUTH_TOKEN:
        return {
          ...state,
          token: action.payload,
        };
    default:
        return state
    }
}