class Location {
  constructor(options) {
    this.latitude = options.latitude;
    this.longitude = options.longitude;
  }


  distanceTo(location) {
    const radius = 6371e3;
    const lat1 = this.deg2rad(this.latitude);
    const lat2 = this.deg2rad(location.latitude);
    const dLat = this.deg2rad(location.latitude - this.latitude);
    const dLong = this.deg2rad(location.longitude - this.longitude);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (radius * c) / 1000;
  }

  etaTo(location, speed) {
    var time = (this.distanceTo(location) / speed) * 3600; // in seconds
    return time;
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
}

export default Location;
