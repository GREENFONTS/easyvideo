import { GENERATE_VIDEO_DATA } from "./actionTypes";

export const generateVideoData = (url) => async (dispatch) => {
  console.log(url)
 
  
  let payload = {
    url
  }
let response = await fetch('http://localhost:4000', {
  method: "POST",
  body: JSON.stringify(payload),
  headers: {  "Content-type": "application/json; charset=UTF-8"}
});

  dispatch({
    type: GENERATE_VIDEO_DATA,
    payload: {msg: 'success'},
  });
};

