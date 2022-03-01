let express = require('express');
let Queue = require('bull');
const cors = require('cors');
const bodyParser = require('body-parser');

// Serve on PORT on Heroku and on localhost:5000 locally
let PORT = process.env.PORT || '5000';
// Connect to a local redis intance locally, and the Heroku-provided URL in production
let REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';

let app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

// Create / Connect to a named work queue
let workQueue = new Queue('work', {
  redis: REDIS_URL
});


// Kick off a new job by adding it to the work queue
app.get('/video/:id', async (req, res) => {
 
  let id = req.params.id
  let job = await workQueue.add({url : id});
  let jobState = await job.getState()
  res.json({ id: job.id , videoId : id, status: jobState});
});

//to check if a job exists
app.get('/job/checkJob/:url', async (req,res) => {
  let url = req.params.url
  let jobs = await workQueue.getJobs();
  let jobList = []
  let ids = []
  jobs.forEach((ele) => {
    jobList.push({url: ele.data.url, id: ele.id})
  })
  
  let checkedJobs = jobList.filter((job) => job.url == url)
  checkedJobs.forEach(job => ids.push(job.id))
  let checkedJob = checkedJobs.filter(job => job.id == Math.max(...ids))
  
  if(checkedJob.length != 0){
    let job = await workQueue.getJob(checkedJob[0].id)
  checkedJob[0].state = await job.getState()  
  res.send(checkedJob[0])
  }
  else {
    res.send(checkedJob)
  }
  })


// Allows the client to query the state of a background job
app.get('/job/:jobId', async (req, res) => {

  let id = req.params.jobId;
  let job = await workQueue.getJob(id);
  
  if (job === null) {
    res.status(404).end();
  } else {
    let state = await job.getState();
    let progress = job._progress;
    let reason = job.failedReason;
    let datas = job.returnvalue
   
  res.json({ id, state, progress, reason, datas });
    
  }
});

app.listen(PORT, () => console.log(`Server started! at port ${PORT}`));