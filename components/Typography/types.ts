import { TextProps } from "react-native";

type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "l"
  | "m"
  | "s"
  | "xs"
  | "xxs"
  | "button";

type TypographyColor =
  | "textPrimary"
  | "textSecondary"
  | "textLight"
  | "textError";

export interface TypographyProps extends TextProps {
  variant?: TypographyVariant;
  color?: TypographyColor;
}
