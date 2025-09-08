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
    value === AvatarSize.ExtraSmall ||
    value === AvatarSize.Small ||
    value === AvatarSize.Medium
  ) {
    return "m";
  }
  if (value === AvatarSize.Large) {
    return "l";
  }
  if (value === AvatarSize.ExtraLarge) {
    return "h2";
  }
};
