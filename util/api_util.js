import rp from 'request-promise-native';
import Promise from 'es6-promise';
import Location from '../lib/location.js';
import Drone from '../lib/drone.js';


const options = (endpoint) => {
  return {
    uri: `http://codetest.kube.getswift.co/${endpoint}`,
    headers: {
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
  let speed = 50;
  return new Drone({
    id, currentLocation, homeLocation, packages, speed
  });
};
const formatPackage = data => {
  let id = data.packageId;
  let pickupLocation = new Location({
    latitude: data.location.latitude,
    longitude: data.location.longitude} );
  let destination = new Location({
    latitude: -37.816656,
    longitude: 144.964212
  });
  let deadline = data.deadline;
  return new Drone({
    id, pickupLocation, destination, deadline
  });
};

const formatDrones = droneData => (
  droneData.map(drone => formatDrone(drone))
);
const formatPackages = packageData => (
  packageData.map(foo => formatPackage(foo))
);

const getData = () => (
  // fetch('drones').then(res => {
  //   let drones = formatDrones(res);
  //   return {
  //     drones
  //   };
  // })

  fetch('packages').then(res => {
    let packages = formatPackages(res);
    return {
      packages
    };
  })
);

export default getData;
