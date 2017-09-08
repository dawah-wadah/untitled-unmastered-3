import rp from 'request-promise-native';
import Promise from 'es6-promise';
import Location from '../lib/location.js';
import Drone from '../lib/drone.js';


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
  let homeLocation = new Location({
    latitude: -37.816656,
    longitude: 144.964212
  });
  let packages = null;
  return new Drone({
    id, currentLocation, homeLocation, packages
  });
};

const formatDrones = droneData => (
  droneData.map(drone => formatDrone(drone))
);

const getData = () => (
  fetch('drones').then(res => {
    let drones = formatDrones(res);
    return {drones};
  })
);

export default getData;
