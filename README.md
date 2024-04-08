# k6-perfQA4impact
k6 module to generate input manifests for Impact Framework.
For k6 installation, please refer to the [official documentation](https://k6.io/docs/get-started/installation/).

### How to run the test?
#### Create a `results` directory
`$ mkdir results`

#### Launch the test execution
`$ k6 run -u<number of virtual users> -i<total number of iterations> k6-if-demo.js`

### How to use the `@grnsft/if-plugins/e-net` manifest generated?
After the test run is complete, a manifest for e-net plugin is generated in `results/`
```
$ tree results/
results/
├── if-enet-manifest.yaml
└── summary.html
```
You can then process the manifest with Impact Engine from the CLI:

```
$ ie --manifest results/if-enet-manifest.yaml
[2024-04-08 06:00:54.442 PM]

{
  "name": "e-net-demo",
  "description": null,
  "tags": null,
  "initialize": {
    "plugins": {
      "e-net": {
        "path": "@grnsft/if-plugins",
        "method": "ENet",
        "global-config": {
          "energy-per-gb": 0.02
        }
      }
    }
  },
  "if-version": "v0.3.1",
  "tree": {
    "children": {
      "child": {
        "pipeline": [
          "e-net"
        ],
        "config": null,
        "inputs": [
          {
            "timestamp": "2024-04-08T13:36:11.420Z",
            "duration": 4,
            "network/data-in": 4.193964958190918,
            "network/data-out": 0.012392997741699219
          }
        ],
        "outputs": [
          {
            "timestamp": "2024-04-08T13:36:11.420Z",
            "duration": 4,
            "network/data-in": 4.193964958190918,
            "network/data-out": 0.012392997741699219,
            "network/energy": 0.08412715911865234
          }
        ]
      }
    }
  }
}
```
