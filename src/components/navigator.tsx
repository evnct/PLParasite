import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import DataScreen from "../screens/data-screen";
import TablesScreen from "../screens/tables-screen";

const Tab = createBottomTabNavigator();

export default function Navigator() {
  return (
    <Tab.Navigator
      initialRouteName="Data"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ color }) => {
          if (route.name === "Data") {
            return <Ionicons name="swap-vertical" size={40} color={color} />;
          } else if (route.name === "Table") {
            return <Ionicons name="trophy-outline" size={40} color={color} />;
          }
        },
        tabBarActiveTintColor: "#222222",
        tabBarInactiveTintColor: "#929292",
        tabBarStyle: {
          backgroundColor: "#FFF",
          borderTopWidth: 0,
        },
      })}
    >
      <Tab.Screen name="Data" component={DataScreen} />
      <Tab.Screen name="Table" component={TablesScreen} />
    </Tab.Navigator>
  );
}
