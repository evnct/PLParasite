import React from "react";
import AppContainer from "./src/components/app-container";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DataScreen from './src/screens/data-screen';
import TablesScreen from "./src/screens/tables-screen";
import { } from "native-base";

export default function App() {

  type RootStackParamList = {
    Data: undefined;
    Table: undefined;
  };

  const Tab = createBottomTabNavigator<RootStackParamList>();

  return (
    <AppContainer >
      <Tab.Navigator initialRouteName="Data">
        <Tab.Screen name="Data" options={{ headerShown: false }} component={DataScreen} />
        <Tab.Screen name="Table" options={{ headerShown: false }} component={TablesScreen} />
      </Tab.Navigator>
    </AppContainer>
  );
}