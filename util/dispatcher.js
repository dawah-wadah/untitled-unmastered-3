import Drone from '../lib/drone.js';
import Package from '../lib/package.js';

const dispatcher = (foo) => {
  // const orderedDrones = Drone.soonestDrones(foo.drones);
  // const orderedDrones = foo.drones.map(drone => drone.etaHome())
  //   .sort((a,b) => a - b);
  const orderedPackages = Package.soonestPackages(foo.packages);
  // const unassignedPackages = [];
  // const assignedPackages = [];

  // orderedDrones.forEach( drone => {
  //   let parcel;
  //   if (orderedPackages.length) {
  //     parcel = orderedPackages.shift();
  //     if (drone.undeliverable(parcel)) {
  //       unassignedPackages.push({packageId: parcel.id});
  //       parcel = orderedPackages.shift();
  //       if (!parcel) return;
  //     }
  //     assignedPackages.push({droneId: drone.id, packageId: parcel.id});
  //   } else {
  //     return;
  //   }
  // });
//   orderedDrones.forEach(drone => {
//   let pack = orderedPackages.shift();
//   if (!pack) return;
//   while (drone.undeliverable(pack)){
//     unassignedPackages.push(pack.id);
//     pack = orderedPackages.shift();
//     if (!pack) return;
//   }
//   assignedPackages.push({droneID: drone.id, packageID: pack.id});
// });
//
//   orderedPackages.map((parcel) => {
//     unassignedPackages.push({packageId: parcel.id});
//   });

  // return {assignedPackages, unassignedPackages};
  // return { orderedDrones };
  // console.log(foo.packages);
  // return foo.packages;
  return foo.drones

};

export default dispatcher;
