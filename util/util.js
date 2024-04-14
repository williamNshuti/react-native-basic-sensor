 export const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371000; // Radius of the earth in meters
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in meters
    return distance;
  };

  export const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  export const isInsideGeofence = (currentLocation, targetLocation, radius) => {
    const distance = calculateDistance(
      currentLocation.latitude,
      currentLocation.longitude,
      targetLocation.latitude,
      targetLocation.longitude
    );
    return distance <= radius;
  };


  /* @flow */

const tintColor = '#4e9bde';
const darkTintColor = '#1a74b3';

export const colors =  {
  tintColor,
  darkTintColor,
  tabIconDefault: '#bdbfc3',
  tabIconSelected: tintColor,
  tabBar: '#fff',
  noticeText: '#fff',
  greyBackground: '#f8f8f9',
  greyText: '#a7aab0',
  greyUnderlayColor: '#f7f7f7',
  blackText: '#242c39',
  separator: '#f4f4f5',
  navBarBorderBottom: 'rgba(46, 59, 76, 0.10)',
};


export function categorizeIlluminance(percentage) {
  if (percentage < 33) {
    return "low";
  } else if (percentage < 66) {
    return "medium";
  } else {
    return "high";
  }
}

export function luxToPercentage(lux, minLux = 0, maxLux = 10000) {
  // Ensure the lux value is within the min and max bounds
  lux = Math.max(minLux, Math.min(lux, maxLux));
  
  // Normalize the lux value to a percentage
  return ((lux - minLux) / (maxLux - minLux)) * 100;
}