import { StyleProp, ViewProps, ViewStyle } from "react-native";

export enum CardBorderStyle {
  Connection = "CONNECTION",
  Match = "MATCH",
  Neutral = "NEUTRAL",
  None = "NONE",
}

export type TCardProps = {
  border?: CardBorderStyle;
  borderWidth?: number;
  style?: StyleProp<ViewStyle>;
} & Omit<ViewProps, "style">;
