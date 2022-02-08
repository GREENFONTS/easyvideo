import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { generateVideoData } from "./redux/actions/video";
import { getCaptions} from './redux/actions/captions';
import YouTubeIframeLoader from 'youtube-iframe';
import Header from './components/header';
import Footer from './components/Footer';
import Layout from './components/layout';
import url from './config/config';

function App(props) {
  const [url, setUrl] = useState('');
  const [id, setid] = useState(null);
  const [word, setWord] = useState('');
  const [data, setData] = useState([]);
  const [wordSearch, setwordSearch] = useState(false)
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
        height: '500',
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
  let response = await fetch(`${url}/${word}`)  
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
    console.log(video)
    if(video[0].caption.length === 0){
      if(video[0].caption === "" || video[0].caption.length === 0){
        let response = await fetch(`${url}/video/${url_string[1]}`);
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

  const getIndex = (num) => {
    setCount(num)
  }

  return (
    
      <>
      <Router>
        <Header />
        <Layout  setUrl={setUrl} id={id} getVideo={getVideo} setWord={setWord} fetchCaption={fetchCaption} wordSearch={wordSearch}
        data={data} id={id} setSeekClick={setSeekClick} getIndex={getIndex} seekClick={seekClick} setwordSearch={setwordSearch}/>
        {/* <Routes>

        </Routes> */}
        <Footer />
      </Router>
      
      </>
        
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
