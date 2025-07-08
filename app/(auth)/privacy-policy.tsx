import { Text, View } from "react-native";
import { Link } from "expo-router";
import { Colors } from "@/theme/colors";

const PrivacyPolicy = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Privacy Policy</Text>
      <Link
        href="/"
        style={{
          color: Colors.brandSecondary,
          textDecorationLine: "underline",
        }}
      >
        Back
      </Link>
    </View>
  );
};

export default PrivacyPolicy;
