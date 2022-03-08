let express = require('express');
let Queue = require('bull');
const cors = require('cors');
const bodyParser = require('body-parser');

// Serve on PORT on Heroku and on localhost:5000 locally
let PORT = process.env.PORT || '5000';
// Connect to a local redis intance locally, and the Heroku-provided URL in production
let REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';

let app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', 'https://localhost:3000');
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
// for production
// redis://:p50ad4f338c54668a454a16b525cbb111631f1251bae387b41b2093cfa368539d@ec2-34-202-94-249.compute-1.amazonaws.com:32540
// { redis: { tls: { rejectUnauthorized: false, requestCert: true,  }, maxRetriesPerRequest : 20,  }
//for development testing
// {
//   redis: 'redis://127.0.0.1:6379'
// }  
// Create / Connect to a named work queue+*
let workQueue = new Queue('work', 'redis://:p50ad4f338c54668a454a16b525cbb111631f1251bae387b41b2093cfa368539d@ec2-34-202-94-249.compute-1.amazonaws.com:32540',
{ redis: { tls: { rejectUnauthorized: false, requestCert: true,  }, maxRetriesPerRequest : 20,  } 
});

app.get('/', (req, res) => {
  res.json({url: REDIS_URL, msg: 'working', queue: workQueue.name})
})
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
  let checkedJob;
  if(jobs.length > 0){
  jobs.forEach((ele) => {
    jobList.push({url: ele.data.url, id: ele.id, datas: ele.returnvalue})
  })
}
   let checkedJobs = jobList.filter((job) => job.url == url)
   if(checkedJobs.length > 0){
     checkedJobs.forEach(job => ids.push(job.id))
     checkedJob = checkedJobs.filter(job => job.id == Math.max(...ids))
     if(checkedJob.length != 0){
       let job = await workQueue.getJob(checkedJob[0].id)
     checkedJob[0].state = await job.getState()  
     res.status(200).json({data: checkedJob[0]})
     }
     else {
       res.status(200).json({data: checkedJob})
     }
  }
  else {
    res.status(200).json({data: checkedJobs})
  }
  })


// Allows the client to query the state of a background job
app.get('/job/:jobId', async (req, res) => {

  let id = req.params.jobId;
   let job = await workQueue.getJob(id);
     if (job === null) {
      res.json({state: 'id not found'});
    } else {
      let state = await job.getState();
      let progress = job._progress;
      let reason = job.failedReason;
      let datas = job.returnvalue
      let url = job.data.url
     
    res.json({ id, url, state, progress, reason, datas });
  }

});

app.listen(PORT, () => console.log(`Server started! at port ${PORT}`));
