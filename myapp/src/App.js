import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { generateVideoData } from "./redux/actions/video";
import { getCaptions} from './redux/actions/captions';
import YouTubeIframeLoader from 'youtube-iframe';
import SearchList from './components/SearchList';

function App(props) {
  const [url, setUrl] = useState('');
  const [id, setid] = useState('');
  // const [auth, setauth] = useState('');
  const [word, setWord] = useState('');
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [seekClick, setSeekClick] = useState(false);
  const [playerInst, setplayerInst] = useState();
  let userData = {
    history: [],
  }
  let user = JSON.parse(localStorage.getItem('user'))
  
  if(user ==  null){
    console.log('enetered')
    localStorage.setItem('user', JSON.stringify(userData))
  }

  useEffect(()=>{
    YouTubeIframeLoader.load((YT) => {
     let player = new YT.Player('player', {
        height: '600',
        width: '800',
        autoplay: 1,
        start: 0,
        host: 'https://www.youtube-nocookie.com'
    })
    setplayerInst(player)  
    })  
}, [])

  useEffect(() => {  
    function onPlayerReady(playerInst){
        if(playerInst !== undefined && id !== '' ){
        playerInst.loadVideoById(id) 
       let user = JSON.parse(localStorage.getItem('user'))
        let num = user.history.length
        if(num === 0){
          user.history.push({videoId: id, caption: ''}) 
          localStorage.setItem('user', JSON.stringify(user))
        }
        else{
         let id_check =  user.history.filter(element => {
            return element.videoId === id
          });
          if(id_check.length < 1){
            user.history.push({videoId: id, caption: ''}) 
          localStorage.setItem('user', JSON.stringify(user))
          }

         }
        
        }
      }
      onPlayerReady(playerInst)

  }, [id])

  useEffect(() => {
    function onPlayerReady(playerInst){
      if( playerInst !== undefined && seekClick){
        playerInst.seekTo(data[count].time)      
        setSeekClick(false)
      }
    }

    onPlayerReady(playerInst)
  }, [seekClick, count])

async function fetchCaption(){
  let captions = [];
  let datas = []
 let user = JSON.parse(localStorage.getItem('user'))
   user.history.map((ele) => {
    if(ele.videoId === id){
      captions = ele.caption
    }
  })
  if (captions.length !== 0){

  datas = captions.filter(caption => {
      if(caption.text != undefined){
       return caption.text.includes(word)
      }  
    })

      if(datas.length !== 0){
        datas.map((ele) => {
          ele.time = (ele.time / 1000) - 2
        }) 
      }
    }
else{
  let response = await fetch(`http://localhost:4000/${word}`)  
  console.log('fetch') 
   datas = await response.json()
      datas.map((ele) => {
        ele.time = (ele.time / 1000) - 2
      })
      
    }
    setData(datas) 
  }


const getVideo = async () => {
  
    let url_string = url.split('=')
    setid(url_string[1])
    let user = JSON.parse(localStorage.getItem('user'))
    let video = user.history.filter((ele) => {
      return ele.videoId === url_string[1]
    })
    if(video[0].caption === "" || video[0].caption.length === 0){
      let response = await fetch(`http://localhost:4000/video/${url_string[1]}`);
      let data = await response.json() 
    
    user.history.map((ele) => {
      if(ele.videoId === url_string[1]){
        ele.caption = data
      }
      localStorage.setItem('user', JSON.stringify(user))
    })
    }    
  }

  const getIndex = (num) => {
    setCount(num)
  }

  return (
    <div>
      <Container maxWidth="false">
        
      </Container>
      {/* <header className='header'>
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

        {/* <div className='container'>
         <button id="button" onClick={(e) => setSeekClick(true)}>Seek</button>
       </div> */}
      {/* <div className='container'>
        <input type='text'  placeholder='Word to serach' onChange={(e) => setWord(e.target.value)}/>
        <button onClick={(e) => fetchCaption()}>Search</button>
      </div>
      </div>
      <div className='container col-5 p-2'>
        {data.length > 0 ? <SearchList data={data} id={id} setSeekClick={setSeekClick} getIndex={getIndex}/> : <h2>No word searched</h2>}
      </div>  */}
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
