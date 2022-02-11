import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import YouTubeIframeLoader from 'youtube-iframe';
import Header from './components/header';
import Footer from './components/Footer';
import Layout from './components/layout';
import { backendUrl } from './config/config';
import AlertHandler from './components/alert';

function App() {
  const [url, setUrl] = useState('');
  const [id, setid] = useState(null);
  const [word, setWord] = useState('');
  const [data, setData] = useState([]);
  const [wordSearch, setwordSearch] = useState(false);
  const [Message, setMessage] = useState(null)
  const [count, setCount] = useState(0);
  const [seekClick, setSeekClick] = useState(false);
  const [playerInst, setplayerInst] = useState();
  let userData = {
    history: [],
  }
  let user = JSON.parse(localStorage.getItem('user'))
  
  if(user ==  null){
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
          user.history.push({videoId: id, caption: []}) 
          localStorage.setItem('user', JSON.stringify(user))
        }
        else{
         let id_check =  user.history.filter(element => {
            return element.videoId === id
          });
          if(id_check.length < 1){
            user.history.push({videoId: id, caption: []}) 
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
else{
  let response = await fetch(`${backendUrl}/${word}`);  
   datas = await response.json()
      datas.map((ele) => {
        ele.time = (ele.time / 1000) - 2
      })
      
    }
    setData(datas) 
  }


const getVideo = async () => {
  let url_string;
  function extractUrl(url){
    if(url.includes('youtube.com')){
     url_string = url.split('=')
     return true
    }
    if(url.includes('youtu.be')){
      url_string = url.split('.be/')
      return true
    }
    
  } 
  if(extractUrl(url)){
    console.log(url_string)
    if (url_string[1].length === 11){
        setid(url_string[1])
        
    let user = JSON.parse(localStorage.getItem('user'))
    let video = user.history.filter((ele) => {
      return ele.videoId === url_string[1]
    })

    if(video.length !== 0){
    if(video[0].caption.length === 0){
      if(video[0].caption === "" || video[0].caption.length === 0){
        console.log('reached')
        let response = await fetch(`${backendUrl}/video/${url_string[1]}`);
        console.log(response)
        let data = await response.json() 
      
      user.history.map((ele) => {
        if(ele.videoId === url_string[1]){
          ele.caption = data
        }
        localStorage.setItem('user', JSON.stringify(user))
      })
      }   
    }
  }
      }
      else{
        setMessage('Youtube video ID is not valid')
      }
    
    }
    else{
      setMessage('This is not a youtube link')
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
        <Layout  setUrl={setUrl} getVideo={getVideo} setWord={setWord} fetchCaption={fetchCaption} wordSearch={wordSearch}
        data={data} id={id} setSeekClick={setSeekClick} getIndex={getIndex} seekClick={seekClick} setwordSearch={setwordSearch}/>
        <Footer />
      </Router>
      
      </>
        
  );
}

export default App;
