/**
**  http stress-test
** by Yarik Genza
** https://vk.com/yarikgenza
**/

'use strict'
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
const chalk = require('chalk');
const url = require('url');
const site = require('./config').siteUrl;
const chunks = url.parse(site);
const server = require('http');

const steps = [10, 100, 300, 1000, 5000, 10000, 25000, 4000, 60000, 100000]
let reqs = [];

const conf = {
    host: chunks.host,
    port: chunks.port,
    path: chunks.path,
    agent: false
}

const test = (steps, cb) => {

    let success = 0;
    let fail = 0;

    for(let i = 0; i < steps; i++) {

      reqs.push(
      server.get(conf, (res) => {
          success++;
          if(success + fail == steps) {
             cb(success, fail);
          }
      }).on('error', (e) => {
         fail++;

         if (fail/(success+fail) > 0.5) {

           reqs.forEach(function (request) {
             if (request.abort) {
               request.abort()
             }
           })

           cb(success, fail)

         }

         if(success + fail == steps) {
            cb(success, fail);
         }
      })
    )

    }
}

const start = (steps) => {

  if(steps.length == 0) {
    console.log('Done!')
  }
   else {
    test(steps[0], function(success, fail) {

      let total = success + fail;
      let lev = success/total;
      let dlev = (100*lev).toFixed(2) + '%';

      if (lev == 1) {
        dlev = chalk.green(dlev)
      } else if (lev > 0.7) {
        dlev = chalk.yellow(dlev)
      } else {
        dlev = chalk.red(dlev)
      }

      console.log(chalk.blue(`${steps[0]} request: ${success}/${total} (${dlev}) done...`));
      setTimeout(() => {
        start(steps.splice(1));
      }, 2000 )
    });
  }
}


start(steps)
console.log(chalk.green('testing....'));
