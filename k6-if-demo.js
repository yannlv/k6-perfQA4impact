import exec from 'k6/execution';
import http from 'k6/http';
import { check, sleep } from 'k6';
import encoding from 'k6/encoding';
import { SharedArray } from "k6/data";

import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';

import { buildManifest } from './k6-perfQA4impact.js';

export let options = {
//  stages: [
//    { duration: '30s', target: 20 },
//    { duration: '1m30s', target: 10 },
//    { duration: '20s', target: 0 },
//  ],
//  iterations: 20,
  vus: 1,
//  summaryTrendStats: ['avg', 'min', 'med', 'max', 'p(75)', 'p(90)', 'p(95)', 'p(99)', 'p(99.99)', 'count'],
};





/****
 * CSV with static resources URIs
 */
const csvURIs = new SharedArray('URIs of static resources from https://if.greensoftware.foundation/', function () {
  // Load CSV file and parse it using Papa Parse
  return papaparse.parse(open('./k6-if-demo_URIs.csv'), { header: true }).data;
});
 



/****
 * Test execution function
 */
export default function () {

  const params = {
    headers: {
      'User-Agent': 'k6 load test - IF hackathon'
    },
    tags: {
      name: false
    }
  };


  /****
   * Looping over URIs and performing requests
   */
  for (var j = 0; j < csvURIs.length - 1; j++) {
    let uri = csvURIs[j].uri;
    params.tags.name = "Get static resource" + uri;
    let res = http.get(
      'https://if.greensoftware.foundation/' + uri,
       params,
    );
  /****
   * DEBUG
   */
  //console.log('####### REQUEST URL: ' + res.url);
  //console.log('####### HTTP STATUS CODE: ' + res.status);
  } 

 sleep(1);

}


/****
 * Test complete, process result summary
 */
export function handleSummary(data) {
  /****
   * DEBUG
   */
  //console.log('\n####### REQ RATE: \n' + JSON.stringify(data.metrics.http_reqs.values.rate) + '\n');
  //console.log('\n####### IF MANIFEST: \n' + buildManifest(data) + '\n');

  return {
    "results/summary.html": htmlReport(data),
    "results/if-enet-manifest.yaml": buildManifest(data)
  };
}
