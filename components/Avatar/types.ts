import { ImageProps } from "expo-image";

export enum AvatarSize {
  extraSmall = 50,
  small = 70,
  medium = 100,
  large = 120,
  extraLarge = 150,
}

export enum BorderWidth {
  thin = 1,
  thick = 2,
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
