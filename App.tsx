import React from "react";
import AppContainer from "./src/components/app-container";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DataScreen from './src/screens/data-screen';
import TablesScreen from "./src/screens/tables-screen";
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

export default function App() {

  const Tab = createBottomTabNavigator();

  return (
    <AppContainer >
      <Tab.Navigator initialRouteName="Data"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            if (route.name === 'Data') {
              return <MaterialCommunityIcons name="home-analytics" size={size} color={color} />;
            } else if (route.name === 'Table') {
              return <AntDesign name="table" size={size} color={color} />;
            }
          },
          tabBarActiveTintColor: '#A065AB',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Data" component={DataScreen} />
        <Tab.Screen name="Table" component={TablesScreen} />
      </Tab.Navigator>
    </AppContainer>
  );
}