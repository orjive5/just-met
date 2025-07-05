import { SignedIn, useClerk } from "@clerk/clerk-expo";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const HomeScreen = () => {
  const { signOut, user } = useClerk();

  function capitalizeFirstLetter(str?: string) {
    if (!str) {
      return "";
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <View style={styles.container}>
      <SignedIn>
        <View>
          <Text>First name: {user?.firstName}</Text>
          <Text>Age: {user?.unsafeMetadata?.age}</Text>
          <Text>
            Gender: {capitalizeFirstLetter(user?.unsafeMetadata?.gender)}
          </Text>
          <Text>
            Location:{" "}
            {capitalizeFirstLetter(user?.unsafeMetadata?.location?.city)},{" "}
            {capitalizeFirstLetter(user?.unsafeMetadata?.location?.country)}
          </Text>
          <Text>
            Relationship status:{" "}
            {capitalizeFirstLetter(user?.unsafeMetadata?.relationshipStatus)}
          </Text>
        </View>
        <View style={{ marginTop: 20, width: 100 }}>
          <TouchableOpacity style={styles.button} onPress={() => signOut()}>
            <Text style={styles.buttonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </SignedIn>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  button: {
    width: "100%",
    backgroundColor: "#fd5564",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
