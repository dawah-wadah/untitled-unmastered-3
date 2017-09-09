class Drone {
  constructor(options) {
    this.id = options.id;
    this.homeLocation = options.homeLocation;
    this.currentLocation = options.currentLocation;
    this.packages = options.packages;
    this.speed = options.speed;
  }

  etaHome(){
    return this.currentLocation.etaTo(this.homeLocation, this.speed);
  }

  anyPackages() {
    return Boolean(this.packages.length);
  }

  undeliverable(parcel){
    const timeNow = new Date().getTime() / 1000 | 0;
    return (parcel.deadline - this.availableWhen()) < timeNow;
  }

  deliveryTime(){
    var speed = 50;
    return this.packages.reduce(
      (time, parcel) => {
        const timeToDestination =
          this.currentLocation
          .etaTo(parcel.destination, speed);
        const timeToHome = parcel.destination.etaTo(this.homeLocation, speed);
        this.currentLocation = this.homeLocation;
        return time + timeToDestination + timeToHome;
      }, 0
    );
  }

  availableWhen(){
    return this.anyPackages() ? this.deliveryTime() : this.etaHome();
  }

}

Drone.prototype.compareTimeTillAvailable = function(droneA, droneB){
    return droneA.availableWhen() - droneB.availableWhen();
  };

Drone.prototype.soonestDrones = function(drones) {
  return drones.sort(this.compareTimeTillAvailable);
};

export default Drone;
