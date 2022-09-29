import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IndCard from "./components/IndCard";
import Categories from "./screens/Categories";
import Home from "./screens/Home";
import Ingred from "./screens/Ingred";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Categories"
          component={Categories}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="IndCard"
          component={IndCard}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Ing"
          component={Ingred}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
