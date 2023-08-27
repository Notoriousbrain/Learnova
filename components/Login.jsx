import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect, useState } from "react";
import { Text, TextInput, View, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import supabase from "../supabase/supabase";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";



const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [emailError, setEmailError] = useState(false);
   const [passwordError, setPasswordError] = useState(false);

   const login  = async (email, password) => {
     try {
       const { error } = await supabase.auth.signInWithPassword({
         email,
         password,
       });
       
       if (error) {
        alert(error.message)
         return null;
        }
        
        console.log("User logged in successfully:");
        dispatch(loginUser(email));
        const user = { email, password}
          try {
            await AsyncStorage.setItem("user", JSON.stringify(user));
          } catch (storageError) {
            console.error("Error storing user data:", storageError.message);
          }
        navigation.navigate("Homescreen");
     } catch (error) {
       console.error("Error logging in:", error.message);
       return null;
     }
   }

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

      if (email !== "" && password !== "") {
          login(email, password);
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
          <Text className="font-bold text-3xl text-white">Sign In</Text>
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
        <View className="flex items-end w-full mt-2">
          <Text className="text-gray-400">Forgot Password?</Text>
        </View>
        <TouchableOpacity
          onPress={handleSignIn}
          className="p-3 bg-white w-full mt-8 flex justify-center items-center rounded-md"
        >
          <Text className="font-semibold text-black text-lg">SIGN IN</Text>
        </TouchableOpacity>
        <View className="flex items-end w-full mt-2">
          <Text
            className="text-gray-400"
            onPress={() => navigation.navigate("Register")}
          >
            Don't have account? Sign Up
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;
