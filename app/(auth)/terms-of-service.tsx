import { Text, View } from "react-native";
import { Link } from "expo-router";
import { Colors } from "@/theme/colors";

const TermsOfService = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Terms of Service</Text>
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

export default TermsOfService;
