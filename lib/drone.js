class Drone {
  constructor(options) {
    this.id = options.id;
    this.homeLocation = options.homeLocation;
    this.currentLocation = options.currentLocation;
    this.packages = options.packages;
    this.speed = options.speed;
  }

  etaHome(){
    return this.currentLocation.etaTo(this.homeLocation);
  }

  anyPackages() {
    return Boolean(this.packages.length);
  }

  deliveryTime(){
    return this.packages.reduce(
      (time, parcel) => {
        const timeToDestination =
          this.currentLocation
          .etaTo(parcel.destination);
        const timeToHome = parcel.destination.etaTo(this.homeLocation);
        this.currentLocation = this.pickupLocation;
        return time + timeToDestination + timeToHome;
      }, 0
    );
  }

  availibleWhen(){
    return this.anyPackages() ? this.deliveryTime() : this.etaHome();
  }

}

Drone.prototype.soonestDrones = (drones) => (
  drones.sort((a, b) => a.etaHome() - b.etaHome())
);

export default Drone;
