const puppeteer = require('puppeteer');
const fetch = require('node-fetch');

async function func(id){
    let captionUrl = ''
    try{
     const global_browser = await puppeteer.launch({  'args' : [
            '--no-sandbox', '--single-process']})

    const page = await global_browser.newPage();
    await page.goto(`https://www.youtube.com/embed/${id}?autoplay=1`);

    await page.click('.ytp-subtitles-button')
    let listener = new Promise((res)=>{
        page.on('response', (response) => {

            if (response.url().startsWith('https://www.youtube.com/api/timedtext')) {
                captionUrl = response.url()
                res()
            }
    
        })
        
    })
    await listener;
    await global_browser.close();
    }
    catch(err){
        console.log(err)
    }
    try{
        const response = await fetch(captionUrl);
        const data = await response.json()
        const captions = data.events;
        
        let captions_data = [];
        captions.forEach(caption => {
            let word = {
                time: caption.tStartMs,
                text: JSON.stringify(caption.segs)
            }
            captions_data.push(word);
        });
        
        return captions_data
    }
    catch(err){
        console.log(err)
    }
}

module.exports = func;