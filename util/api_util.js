import rp from 'request-promise-native';
import Promise from 'es6-promise';
import Location from '../lib/location.js';


const options = (endpoint) => {
  return {
    uri: `http://codetest.kube.getswift.com/${endpoint}`,
    header: {
      'User-Agent': 'Request-Promise'
    },
    json: true
  };
};

const fetch = (item) => rp(options(item));

const formatDrone = data => {
  let id = data.droneId;
  let currentLocation = new Location({
    latitude: data.location.latitude,
    longitude: data.location.longitude} );
};

const getData = () => (
  fetch('packages').then(res => {
    console.log(res);
  })
);

export default getData;
