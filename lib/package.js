class Package {
  constructor(options) {
    this.id = options.id;
    this.destination = options.destination;
    this.pickupLocation = options.pickupLocation;
    this.deadline = options.deadline;
  }

  maximumWaitTime(speed){
    return this.deadline - this.destination.etaTo(this.pickupLocation, speed);
  }
}

Package.prototype.soonestPackages = (packages) => (
  packages.sort((a, b) => a.maximumWaitTime(50) - b.maximumWaitTime(50))
);


export default Package;
