import React from "react";
import MainScreen from "./src/screens/main-screen";
import StandingsScreen from "./src/screens/standings-screen";
import AppContainer from "./src/components/app-container";
import Navbar from "./src/components/navbar";

export default function App() {
  return (
    <AppContainer>
      <Navbar />
      <MainScreen />
    </AppContainer>
  );
}