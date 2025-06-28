import { useUser } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";

export default function RootLayout() {
  const { user, isSignedIn } = useUser();

  if (!isSignedIn) {
    return <Redirect href="/(auth)" />;
  }

  if (isSignedIn && user?.unsafeMetadata?.onboardingCompleted !== true) {
    return <Redirect href="/(auth)/onboarding" />;
  }

  return (
    <Stack>
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen name="chat" options={{ headerShown: false }} />
    </Stack>
  );
}
