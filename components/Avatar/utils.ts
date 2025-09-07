import { AvatarSize, TAvatarType } from "@/components/Avatar/types";
import { Colors } from "@/theme/colors";

export const getBorderColor = (value: TAvatarType) => {
  if (value === "connection") {
    return Colors.greenPrimary;
  }
  if (value === "match") {
    return Colors.pinkNeon;
  }
  if (value === "neutral") {
    return Colors.brandPrimary;
  }
};

export const getTitleSize = (value: AvatarSize) => {
  if (
    value === AvatarSize.extraSmall ||
    value === AvatarSize.small ||
    value === AvatarSize.medium
  ) {
    return "m";
  }
  if (value === AvatarSize.large) {
    return "l";
  }
  if (value === AvatarSize.extraLarge) {
    return "h2";
  }
};
