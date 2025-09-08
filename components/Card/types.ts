import { StyleProp, ViewProps, ViewStyle } from "react-native";

export enum CardBorderStyle {
  Connection = "connection",
  Match = "match",
  Neutral = "neutral",
  None = "none",
}

export type TCardProps = {
  border?: CardBorderStyle;
  borderWidth?: number;
  style?: StyleProp<ViewStyle>;
} & Omit<ViewProps, "style">;
