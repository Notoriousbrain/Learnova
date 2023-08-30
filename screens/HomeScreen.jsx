import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Login } from '../components';
import supabase from '../supabase/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchEmail = async () => { 
      try {
            const userString = await AsyncStorage.getItem("user");
             if (userString) {
               const user = JSON.parse(userString);
               setEmail(user.email);
          }
        } catch (storageError) {
            console.error("Error fetching user data:", storageError.message);
          }
        }

        fetchEmail();
  },[])

   const fetchUserDetailsByEmail = async (email) => {
    try {
      console.log("Fetching user details for email:", email);
      const { data, error } = await supabase
        .from("User") 
        .select("user_name")
        .eq("email", email)
        .single();

      if (error) {
        throw new Error("Failed to fetch user details", error);
      }

      return data;
    } catch (error) {
      throw new Error(`Error fetching user details: ${error.message}`);
    }
  }

  const logOut  = async () => {
    try {
      let { error } = await supabase.auth.signOut()
      setEmail("");
      navigation.navigate("Login");
        try {
          await AsyncStorage.removeItem("user");
        } catch (storageError) {
          console.error("Error storing user data:", storageError.message);
        }
      console.log("Log Out Successfully")
      
      if(error){
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  
  }

  // useEffect(() => {
  //   const fetchUserDetails = async (email) => {
  //     try {
  //       const userDetails = await fetchUserDetailsByEmail(email);
  //       console.log("User details:", userDetails);
  //     } catch (error) {
  //       console.error(error.message);
  //     }
  //   };
  //   fetchUserDetails(email)
  // },[email])


  return (
    <View>
      <SafeAreaView>
        <Text>Yo</Text>
        <Text>{email}</Text>
        <TouchableOpacity onPress={() => logOut()} className="p-3 bg-red-600">
          <Text>LOG OUT</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

export default HomeScreen