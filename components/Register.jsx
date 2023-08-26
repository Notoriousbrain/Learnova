import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect, useState } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import supabase from "../supabase/supabase";

const Register = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const register = async (email, password) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        alert(error.message);
        return null;
      }

      console.log("User Registered in successfully:");
      navigation.navigate("Homescreen");
    } catch (error) {
      console.error("Error Registering in:", error.message);
      return null;
    }
  };

  const handleSignIn = async () => {
    if (email === "") {
      setEmailError(true);
    } else {
      setEmailError(false);
    }

    if (password === "") {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }

    if(confirmPassword !== password){
      setConfirmPasswordError("Password didn't matched");
    }
    else if(confirmPassword === ""){
      setConfirmPasswordError("Confirm Password field is empty")
    }else{
      setConfirmPasswordError("");
    }

    if (email !== "" && password !== "" && password === confirmPassword) {
      register(email, password);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <KeyboardAvoidingView className="flex justify-center items-center bg-black h-full w-full">
      <View className="flex justify-center mb-16 items-center w-4/5">
        <View>
          <Text className="font-bold text-3xl text-white">Sign Up</Text>
        </View>
        <View className="w-full mt-10">
          <TextInput
            placeholder="Enter Email"
            placeholderTextColor="gray"
            value={email}
            onChangeText={(text) => setEmail(text)}
            className={`outline-none border rounded-md text-white ${
              emailError ? "border-red-500" : "border-gray-600"
            } w-full p-2`}
          />
          {emailError && (
            <Text className="text-red-500">Email field is required</Text>
          )}
        </View>
        <View className="w-full mt-6 ">
          <TextInput
            placeholder="Enter Password"
            placeholderTextColor="gray"
            value={password}
            onChangeText={(text) => setPassword(text)}
            className={`outline-none border rounded-md text-white ${
              passwordError ? "border-red-500" : "border-gray-600"
            } w-full p-2 `}
          />
          {passwordError && (
            <Text className="text-red-500">Password field is required</Text>
          )}
        </View>
        <View className="w-full mt-6 ">
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor="gray"
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            className={`outline-none border rounded-md text-white ${
              confirmPasswordError ? "border-red-500" : "border-gray-600"
            } w-full p-2 `}
          />
          {confirmPasswordError && (
            <Text className="text-red-500">{confirmPasswordError}</Text>
          )}
        </View>
        <TouchableOpacity
          onPress={handleSignIn}
          className="p-3 bg-white w-full mt-8 flex justify-center items-center rounded-md"
        >
          <Text className="font-semibold text-black text-lg">SIGN UP</Text>
        </TouchableOpacity>
        <View className="flex items-end w-full mt-2">
          <Text
            className="text-gray-400"
            onPress={() => navigation.navigate("Login")}
          >
            Already have account? Sign In
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Register;
