const throng = require('throng');
const Queue = require("bull");
const func = require('./services/puppeter')

let REDIS_URL = process.env.REDIS_URL || "redis://127.0.0.1:6379";

let workers = process.env.WEB_CONCURRENCY || 2;

let maxJobsPerWorker = 50;


function start() {
  let workQueue = new Queue('work', 'redis://:p50ad4f338c54668a454a16b525cbb111631f1251bae387b41b2093cfa368539d@ec2-34-202-94-249.compute-1.amazonaws.com:32540',
  { redis: { tls: { rejectUnauthorized: false, requestCert: true,  }, maxRetriesPerRequest : 20,  } 
  });
  workQueue.process(maxJobsPerWorker, async (job) => {
    
    try{      
      let result = await func(job.data.url)
      console.log(result)
      return result
    }
    catch(err){
       throw err
    }
  });
}

throng({ workers, start });