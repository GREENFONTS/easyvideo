import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { generateVideoData } from "./redux/actions/video";
import { GoogleLogin } from 'react-google-login';
import { getCaptions} from './redux/actions/captions';
import YTPlayer from 'yt-player';
import YouTubeIframeLoader from 'youtube-iframe';

const mapStateToProps =  state => ({
  token: state.token,
  video: state.video,
  caption : state.caption
})

export default connect(mapStateToProps, {generateVideoData, getCaptions})(App);

function App(props) {
  const [url, setUrl] = useState('');
  const [id, setid] = useState('');
  // const [auth, setauth] = useState('');
  const [word, setWord] = useState('');
  const [data, setData] = useState([30, 90, 120]);
  const [count, setCount] = useState(0);
  const [click, setClick] = useState(false)
  const [playerInst, setplayerInst] = useState();

  const seek = (playerInst) => {

    function onPlayerReady(playerInst){
      console.log(playerInst)
      
      // playerInst.seekTo(data[count])      
      }
    
      onPlayerReady(playerInst)
    
    // setCount(count + 1)
    //  setClick(false)
  }


 
  useEffect(()=>{
    YouTubeIframeLoader.load((YT) => {
     let player = new YT.Player('player', {
        height: '600',
        width: '800',
        autoplay: 1,
        start: 0
    })
    setplayerInst(player)  
    })  
}, [])

  useEffect(() => {   
    function onPlayerReady(playerInst){
       console.log(playerInst)
        if(playerInst !== undefined && id !== 0 && !click ){
        playerInst.loadVideoById(id)      
        }
        if( playerInst !== undefined && id !== 0 && click){
          console.log('entered', data[count])
          playerInst.seekTo(data[count])
          setCount(count + 1)
          setClick(false)
        }
      }
      onPlayerReady(playerInst)

  }, [id])

  useEffect(() => {
    function onPlayerReady(playerInst){
      if( playerInst !== undefined && click){
        console.log('entered', data[count])
        playerInst.seekTo(data[count])
        setCount(count + 1)
        setClick(false)
      }
    }

    onPlayerReady(playerInst)
  }, [click, count])

  // https://www.youtube.com/watch?v=Sag-Hz9jJNg
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

  const getVideo = () => {
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
           {/* <iframe id="player" type="text/html" width="640" height="390" title='Youtube Video'
  src="http://www.youtube.com/embed/M7lc1UVf-VE?enablejsapi=1&origin=http://example.com"
  frameborder="0"></iframe> */}
        </div>

        <div className='container'>
        <button id="button" onClick={(e) => {
          setClick(true)
          
          }}>Seek</button>
      </div>
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




