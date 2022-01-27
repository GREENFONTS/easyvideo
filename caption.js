
function captionFilter(data, word){
    let captions = data
    let filtered_captions = []
    captions.filter(caption => {
        if(caption.tStart == 0){
            caption.text = ""
        }
        if(caption.text.includes(word)){
             filtered_captions.push(caption)
        }
    })
    if(filtered_captions.length == 0){
        return null
    }
    else{
        return filtered_captions
    }
}

module.exports = captionFilter;