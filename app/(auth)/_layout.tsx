import { Redirect, Stack, usePathname } from "expo-router";
import { useUser } from "@clerk/clerk-expo";

export default function RootLayout() {
  const pathName = usePathname();
  const { isSignedIn, user } = useUser();

  if (isSignedIn && user?.unsafeMetadata?.onboardingCompleted !== true) {
    if (pathName !== "/onboarding") {
      return <Redirect href="/onboarding" />;
    }
  }

  if (isSignedIn && user?.unsafeMetadata?.onboardingCompleted === true) {
    return <Redirect href="/(tabs)/home" />;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
    </Stack>
  );
}
