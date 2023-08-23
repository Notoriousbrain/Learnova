import { NavigationContainer } from "@react-navigation/native";
import { useTailwind } from "nativewind/dist";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Login";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

