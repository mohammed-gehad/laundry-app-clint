import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SignInAsync } from "./authSlice";
import { Text, Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { ActivityIndicator } from "react-native";

export default function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const loading = useSelector((state) => state.auth.loading);

  return (
    <>
      <Input
        placeholder="User Name"
        leftIcon={<Icon name="user" size={24} color="black" />}
        value={username}
        onChangeText={setUsername}
      />

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
          title="Sign In"
          onPress={() => {
            dispatch(SignInAsync({ email, password, username }));
          }}
        />
      )}
    </>
  );
}
