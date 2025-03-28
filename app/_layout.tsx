import { Stack } from "expo-router";
import './globals.css'
import "nativewind"

export default function RootLayout() {
  return <Stack  screenOptions={{headerShown: false}}/>;
}
