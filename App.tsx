import React from "react";
import { View } from "react-native";
import GestureHandler from "./src/app/components/GestureHandler";

export default function App() {
  return (
	<View style={{flex: 1}}>
			<GestureHandler/>
	</View>
  );
}
