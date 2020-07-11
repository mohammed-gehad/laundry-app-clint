import React from "react";
import { View, ScrollView } from "react-native";
import AddOrder from "../features/orders/AddOrder";
import { Text, Divider } from "react-native-elements";

export default function Orders() {
  return (
    <View style={{ paddingTop: 40 }}>
      <AddOrder />
    </View>
  );
}
