class Location {
  constructor(options) {
    this.latitude = options.latitude;
    this.longitude = options.longitude;
    this.distanceTo = this.distanceTo.bind(this);
    this.deg2rad = this.deg2rad.bind(this);
  }


  distanceTo(location){
    const radius = 6371;
    const dLat = this.deg2rad(location.latitude - this.latitude);
    const dLong = this.deg2rad(location.longitude - this.longitude);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(this.latitude)) *
      Math.cos(this.deg2rad(location.latitude)) *
      Math.sin(dLong/2) + Math.sin(dLong/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (radius * c) / 1000;
  }

  etaTo(location, speed){
    return (this.distanceTo(location) / speed) * 3600;
  }

  deg2rad(deg){
    return deg * (Math.PI/180);
  }
}

export default Location;
