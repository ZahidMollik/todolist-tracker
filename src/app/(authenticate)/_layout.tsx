import { Stack } from "expo-router";

export default function Layout() {
  return(
    <Stack screenOptions={{headerShown:false}}>
      <Stack.Screen name="Login"/>
      <Stack.Screen name="Register"/>
    </Stack>
  );
}