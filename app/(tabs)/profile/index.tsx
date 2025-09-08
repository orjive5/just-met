import { SignedIn, useClerk } from "@clerk/clerk-expo";
import { StyleSheet, View } from "react-native";
import { Typography } from "@/components/Typography/Typography";
import { useRouter } from "expo-router";
import { Colors } from "@/theme/colors";
import React from "react";
import { Button } from "@/components/Button/Button";
import { ButtonVariant } from "@/components/Button/types";
import Ionicons from "@expo/vector-icons/Ionicons";
import Avatar from "@/components/Avatar/Avatar";
import { AvatarSize } from "@/components/Avatar/types";

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
          <Avatar source={user?.imageUrl} size={AvatarSize.ExtraLarge} />
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
        <View style={{ marginTop: 10 }}>
          <Button
            label="Edit Profile"
            onPress={() => router.push("/(tabs)/profile/edit-profile")}
            fullWidth={false}
            variant={ButtonVariant.Minimal}
            icon={
              <Ionicons
                name="create-outline"
                size={24}
                color={Colors.textPrimary}
              />
            }
          />
        </View>
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
});
