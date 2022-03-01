import { backendUrl } from "../config/config";

const worker = async (url_string, setMessage, setvideoState) => {
  
  let response = await fetch(`${backendUrl}/job/checkjob/${url_string}`);
  let data = await response.json()

  if(data.length === 0){
    let user = JSON.parse(localStorage.getItem('user'))
    let response = await fetch(`${backendUrl}/video/${url_string}`);
    let data = await response.json()
     user.history.map( async (ele) => {
      if(ele.videoId === url_string){   
        ele.jobId = data.id
        ele.state = data.status
         if(data.status === "waiting" || 'active'){         
           let intervalId = '';
           let count = 0
            intervalId = setInterval(async () => {
               let response = await fetch(`${backendUrl}/job/${data.id}`);
               let jobData = await response.json();
               console.log(jobData)
               count++
              if(count > 30){
                setMessage('Closed Captions unavailable..Request Timeout...Please try again')
                setvideoState(false)
                clearInterval(intervalId)
              }
              if(jobData.state === 'completed'){
                ele.state = jobData.state
                ele.caption = jobData.datas
                setvideoState(true)
                clearInterval(intervalId)
              }
            localStorage.setItem('user', JSON.stringify(user))
           }, 4500);           
           }
           localStorage.setItem('user', JSON.stringify(user))  
      }
    })
    
    
  }
  else {
    let user = JSON.parse(localStorage.getItem('user'))
    user.history.forEach( async (ele) => {
       if(ele.videoId === data.url){      
        ele.state = data.state
        ele.jobId = data.id 
         if(data.state === "waiting" || 'active'){         
          let intervalId = '';
          let count = 0
           intervalId = setInterval(async () => {
              let response = await fetch(`${backendUrl}/job/${data.id}`);
              let jobData = await response.json();
              count++
             if(count > 20){
               setMessage('Closed Captions unavailable..Request Timeout...Please try again')
               setvideoState(false)
               clearInterval(intervalId)
             }
             if(jobData.state === 'completed'){
               ele.state = jobData.state
               ele.caption = jobData.datas
               setvideoState(true)
               clearInterval(intervalId)
             }
           localStorage.setItem('user', JSON.stringify(user))
          }, 4500);     
   }
         
       }
    localStorage.setItem('user', JSON.stringify(user))
         
    })

  
  }
    }
  
       

export default worker;