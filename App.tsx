import React from "react";
import AppContainer from "./src/components/app-container";
import Navbar from "./src/components/navbar";
import { Box } from "native-base";
import DataScreen from './src/screens/data-screen';
import TablesScreen from './src/screens/tables-screen';

export default function App() {
  return (
    <AppContainer>
      <Box mt={50} />
      <TablesScreen />
    </AppContainer>
  );
}