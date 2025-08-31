import { Controller } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { Typography } from "@/components/Typography/Typography";
import { Colors } from "@/theme/colors";
import { ErrorMessage } from "@/components/ErrorMessage";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Button } from "@/components/Button/Button";
import { ButtonVariant } from "@/components/Button/types";

const ImageInput = ({
  control,
  required,
  label,
  name,
  showUploaded = true,
  withLabel = true,
  buttonText = "Pick an Image",
}: {
  control: any;
  required?: boolean;
  label?: string;
  name: string;
  showUploaded?: boolean;
  withLabel?: boolean;
  buttonText?: string;
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: required && "This field is required!" }}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const pickImageAsync = async () => {
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            quality: 1,
            base64: true,
            aspect: [1, 1],
          });

          if (!result.canceled && result.assets?.[0]?.base64) {
            const base64 = result.assets[0].base64;
            const mimeType = result.assets[0].mimeType || "image/jpeg";
            // todo: use api from expo-file-system to create blob
            const image = `data:${mimeType};base64,${base64}`;

            onChange(image);
          }
        };

        return (
          <View style={styles.container}>
            {withLabel && (
              <Typography>
                {label}
                {required && <Typography color="textError">*</Typography>}
              </Typography>
            )}

            <View>
              <Button
                label={buttonText}
                onPress={pickImageAsync}
                variant={ButtonVariant.MINIMAL}
                icon={
                  <Ionicons
                    name="image-outline"
                    size={24}
                    color={Colors.textPrimary}
                  />
                }
              />
            </View>

            {value && showUploaded && (
              <Image
                alt="Selected image"
                source={value}
                style={{
                  width: 100,
                  height: 100,
                  marginTop: 10,
                  borderRadius: 50,
                  borderWidth: 1,
                  borderColor: `${Colors.brandPrimary}`,
                }}
              />
            )}

            {error && (
              <ErrorMessage message={error.message || "An error occurred!"} />
            )}
          </View>
        );
      }}
    />
  );
};

export default ImageInput;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 5,
  },
});
