import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import React from "react";
import { Colors } from "@/theme/colors";

export const AuthButton = ({
  onPress,
  isLoading,
}: {
  onPress: () => void;
  isLoading: boolean;
}) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    {isLoading ? (
      <ActivityIndicator size={32} color={`${Colors.brandPrimary}`} />
    ) : (
      <>
        <Image
          source={require("@/assets/images/googleLogo.png")}
          style={styles.image}
          contentFit="contain"
        />
        <Text style={styles.buttonText}>Continue with Google</Text>
      </>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 50,
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: `${Colors.brandPrimary}`,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
  },
  buttonText: {
    color: `${Colors.brandPrimary}`,
    fontWeight: "semibold",
    fontSize: 16,
  },
  image: { width: 32, height: 32 },
});
