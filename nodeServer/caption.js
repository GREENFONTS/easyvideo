
 function captionFilter(data, word){
    let captions = data 
    if(captions != undefined){
   let filtered_captions =  captions.filter(caption => {
       if(caption.text != undefined){
        return caption.text.includes(word)
       }          
        
   })
    return filtered_captions

}
}

module.exports = captionFilter;