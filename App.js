import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import * as React from "react";
import { View, Text } from "react-native";

import { store, persistor } from "./app/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { useSelector } from "react-redux";

import LoginScreen from "./screens/LoginScreen";
import OrdersScreen from "./screens/OrdersScreen";
import AddOrderScreen from "./screens/AddOrderScreen";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function App(props) {
  const token = useSelector((state) => state.auth.token);

  return (
    <NavigationContainer>
      {token ? (
        <Drawer.Navigator>
          <Drawer.Screen name="add order" component={AddOrderScreen} />

          <Drawer.Screen name="orders" component={OrdersScreen} />
        </Drawer.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="login" component={LoginScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default () => {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <App />
      {/* </PersistGate> */}
    </Provider>
  );
};
