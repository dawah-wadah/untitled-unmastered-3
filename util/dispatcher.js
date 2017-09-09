import Drone from '../lib/drone.js';
import Package from '../lib/package.js';

const dispatcher = (foo) => {
  const orderedDrones = Drone.soonestDrones(foo.drones);
  const orderedPackages = Drone.soonestPackages(foo.packages);
  const unassignedPackages = [];
  const assignedPackages = [];

  orderedDrones.forEach( drone => {
    let parcel;
    if (orderedPackages.length) {
      parcel = orderedPackages.shift();
      if (drone.undeliverable(parcel)) {
        unassignedPackages.push({packageId: parcel.id});
        parcel = orderedPackages.shift();
        if (!parcel) return;
      }
      assignedPackages.push({droneId: drone.id, packageId: parcel.id});
    } else {
      return;
    }
  });

  orderedPackages.map((parcel) => {
    unassignedPackages.push({packageId: parcel.id});
  });

  return {assignedPackages, unassignedPackages};
};

export default dispatcher;
