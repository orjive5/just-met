import { useUser } from "@clerk/clerk-expo";
import { Redirect, Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/theme/colors";

export default function RootLayout() {
  const { user, isSignedIn } = useUser();

  if (!isSignedIn) {
    return <Redirect href="/(auth)" />;
  }

  if (isSignedIn && user?.unsafeMetadata?.onboardingCompleted !== true) {
    return <Redirect href="/(auth)/onboarding" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: `${Colors.brandPrimary}`,
        popToTopOnBlur: true,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-sharp" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: "Notifications",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="inbox"
        options={{
          title: "Inbox",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbox" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
