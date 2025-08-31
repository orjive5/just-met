import { ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import React, { FC } from "react";
import { Colors } from "@/theme/colors";
import { Typography } from "@/components/Typography/Typography";
import { ButtonVariant } from "@/components/Button/types";
import { variantConfig } from "@/components/Button/constants";

type TProps = {
  label: string;
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  variant?: ButtonVariant;
  fullWidth?: boolean;
};

export const Button: FC<TProps> = ({
  label,
  onPress,
  isLoading = false,
  disabled = false,
  icon,
  variant = ButtonVariant.OUTLINED,
  fullWidth = true,
  ...props
}) => {
  const { textColor, loaderColor } = variantConfig[variant];
  return (
    <TouchableOpacity
      style={[
        styles.baseStyle,
        styles[variant],
        { opacity: variant === ButtonVariant.FILLED && isLoading ? 0.7 : 1 },
        fullWidth && styles.fullWidth,
      ]}
      onPress={onPress}
      {...props}
      disabled={disabled}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={loaderColor} />
      ) : (
        <>
          {icon && icon}
          <Typography
            variant="button"
            color={textColor ? textColor : "textPrimary"}
          >
            {label}
          </Typography>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  baseStyle: {
    height: 50,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
  },
  fullWidth: {
    width: "100%",
  },
  outlined: {
    borderWidth: 2,
    borderColor: Colors.brandPrimary,
  },
  filled: {
    backgroundColor: Colors.brandPrimary,
  },
  minimal: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "gray",
  },
});
