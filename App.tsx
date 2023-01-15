import React from "react";
import MainScreen from "./src/screens/main-screen";
import StandingsScreen from "./src/screens/standings-screen";
import AppContainer from "./src/components/app-container";
import Navbar from "./src/components/navbar";
import { Box } from "native-base";

export default function App() {
  return (
    <AppContainer>
      <Box mt={50} />
      <MainScreen />
    </AppContainer>
  );
}