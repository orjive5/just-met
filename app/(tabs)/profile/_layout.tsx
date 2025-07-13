import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ animation: "none" }}>
      <Stack.Screen name="index" options={{ title: "Profile" }} />
      <Stack.Screen name="edit-profile" options={{ title: "Edit Profile" }} />
    </Stack>
  );
}
