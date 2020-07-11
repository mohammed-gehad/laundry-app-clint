import React, { useState } from "react";
import { View, Text } from "react-native";
import Login from "../features/auth/Login";
import SignIn from "../features/auth/SignIn";
import { Button } from "react-native-elements";

export default function LoginScreen() {
  const [signin, setSignin] = useState(true);
  const toggle = () => {
    setSignin(!signin);
  };

  return (
    <View>
      {signin ? <SignIn /> : <Login />}
      {signin ? (
        <Button title="login instead" type="outline" onPress={toggle} />
      ) : (
        <Button title="signin instead" type="outline" onPress={toggle} />
      )}
    </View>
  );
}
