import Drone from '../lib/drone.js';
import Package from '../lib/package.js';

const dispatcher = (foo) => {
  const orderedDrones = Drone.prototype.soonestDrones(foo.drones);
  const orderedPackages = Package.prototype.soonestPackages(foo.packages);
  const unassignedPackages = [];
  const assignedPackages = [];

  orderedDrones.forEach( drone => {
    let parcel;
    if (orderedPackages.length) {
      parcel = orderedPackages.shift();
      if (drone.undeliverable(parcel)) {
        unassignedPackages.push(parcel.id);
        parcel = orderedPackages.shift();
        if (!parcel) return;
      }
      assignedPackages.push({droneId: drone.id, packageId: parcel.id});
    } else {
      return;
    }
  });

  const leftoverPackIDS = orderedPackages.forEach(parcel =>{
    unassignedPackages.push(parcel.id);
  } );

  return {assignedPackages, unassignedPackages};
};

export default dispatcher;
