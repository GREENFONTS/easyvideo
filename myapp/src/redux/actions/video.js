import { GENERATE_VIDEO_DATA } from "./actionTypes";

export const generateVideoData = (id) => async (dispatch) => {

  let data;
  
try{
  let response = await fetch(`http://localhost:4000/video/${id}`);
  let data = await response.json();
  console.log(data)
}
catch (err) {
  data = {msg: 'Error in request'}
  throw err
}


  dispatch({
    type: GENERATE_VIDEO_DATA,
    payload: data,
  });
};

