import { ImageProps } from "expo-image";

export enum AvatarSize {
  ExtraSmall = 50,
  Small = 70,
  Medium = 100,
  Large = 120,
  ExtraLarge = 150,
}

export enum BorderWidth {
  Thin = 1,
  Thick = 2,
}

export type TAvatarType = "neutral" | "connection" | "match";

export interface AvatarProps {
  source: ImageProps["source"];
  title?: string;
  size?: AvatarSize;
  type?: TAvatarType;
  borderWidth?: BorderWidth;
  horizontal?: boolean;
}
