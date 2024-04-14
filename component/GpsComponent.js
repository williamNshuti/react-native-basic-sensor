import { StyleSheet, Text, View, Dimensions, Alert, TouchableOpacity } from 'react-native'
import React,{useState,useEffect, useRef, useMemo} from 'react'
import MapView, {Circle, Marker,Polyline, PROVIDER_GOOGLE} from 'react-native-maps'
import * as Location from 'expo-location'
import * as Notifications from 'expo-notifications';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { isInsideGeofence } from '../util/util';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });
const GpsScreen = () => {
    const [location, setLocation] = useState(null);
    const [locationSubscription, setLocationSubscription] = useState(null);
    const [region, setRegion] = useState(null);
    const [dark, setDark] = useState(true);

    useEffect(() => {
        (async () => {
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return;
          }
          let loc = await Location.getCurrentPositionAsync({});
          setLocation(loc);
        })();
      }, []);
  
   useEffect(() => {
  const homeCoordinates = { latitude: -1.937857476361934, longitude: 30.075084584298263 };
  const workCoordinates = { latitude: 37.8765, longitude: -122.4321 };
  const geofenceRadius = 100;

  const checkPredefinedAreas = (location) => {
    const insidehome = isInsideGeofence(location.coords, homeCoordinates, geofenceRadius);
    const insideWork = isInsideGeofence(location.coords, workCoordinates, geofenceRadius);
    if (insidehome) {
      sendNotification("Home Alert", "You are currently at home!!");
    }
    if (insideWork) {
      sendNotification("Work Alert", "You are currently at work!!");
    }
  };

  const watchLocation = async () => {
    setLocationSubscription(
      await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High },
        (location) => {
          setLocation(location);
         updateRegion(location.coords);
        checkPredefinedAreas(location);
        }
      )
    );
  };

  const updateRegion = (coords) => {
    setRegion({
      latitude: coords.latitude,
      longitude: coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  const intervalId = setInterval(watchLocation, 6777888000);

  return () => {
    if (locationSubscription) {
      locationSubscription.remove();
    }
    clearInterval(intervalId);
  };
}, []);
    const sendNotification = async (titles,message) => {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: titles,
            body: message,
          },
          trigger: null,
        });
      };
      return (
        <View style={styles.container}>
          {location && (
            <MapView
              style={styles.map}
              initialRegion={region}
              showsUserLocation={true}
              followsUserLocation={true}
              customMapStyle={mapStyle}

            >
                 <TouchableOpacity
            onPress={() => setDark(!dark)}
            style={{
            backgroundColor: "#FFF",
            height: 30,
            borderRadius: 15,
            width: 30,
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            marginTop: 60,
            alignSelf: "flex-end",
            right: 20,
          }}
        >
          <FontAwesome name="adjust" size={30} />
        </TouchableOpacity>
              <Marker coordinate={location.coords} title='Current Location' />
              <Circle
                center={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }}
                radius={100}
                strokeWidth={1}
                strokeColor="rgba(158, 158, 255, 0.3)"
                fillColor="rgba(158, 158, 255, 0.3)"
              />
            </MapView>
          )}
        </View>
      );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  });

   const mapStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#212121",
      },
    ],
  },
  {
    elementType: "geometry.fill",
    stylers: [
      {
        saturation: -5,
      },
      {
        lightness: -5,
      },
    ],
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#212121",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "administrative.country",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9E9E9E",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#BDBDBD",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "poi.business",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#181818",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1B1B1B",
      },
    ],
  },
  {
    featureType: "road",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#2C2C2C",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#8A8A8A",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      {
        color: "#373737",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#3C3C3C",
      },
    ],
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry",
    stylers: [
      {
        color: "#4E4E4E",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#3D3D3D",
      },
    ],
  },
];
  export default GpsScreen;  