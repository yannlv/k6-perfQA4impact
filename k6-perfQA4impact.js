const bytesToMegaBytes = bytes => bytes / (1024*1024);


function getStartTime(duration) {
  let start_time = Date.now() - duration*1000;
  let start_time_ISO = new Date(start_time).toISOString();
  return start_time_ISO;
}


export function buildManifest(data) {
  let duration_s = JSON.stringify(data.state.testRunDurationMs).split(".")[0].slice(0, -3);
  let start_datetime = getStartTime(duration_s);
  let net_in = bytesToMegaBytes(JSON.stringify(data.metrics.data_received.values.count));
  let net_out = bytesToMegaBytes(JSON.stringify(data.metrics.data_sent.values.count));


  let template = `
name: e-net-demo
description:
tags:
initialize:
  plugins:
    e-net:
      method: ENet
      path: '@grnsft/if-plugins'
      global-config:
        energy-per-gb: 0.02
tree:
  children:
    child:
      pipeline:
        - e-net
      config:
      inputs:
        - timestamp: ${start_datetime}
          duration: ${duration_s}
          network/data-in: ${net_in}
          network/data-out: ${net_out}
`
  return template;
}
