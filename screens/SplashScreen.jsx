import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './HomeScreen';
import { Login } from '../components';

const SplashScreen = () => {
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
        };

        fetchEmail();
      }, []);
  return (
    <View>
      {!email ? (
        <Login />
      ) : (
       <HomeScreen />
      )}
    </View>
  );
}

export default SplashScreen