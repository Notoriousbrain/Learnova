import { NavigationContainer } from "@react-navigation/native";
import { useTailwind } from "nativewind/dist";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "./screens";
import { Login, Register } from "./components";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen options={{headerShown : false}} name="Homescreen" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
