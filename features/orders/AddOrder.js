import React, { useState } from "react";
import { View, Platform, Dimensions, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addOrder } from "./ordersSlice";
import { Button, Text, Input, Overlay } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
import AddYourLocation from "../../components/AddYourLocation";
import api from "../../api/server";
import { ordersLoading } from "./ordersSlice";
import { useNavigation } from "@react-navigation/native";

export default function AddOrder() {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("");
  const [show, setShow] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [customersAddress, setCustomersAddress] = useState("");
  const [instruction, setInstruction] = useState("");
  const [location, setLocation] = useState({
    latitude: 0,
    latitudeDelta: 0.002,
    longitude: 0,
    longitudeDelta: 0.002,
  });
  const [address, setAddress] = useState(null);
  const navigation = useNavigation();
  const loading = useSelector(ordersLoading);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    if (mode === "date") showTimepicker();
  };

  const showMode = (currentMode) => {
    setMode(currentMode);
    setShow(true);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const dispatch = useDispatch();
  const callback = () => {
    navigation.navigate("orders");
  };

  const getAddress = async (latitude, longitude) => {
    const result = await api.post("/address", { latitude, longitude });
    console.log(result.data);
    setAddress(result.data);
  };
  return (
    <View>
      <View>
        <Text h4>Schedule a pick up</Text>

        <Button onPress={showDatepicker} title="Select a date" type="outline" />
      </View>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      <Text style={{ color: "gray" }}>{date.toString()} </Text>

      <Button
        onPress={() => setShowMap(true)}
        title="Select a location"
        type="outline"
      />

      <Overlay
        isVisible={showMap}
        windowBackgroundColor="rgba(255, 255, 255, .5)"
        overlayBackgroundColor="red"
        width="auto"
        height="auto"
      >
        <>
          <Text h4>drag and drop the pin</Text>

          <AddYourLocation setLocation={setLocation} location={location} />
          <Button
            onPress={() => {
              setShowMap(false);
              getAddress(location.latitude, location.longitude);
            }}
            title="save"
          />
        </>
      </Overlay>

      <Text style={{ color: "gray" }}>{address && address}</Text>

      <Input
        placeholder="address"
        value={customersAddress}
        onChangeText={setCustomersAddress}
      />
      <Input
        placeholder="instruction"
        value={instruction}
        onChangeText={setInstruction}
      />

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Button
          title="add order"
          onPress={() =>
            dispatch(
              addOrder({
                address: {
                  longitude: location.longitude,
                  latitude: location.latitude,
                  address: customersAddress,
                },
                timeScheduled: date,
                instruction,
                callback,
              })
            )
          }
        />
      )}
    </View>
  );
}
