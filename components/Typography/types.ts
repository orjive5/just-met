import { TextProps } from "react-native";

type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "l"
  | "mBold"
  | "m"
  | "s"
  | "xs"
  | "xxs"
  | "button";

type TypographyColor =
  | "textPrimary"
  | "textSecondary"
  | "textLight"
  | "textError"
  | "brandPrimary";

export interface TypographyProps extends TextProps {
  variant?: TypographyVariant;
  color?: TypographyColor;
}
