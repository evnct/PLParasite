import React from "react";
import AppContainer from "./src/components/app-container";
import Navigator from "./src/components/navigator";
import { StatusBar } from "native-base";

export default function App() {
  return (
    <AppContainer >
      <StatusBar animated translucent backgroundColor={'transparent'} />
      <Navigator />
      <StatusBar />
    </AppContainer>
  );
}