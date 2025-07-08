import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import React from "react";
import { Colors } from "@/theme/colors";

export const LegalLinks = () => (
  <View style={styles.container}>
    <Text style={styles.text}>
      By signing up you agree to the{" "}
      <Link href="/terms-of-service" style={styles.link}>
        Terms of Service
      </Link>
      {", "}
      <Link href="/privacy-policy" style={styles.link}>
        Privacy Policy
      </Link>
      {" and "}
      <Link href="/community-guidelines" style={styles.link}>
        Community Guidelines
      </Link>
      .
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 14,
    color: `${Colors.darkPrimary}`,
    textAlign: "center",
  },
  link: {
    color: Colors.brandSecondary,
    textDecorationLine: "underline",
  },
});
