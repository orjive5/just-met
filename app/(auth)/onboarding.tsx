import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useForm } from "react-hook-form";
import { useRouter } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import { useEffect, useState } from "react";
import TextInput from "@/components/TextInput";
import RadioButtonInput from "@/components/RadioButtonInput";

type TOnboardingFormValues = {
  firstName: string;
  age: string;
  gender: string;
  relationshipStatus: string;
  location: {
    country: string;
    city: string;
  };
};

const Onboarding = () => {
  const { user, isLoaded } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const { control, handleSubmit, setError, setValue } =
    useForm<TOnboardingFormValues>({
      defaultValues: {
        firstName: "",
        age: "",
        gender: "",
        relationshipStatus: "",
        location: {
          country: "",
          city: "",
        },
      },
    });

  const onSubmit = async (data: TOnboardingFormValues) => {
    const { firstName, age, gender, relationshipStatus, location } = data;

    try {
      setIsLoading(true);
      await user?.update({
        firstName,
        unsafeMetadata: {
          age,
          gender,
          relationshipStatus,
          location,
          onboardingCompleted: true,
        },
      });

      await user?.reload();

      return router.push("/(tabs)/home");
    } catch (error) {
      console.log("error", error);
      setError("root", {
        type: "manual",
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    if (!user) {
      return;
    }

    if (user?.unsafeMetadata?.age) {
      setValue("age", String(user?.unsafeMetadata?.age));
    }

    if (user?.unsafeMetadata?.gender) {
      setValue("gender", String(user?.unsafeMetadata?.gender));
    }

    if (user?.unsafeMetadata?.relationshipStatus) {
      setValue(
        "relationshipStatus",
        String(user?.unsafeMetadata?.relationshipStatus),
      );
    }

    if (user?.unsafeMetadata?.location) {
      setValue("location", user?.unsafeMetadata?.location);
    }
  }, [isLoaded, user]);

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top + 40, paddingBottom: insets.bottom },
      ]}
    >
      <View style={styles.headingContainer}>
        <Text style={styles.label}>Complete your account</Text>
        <Text style={styles.description}>
          Complete your account and start meeting great people over coffee or
          drinks.
        </Text>
      </View>

      <View style={styles.formContainer}>
        <TextInput
          control={control}
          placeholder="Enter your first name"
          label="First Name"
          required
          name="firstName"
        />

        <TextInput
          control={control}
          placeholder="Enter your age"
          label="Age"
          required
          name="age"
        />

        <RadioButtonInput
          control={control}
          placeholder="Select your gender"
          label="Gender"
          required
          name="gender"
          options={[
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
            { label: "Other", value: "other" },
          ]}
        />

        <RadioButtonInput
          control={control}
          placeholder="What is your relationship status?"
          label="Relationship Status"
          required
          name="relationshipStatus"
          options={[
            { label: "Single", value: "single" },
            { label: "Taken", value: "taken" },
            { label: "Not looking", value: "not_looking" },
          ]}
        />

        <RadioButtonInput
          control={control}
          placeholder="What is your location?"
          label="Location"
          required
          name="location"
          options={[
            {
              label: "Belgrade",
              value: { country: "serbia", city: "belgrade" },
            },
            {
              label: "Novi Sad",
              value: { country: "serbia", city: "novi_sad" },
            },
          ]}
        />

        <View style={{ marginTop: 20 }}>
          <TouchableOpacity
            style={[styles.button, { opacity: isLoading ? 0.7 : 1 }]}
            onPress={handleSubmit(onSubmit)}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : null}
            <Text style={styles.buttonText}>
              {isLoading ? "Loading..." : "Complete Account"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    gap: 20,
  },
  headingContainer: {
    width: "100%",
    gap: 5,
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    color: "gray",
  },
  formContainer: {
    width: "100%",
    marginTop: 20,
    gap: 20,
  },
  textIput: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    width: "100%",
  },
  button: {
    width: "100%",
    backgroundColor: "#fd5564",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
  },
  buttonText: {
    color: "white",
  },
});
