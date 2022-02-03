const express = require('express');
const app = express();
const puppeteer = require('puppeteer');
const func  = require('./puppeter');
const cors = require('cors');
const bodyParser = require('body-parser');
const { urlencoded } = require('express');
const captionFilter = require('./caption');

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
let url = ''
let result;


app.get('/video/:id', async (req, res) => {
  id = req.params.id
  try{
    result = await func(id)
    res.status(200).send(result)
  }
  catch(err){
    throw err
  }
})
app.get('/:id', async (req, res) => {
  let word = req.params.id

  try{
    let captions = await captionFilter(result, word)
    res.send(captions);
  }
  catch(err) {
    throw err
  }
  
  
})

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Connected to port ${PORT}`)
})