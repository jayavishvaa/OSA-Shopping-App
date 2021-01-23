const express = require('express');
const NodeGeocoder = require('node-geocoder');

const router = express.Router();

const options = {
  provider: 'mapquest',
 
  // Optional depending on the providers
// fetch: customFetchImplementation,
  apiKey: 'CWVG01OkTUIjddw4T1Wtc6TiEiSGELpk', // for Mapquest, OpenCage, Google Premier
  formatter: null // 'gpx', 'string', ...
};

const geocoder = NodeGeocoder(options);

router.get('/', async (req, res) => {
    const latitude = req.query.latitude;
    const longitude = req.query.longitude;
    if (!latitude) return res.status(404).send('no coordinates provided');
    res.send(await geocoder.reverse({ lat: latitude, lon: longitude }));
})

module.exports = router;

// const NodeGeocoder = require('node-geocoder');
 
// const options = {
//   provider: 'mapquest',
 
//   // Optional depending on the providers
// //   fetch: customFetchImplementation,
//   apiKey: 'CWVG01OkTUIjddw4T1Wtc6TiEiSGELpk', // for Mapquest, OpenCage, Google Premier
//   formatter: null // 'gpx', 'string', ...
// };
 
// const geocoder = NodeGeocoder(options);
 
// // Using callback
// async function run() {
//     //24.189080, 86.309025
//     console.log(await geocoder.reverse({ lat: 24.189080, lon: 86.309025 }));
// }

// run();