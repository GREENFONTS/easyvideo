import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import YouTubeIframeLoader from 'youtube-iframe';
import Header from './components/header';
import Footer from './components/Footer';
import Layout from './components/layout';
import AlertHandler from './components/alert';
import extractUrl from './services/Url';
import worker from './services/worker';

function App() {
  const [url, setUrl] = useState('');
  const [id, setid] = useState(null);
  const [word, setWord] = useState('');
  const [data, setData] = useState([]);
  const [wordSearch, setwordSearch] = useState(false);
  const [Message, setMessage] = useState(null);
  const [count, setCount] = useState(0);
  const [seekClick, setSeekClick] = useState(false);
  const [videoclick, setVideoClick] = useState(false);
  const [playerInst, setplayerInst] = useState();
  const [videoState, setvideoState] = useState(false);
  let userData = {
    history: [],
  }

  let user = JSON.parse(typeof localStorage.getItem('user') !== undefined ? localStorage.getItem('user') : null)
  
  if(user == null){
    localStorage.setItem('user', JSON.stringify(userData))
  }

  useEffect(()=>{
    YouTubeIframeLoader.load((YT) => {
     let player = new YT.Player('player', {
        height: 'inherit',
        width: '100%',
        autoplay: 1,
        start: 0,
        host: url,
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
         user.history.push({videoId: id, caption: [], jobId : '', state: ''}) 
         localStorage.setItem('user', JSON.stringify(user))
        }
        else{
         let id_check =  user.history.filter(element => {
            return element.videoId === id
          });
            if(id_check.length < 1){
            user.history.push({videoId: id, caption: [], jobId : '', state: ''});
            localStorage.setItem('user', JSON.stringify(user))
            }

         }
        
        }
      }
      onPlayerReady(playerInst)

  }, [videoclick])

  useEffect(() => {
    function onPlayerReady(playerInst){
      if( playerInst !== undefined && seekClick){
        playerInst.seekTo(data[count].time)      
        setSeekClick(false)
      }
    }

    onPlayerReady(playerInst)
  }, [seekClick, count])

const fetchCaption = async () => {
    let captions;
    let datas = []
    
    let user = JSON.parse(localStorage.getItem('user'))
     user.history.map((ele) => {
      if(ele.videoId === id){
        captions = ele.caption
      }
    })
    if (captions.length !== 0){
  
    datas = captions.filter(caption => {
        if(caption.text !== undefined){
         return caption.text.includes(word)
        }  
      })
  
        if(datas.length !== 0){
          datas.map((ele) => {
            ele.time = (ele.time / 1000) - 2
          }) 
        }
      }

  setData(datas) 
  }

const getVideo = async () => {  
    let result = extractUrl(url)
    let url_string = result.string
    if(result.bool){
      if(result.string[1].length === 11){     
        setid(result.string[1])
    let user = JSON.parse(localStorage.getItem('user'))
  
    
    worker(url_string[1], setMessage, setvideoState)
        
     }
      else{
        setMessage('Youtube video ID is not valid')
      }
    
    }
    else{
      setMessage('This is not a valid youtube link...Check and try again')
    }    
}

  const getIndex = (num) => {
    setCount(num)
  }

  return (
    
      <>
      <Router>
        <Header />
        <AlertHandler message={Message} setMessage={setMessage}/>
        <Layout  setUrl={setUrl} getVideo={getVideo} setWord={setWord} fetchCaption={fetchCaption} wordSearch={wordSearch} setVideoClick={setVideoClick}
        data={data} id={id} setSeekClick={setSeekClick} getIndex={getIndex} seekClick={seekClick} setwordSearch={setwordSearch} videoState={videoState}/>
        <Footer />
      </Router>
      
      </>
        
  );
}

export default App;
