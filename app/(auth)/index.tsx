import React, { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import { isClerkAPIResponseError, useSSO } from "@clerk/clerk-expo";
import { View, StyleSheet } from "react-native";
import { ClerkAPIError } from "@clerk/types";
import { Colors } from "@/theme/colors";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { LegalLinks } from "@/modules/auth/components/LegalLinks";
import { ErrorMessage } from "@/components/ErrorMessage";
import { Button } from "@/components/Button/Button";

export const useWarmUpBrowser = () => {
  useEffect(() => {
    // Preloads the browser for Android devices to reduce authentication load time
    // See: https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync();
    return () => {
      // Cleanup: closes browser when component unmounts
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

// Handle any pending authentication sessions
WebBrowser.maybeCompleteAuthSession();

export default function Index() {
  useWarmUpBrowser();

  // Use the `useSSO()` hook to access the `startSSOFlow()` method
  const { startSSOFlow } = useSSO();
  const [errors, setErrors] = useState<ClerkAPIError[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignInWithGoogle = async () => {
    setIsLoading(true);
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: "oauth_google",
        redirectUrl: AuthSession.makeRedirectUri(),
      });

      // If sign in was successful, set the active session
      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      } else {
        // If there is no `createdSessionId`,
        // there are missing requirements, such as MFA
        // Use the `signIn` or `signUp` returned from `startSSOFlow`
        // to handle next steps
      }
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        setErrors(error.errors);
      } else {
        console.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.pageContent}>
        <View style={styles.headingContainer}>
          <Image
            source={require("@/assets/images/logo.png")}
            style={styles.logo}
          />
        </View>
        <View style={styles.formContainer}>
          <Button
            label="Continue with Google"
            onPress={handleSignInWithGoogle}
            isLoading={isLoading}
            icon={
              <Image
                source={require("@/assets/images/googleLogo.png")}
                contentFit="contain"
                style={{ width: 32, height: 32 }}
              />
            }
            disabled={isLoading}
          />
          {errors.map((error) => (
            <ErrorMessage message={error.message} />
          ))}
          <LegalLinks />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: `${Colors.background}`,
  },
  pageContent: {
    gap: 20,
    height: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 200,
    paddingBottom: 40,
    paddingInline: 40,
  },
  headingContainer: {
    width: "100%",
    gap: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: { width: 300, height: 300 },
  formContainer: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    gap: 30,
    width: "100%",
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
