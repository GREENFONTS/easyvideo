const puppeteer = require('puppeteer');
const fetch = require('node-fetch');

let global_browser = false
async function func(url){
    let captionUrl = ''
    if (global_browser == false){
        console.log('enetered', global_browser)
        global_browser = await puppeteer.launch({ headless: false })
    }
       
    console.log(url)
    const page = await global_browser.newPage();
    await page.goto(url);

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
    await page.close();
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
            captions_data.push(word)
        });
       
        
        return captions_data
    }
    catch(err){
        console.log(err)
    }
}

module.exports = func;