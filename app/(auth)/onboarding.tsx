import { ScrollView, StyleSheet, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useForm } from "react-hook-form";
import { useRouter } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import React, { useEffect, useState } from "react";
import TextInput from "@/components/TextInput";
import RadioButtonInput from "@/components/RadioButtonInput";
import { Colors } from "@/theme/colors";
import { Typography } from "@/components/Typography/Typography";
import NumberInput from "@/components/NumberInput";
import ImageInput from "@/components/ImageInput";
import { Button } from "@/components/Button/Button";
import { ButtonVariant } from "@/components/Button/types";

type TOnboardingFormValues = {
  profileImage: string;
  firstName: string;
  age: string;
  gender: string;
  relationshipStatus: string;
  location: { country: string; city: string } | null;
};

const Onboarding = () => {
  const { user, isLoaded } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const { control, handleSubmit, setError, setValue } =
    useForm<TOnboardingFormValues>({
      defaultValues: {
        profileImage: "",
        firstName: "",
        age: "",
        gender: "",
        relationshipStatus: "",
        location: null,
      },
    });

  const onSubmit = async (data: TOnboardingFormValues) => {
    const {
      profileImage,
      firstName,
      age,
      gender,
      relationshipStatus,
      location,
    } = data;

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

      await user?.setProfileImage({
        file: profileImage,
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
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          {
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left + 20,
            paddingRight: insets.right + 20,
          },
        ]}
      >
        <View style={styles.headingContainer}>
          <Typography variant="h3">Complete your account</Typography>
          <Typography color="textLight">Make yourself known.</Typography>
        </View>

        <View style={styles.formContainer}>
          <TextInput
            control={control}
            placeholder="Enter your first name"
            label="First Name"
            required
            name="firstName"
          />

          <NumberInput
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

          <ImageInput
            control={control}
            label="Upload your profile image"
            name="profileImage"
            required
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
            <Button
              label="Complete Account"
              onPress={handleSubmit(onSubmit)}
              isLoading={isLoading}
              variant={ButtonVariant.FILLED}
              disabled={isLoading}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: `${Colors.background}`,
  },
  container: {
    gap: 20,
  },
  headingContainer: {
    width: "100%",
    gap: 5,
  },
  formContainer: {
    width: "100%",
    marginTop: 20,
    gap: 20,
  },
  textInput: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    width: "100%",
  },
  button: {
    width: "100%",
    height: 50,
    padding: 10,
    borderRadius: 10,
    backgroundColor: `${Colors.brandPrimary}`,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
  },
});
