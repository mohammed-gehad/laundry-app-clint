import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useDispatch } from "react-redux";

export default function AddYourLocation({ setLocation, location }) {
  const dispatch = useDispatch();

  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
        }

        let _location = await Location.getCurrentPositionAsync({ accuracy: 6 });
        if (!location.longitude)
          setLocation({
            ...location,
            latitude: _location.coords.latitude,
            longitude: _location.coords.longitude,
          });

        console.log(location);
      } catch (e) {
        console.log(e);
      }
    })();
  });

  if (location.longitude)
    return (
      <>
        <MapView
          style={styles.mapStyle}
          initialRegion={location}
          showsUserLocation={true}
        >
          <Marker
            draggable
            coordinate={location}
            onDragEnd={(e) => {
              setLocation({
                ...location,
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude,
              });
            }}
          />
        </MapView>
      </>
    );
  else return <ActivityIndicator size="large" color="#0000ff" />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 2,
  },
});
