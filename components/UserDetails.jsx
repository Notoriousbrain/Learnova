import { View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux';
import supabase from '../supabase/supabase';

const UserDetails = () => {
    const [userName, setUserName] = useState("");
    const [role, setRole] = useState(false);
    const [userNameError, setUserNameError] = useState("");
     const email = useSelector((state) => state);

    const insertUserData = async (email, userName, role) => {
      try {
        const { data, error } = await supabase
          .from("User") 
          .insert([{ 
            email,
            UserName: userName, 
            Role: role 
        }]);

        if (error) {
          throw new Error("Failed to insert user data");
        }

        // Return the inserted data
        return data;
      } catch (error) {
        throw new Error(`Error inserting user data: ${error.message}`);
      }
    }

    const handleSubmit = async () => {
      try {
        const insertedData = await insertUserData(email, userName, role);
        console.log("User data inserted:", insertedData);
        navigation.navigate("Homescreen")
        // Handle success, navigate, update UI, etc.
      } catch (error) {
        console.error(error.message);
        // Handle error, show error message, etc.
      }
    };



  return (
    <KeyboardAvoidingView className=" flex justify-center items-center h-full w-full">
      <SafeAreaView className="w-4/5">
        <View className="bottom-10">
          <TextInput
            placeholder="Enter Name"
            placeholderTextColor="gray"
            value={userName}
            onChangeText={(text) => setUserName(text)}
            className={`outline-none border rounded-md text-white ${
              userNameError ? "border-red-500" : "border-gray-600"
            } w-full p-2`}
          />
          {userNameError && (
            <Text className="text-red-500">Name field is required</Text>
          )}
        </View>
        <View className="space-y-2">
          <View
            onPress={() => setRole(false)}
            className="p-3 border border-gray-600 rounded-md"
          >
            <Text>Learner</Text>
          </View>
          <Text className="self-center font-semibold text-lg">Or</Text>
          <View
            onPress={() => setRole(true)}
            className="p-3 border border-gray-600 rounded-md"
          >
            <Text>Creator</Text>
          </View>
          <TouchableOpacity
            onPress={handleSubmit}
            className="p-3 bg-white w-full mt-8 flex justify-center items-center rounded-md"
          >
            <Text className="font-semibold text-black text-lg">SAVE</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

export default UserDetails