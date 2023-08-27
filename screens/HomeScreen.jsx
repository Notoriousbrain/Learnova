import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Login } from '../components';
import supabase from '../supabase/supabase';

const HomeScreen = () => {
  const email = useSelector((state) => state);

   const fetchUserDetailsByEmail = async (email) => {
    try {
      console.log("Fetching user details for email:", email);
      const { data, error } = await supabase
        .from("User") // Replace 'User' with your actual table name
        .select("user_name, role")
        .eq("email", email)
        .single();

      if (error) {
        throw new Error("Failed to fetch user details", error);
      }

      // Return the fetched user details
      return data;
    } catch (error) {
      throw new Error(`Error fetching user details: ${error.message}`);
    }
  }

  useEffect(() => {
    const fetchUserDetails = async (email) => {
      try {
        const userDetails = await fetchUserDetailsByEmail(email);
        console.log("User details:", userDetails);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchUserDetails(email)
  },[email])


  return (
    <View>
      {!email ? (
        <Login />
      ) : (
      <SafeAreaView>
        <Text>Hi</Text>
      </SafeAreaView>
 )} 
    </View>
  );
}

export default HomeScreen