import React from "react";
import { View, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { ordersSelectors, asyncOrders } from "./ordersSlice";
import { Button, ListItem } from "react-native-elements";
import TouchableScale from "react-native-touchable-scale"; // https://github.com/kohver/react-native-touchable-scale

export default function NewOrders() {
  const dispatch = useDispatch();
  const currentOrders = useSelector(ordersSelectors.selectAll);

  const renderItem = (item) => {
    return (
      <ListItem
        Component={TouchableScale}
        friction={90} //
        tension={100} // These props are passed to the parent component (here TouchableScale)
        activeScale={0.95} //
        linearGradientProps={{
          colors: ["#FF9800", "#F44336"],
          start: { x: 1, y: 0 },
          end: { x: 0.2, y: 0 },
        }}
        title={item.status}
        subtitle={item.timePlaced}
        titleStyle={{ color: "white", fontWeight: "bold" }}
        subtitleStyle={{ color: "white" }}
        chevron={{ color: "white" }}
        containerStyle={{ borderRadius: 7 }}
      />
    );
  };
  return (
    <View>
      <Button title="refresh" onPress={() => dispatch(asyncOrders())} />
      <FlatList
        data={currentOrders}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => renderItem(item)}
        chevron={true}
      />
    </View>
  );
}
