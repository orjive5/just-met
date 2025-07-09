import React, { FC } from "react";
import { Text, StyleSheet, TextProps } from "react-native";
import { Colors } from "@/theme/colors";
import { TypographyProps } from "@/components/Typography/types";

export const Typography: FC<TypographyProps> = ({
  variant = "m",
  color = "textPrimary",
  style,
  children,
  ...props
}) => {
  const colorStyle = color ? { color: Colors[color] } : color;

  return (
    <Text style={[typographyStyles[variant], colorStyle, style]} {...props}>
      {children}
    </Text>
  );
};

const typographyStyles = StyleSheet.create({
  h1: {
    fontSize: 32,
    fontWeight: "bold",
  },
  h2: {
    fontSize: 24,
    fontWeight: "bold",
  },
  h3: {
    fontSize: 20,
    fontWeight: "bold",
  },
  l: {
    fontSize: 18,
  },
  m: {
    fontSize: 16,
  },
  s: {
    fontSize: 14,
  },
  xs: {
    fontSize: 12,
  },
  xxs: {
    fontSize: 10,
  },
  button: {
    fontWeight: "semibold",
    fontSize: 16,
  },
});
