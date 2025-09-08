import { ButtonVariant } from "@/components/Button/types";
import { Colors } from "@/theme/colors";

export const variantConfig = {
  [ButtonVariant.Outlined]: {
    textColor: "brandPrimary" as const,
    loaderColor: Colors.brandPrimary,
  },
  [ButtonVariant.Filled]: {
    textColor: "textSecondary" as const,
    loaderColor: Colors.textSecondary,
  },
  [ButtonVariant.Minimal]: {
    textColor: "textPrimary" as const,
    loaderColor: Colors.brandPrimary,
  },
};
