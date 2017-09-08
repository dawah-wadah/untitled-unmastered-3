class Package {
  constructor(options) {
    this.id = options.id;
    this.destination = options.destination;
    this.pickupLocation = options.pickupLocation;
    this.deadline = options.deadline;
  }

  maximumWaitTime(speed){
    return this.deadline - this.destination.etaTo(this.pickupLocation);
  }
}

export default Package;
