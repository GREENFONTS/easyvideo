import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { generateVideoData } from "./redux/actions/video";
import { GoogleLogin } from 'react-google-login';
import { getCaptions} from './redux/actions/captions';
import YTPlayer from 'yt-player';


function App(props) {
  const [url, setUrl] = useState('');
  const [id, setid] = useState('');
  // const [auth, setauth] = useState('');
  const [word, setWord] = useState('');
  const [data, setData] = useState([]);

  
  useEffect(() => {
    
    const player = new YTPlayer('#player',  {
      width:'800', height:"600", captions:"en", controls:true});
    if(id !== ''){
      player.load(id, {autoplay:true})
    }  
    //testing the seeks method
    if (data.length !== 0){
      let time = (data[0].time) / 1000
      player.seek(time)
    }
    
  })


  // https://www.youtube.com/watch?v=grEKMHGYyns
  let arr = []  
  //using this due to difficulty of getting  and manipulating the redux result, the call to get 
  //the captions data is main to come from props.getCaptions
   const fetchCaptions = (id, word) => {
     fetch(`http://localhost:4000/${word}`)
     .then(response => response.json()
     .then(data => {
       data.forEach(element => {
         arr.push(element)
       });
       setData(arr)
     }
     ));   
     console.log(data)
  }

  const getVideo = async () => {
    let url_string = url.split('=')
    setid(url_string[1])
    props.generateVideoData(`https://www.youtube.com/embed/${url_string[1]}?autoplay=1`) 
  }
 
  return (
    <div className="App">
      <header className='header'>
        Easy Video
      </header>
      <div className='container'>
        <input type='text' value={url} placeholder='Video link' onChange={(e) => setUrl(e.target.value)}/>
        <button id='button' onClick={(e) => getVideo()}>Search</button>
      </div>
      <div className='container'>
          <h1>{id}</h1>
          <div id='player'></div>
        </div>
      {/* not working for now */}
      {/* <div className='container'>
        <button id="button" >Seek</button>
      </div> */}
      <div className='container'>
        <input type='text'  placeholder='Word to serach' onChange={(e) => setWord(e.target.value)}/>
        <button onClick={(e) => fetchCaptions(id, word)}>Search</button>
      </div>
    </div>
  );
}

App.prototype = {
  captions : PropTypes.array.isRequired,
  generateVideoData : PropTypes.func.isRequired,
  getCaptions : PropTypes.func.isRequired
}

const mapStateToProps =  state => ({
  token: state.token,
  video: state.video,
  caption : state.caption
})

export default connect(mapStateToProps, {generateVideoData, getCaptions})(App);
