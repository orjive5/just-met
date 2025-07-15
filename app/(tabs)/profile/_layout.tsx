import { Stack, useRouter } from "expo-router";
import { Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/theme/colors";

export default function Layout() {
  const router = useRouter();

  return (
    <Stack screenOptions={{ animation: "none" }}>
      <Stack.Screen
        name="index"
        options={{
          title: "Profile",
          headerRight: () => (
            <Pressable onPress={() => router.push("/profile/settings")}>
              <Ionicons name="settings" size={24} color={Colors.textLight} />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          title: "Settings",
        }}
      />
      <Stack.Screen name="edit-profile" options={{ title: "Edit Profile" }} />
    </Stack>
  );
}
