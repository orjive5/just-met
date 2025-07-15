import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useClerk } from "@clerk/clerk-expo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/theme/colors";
import { Typography } from "@/components/Typography/Typography";
import React from "react";

export default function SettingsScreen() {
  const { signOut } = useClerk();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => signOut()}>
        <Ionicons name="log-out-outline" size={24} color={Colors.textPrimary} />
        <Typography>Sign Out</Typography>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: `${Colors.background}`,
  },
  button: {
    height: 50,
    padding: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "gray",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },
});
