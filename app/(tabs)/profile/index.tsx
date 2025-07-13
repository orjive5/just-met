import { Text, View } from "react-native";
import { Link } from "expo-router";
import { Typography } from "@/components/Typography/Typography";

export default function ProfileScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Profile Screen</Text>
      <Link href="/(tabs)/profile/edit-profile" push asChild>
        <Typography>Edit Profile Screen</Typography>
      </Link>
    </View>
  );
}
