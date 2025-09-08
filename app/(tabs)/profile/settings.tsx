import { StyleSheet, View } from "react-native";
import { useClerk } from "@clerk/clerk-expo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/theme/colors";
import React from "react";
import { Button } from "@/components/Button/Button";
import { ButtonVariant } from "@/components/Button/types";

export default function SettingsScreen() {
  const { signOut } = useClerk();
  return (
    <View style={styles.container}>
      <Button
        label="Sign Out"
        onPress={signOut}
        icon={
          <Ionicons
            name="log-out-outline"
            size={24}
            color={Colors.textPrimary}
          />
        }
        variant={ButtonVariant.Minimal}
        fullWidth={false}
      />
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
});
