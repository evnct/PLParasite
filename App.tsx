import React from "react";
import AppContainer from "./src/components/app-container";
import Navigator from "./src/components/navigator";
import { StatusBar } from "native-base";

export default function App() {
  return (
    <AppContainer >
      <Navigator />
      <StatusBar />
    </AppContainer>
  );
}