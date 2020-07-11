import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAsync } from "./authSlice";
import { Text, Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { ActivityIndicator } from "react-native";

export default function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("customer@hotmail.com");
  const [password, setPassword] = useState("msamsamsa3");
  const loading = useSelector((state) => state.auth.loading);

  return (
    <>
      <Input
        placeholder="Email"
        leftIcon={<Icon name="envelope" size={24} color="black" />}
        value={email}
        onChangeText={setEmail}
      />

      <Input
        placeholder="Password"
        secureTextEntry={true}
        leftIcon={<Icon name="key" size={24} color="black" />}
        value={password}
        onChangeText={setPassword}
      />

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Button
          title="login"
          onPress={() => {
            console.log(email);
            dispatch(loginAsync({ email, password }));
          }}
        />
      )}
    </>
  );
}
