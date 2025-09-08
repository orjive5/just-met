import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useForm } from "react-hook-form";
import { useUser } from "@clerk/clerk-expo";
import React, { useEffect, useState } from "react";
import TextInput from "@/components/TextInput";
import RadioButtonInput from "@/components/RadioButtonInput";
import { Colors } from "@/theme/colors";
import { Typography } from "@/components/Typography/Typography";
import NumberInput from "@/components/NumberInput";
import ImageInput from "@/components/ImageInput";
import Avatar from "@/components/Avatar/Avatar";
import { AvatarSize } from "@/components/Avatar/types";

type TOnboardingFormValues = {
  profileImage: string | null;
  firstName: string;
  age: string;
  gender: string;
  relationshipStatus: string;
  location: { country: string; city: string } | null;
};

const EditProfileScreen = () => {
  const { user, isLoaded } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit, setError, setValue, watch } =
    useForm<TOnboardingFormValues>({
      defaultValues: {
        profileImage: null,
        firstName: "",
        age: "",
        gender: "",
        relationshipStatus: "",
        location: null,
      },
    });

  const profileImageValue = watch("profileImage");

  const imageSource = profileImageValue || user?.imageUrl;

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
          ...user?.unsafeMetadata,
          age,
          gender,
          relationshipStatus,
          location,
        },
      });

      if (profileImage) {
        await user?.setProfileImage({
          file: profileImage,
        });
      }

      await user?.reload();
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

    if (user?.firstName) {
      setValue("firstName", String(user?.firstName));
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
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          {imageSource && (
            <Avatar source={imageSource} size={AvatarSize.ExtraLarge} />
          )}

          <ImageInput
            control={control}
            name="profileImage"
            showUploaded={false}
            withLabel={false}
            buttonText="Change Image"
          />

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

          <View style={{ marginTop: 20, width: "100%" }}>
            <TouchableOpacity
              style={[styles.button, { opacity: isLoading ? 0.7 : 1 }]}
              onPress={handleSubmit(onSubmit)}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="white" />
              ) : null}
              <Typography variant="button" color="textSecondary">
                {isLoading ? "Loading..." : "Save Changes"}
              </Typography>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: `${Colors.background}`,
  },
  scrollContainer: {
    gap: 20,
    padding: 20,
  },
  headingContainer: {
    width: "100%",
    gap: 5,
  },
  formContainer: {
    width: "100%",
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    width: "100%",
  },
  button: {
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
