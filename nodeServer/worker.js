const throng = require('throng');
const Queue = require("bull");
const func = require('./services/puppeter')

let REDIS_URL = process.env.REDIS_URL || "redis://127.0.0.1:6379";
let workers = process.env.WEB_CONCURRENCY || 2;

let maxJobsPerWorker = 50;

function start() {
  let workQueue = new Queue('work', REDIS_URL);
  workQueue.process(maxJobsPerWorker, async (job) => {
    
    try{
      let result = await func(job.data.url)
      return result
    }
    catch(err){
       throw err
    }
  });
}

throng({ workers, start });