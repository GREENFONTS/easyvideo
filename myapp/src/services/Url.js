 const extractUrl = (url) =>{
    if(url.includes('youtube.com/watch?v=')){
     let url_string = url.split('=')
     return ({bool: true, string: url_string})
    }
    else if(url.includes('youtu.be')){
      let url_string = url.split('.be/')
      return ({bool: true, string: url_string})
    }
    else return false
    
  }

export default extractUrl;