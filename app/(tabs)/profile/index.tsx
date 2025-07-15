import { SignedIn, useClerk } from "@clerk/clerk-expo";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Typography } from "@/components/Typography/Typography";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import { Colors } from "@/theme/colors";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const ProfileScreen = () => {
  const { user } = useClerk();
  const router = useRouter();

  function capitalizeFirstLetter(str?: string) {
    if (!str) {
      return "";
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <View style={styles.container}>
      <SignedIn>
        {user?.imageUrl && (
          <Image
            alt="Selected image"
            source={user?.imageUrl}
            style={{
              width: 200,
              height: 200,
              marginTop: 10,
              borderRadius: 100,
              borderWidth: 1,
              borderColor: `${Colors.brandPrimary}`,
            }}
          />
        )}
        <Typography variant="h2">
          {user?.firstName}, {user?.unsafeMetadata?.age}
        </Typography>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            gap: 4,
            marginBlock: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: 4,
            }}
          >
            <Typography>Gender:</Typography>
            <Typography>
              {capitalizeFirstLetter(user?.unsafeMetadata?.gender)}
            </Typography>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: 4,
            }}
          >
            <Typography>Location:</Typography>
            <Typography>
              {capitalizeFirstLetter(user?.unsafeMetadata?.location?.city)},{" "}
              {capitalizeFirstLetter(user?.unsafeMetadata?.location?.country)}
            </Typography>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: 4,
            }}
          >
            <Typography>Relationship status:</Typography>
            <Typography>
              {capitalizeFirstLetter(user?.unsafeMetadata?.relationshipStatus)}
            </Typography>
          </View>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/(tabs)/profile/edit-profile")}
        >
          <Ionicons
            name="create-outline"
            size={24}
            color={Colors.textPrimary}
          />
          <Typography>Edit Profile</Typography>
        </TouchableOpacity>
      </SignedIn>
    </View>
  );
};

export default ProfileScreen;

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
