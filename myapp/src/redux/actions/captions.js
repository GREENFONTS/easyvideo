import { FETCH_CAPTIONS } from "./actionTypes";

export const getCaptions = (word) => (dispatch) => {
  let caption_data = []; 
 try{
    fetch(`http://localhost:4000/${word}`)
    .then(response => response.json()
    .then(data => {
      data.forEach(element => {
        caption_data.push(element)
      });
    }
    ));   
 }

 catch(err){
     caption_data = {msg: 'Sorry, No Captions available for this video'}
 }

  dispatch({
    type: FETCH_CAPTIONS,
    payload: caption_data,
  });
};

