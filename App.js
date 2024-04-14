import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Gps from "./routes/Gps";
import LightSensorPage from "./routes/LightSensor";
import MagnetometerPage from "./routes/Magnetometer";
import AccelerometerPage from "./routes/Accelerometer";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Light Sensor"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconComponent;

            if (route.name === "GPS") {
              iconComponent = (
                <Entypo name="direction" size={size} color={color} />
              );
            } else if (route.name === "Light Sensor") {
              iconComponent = (
                <MaterialCommunityIcons
                  name="ceiling-fan-light"
                  size={size}
                  color={color}
                />
              );
            } else if (route.name === "Accelerometer") {
              iconComponent = (
                <Ionicons name="footsteps" size={size} color={color} />
              );
            } else if (route.name === "Magnetometer") {
              iconComponent = (
                <Entypo name="compass" size={size} color={color} />
              );
            }

            return iconComponent;
          },
          tabBarActiveTintColor: "#13856e",
          tabBarInactiveTintColor: "#000",
        })}
      >
        <Tab.Screen name="Light Sensor" component={LightSensorPage} />
        <Tab.Screen name="Accelerometer" component={AccelerometerPage} />
        <Tab.Screen name="Magnetometer" component={MagnetometerPage} />
        <Tab.Screen name="GPS" component={Gps} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}
