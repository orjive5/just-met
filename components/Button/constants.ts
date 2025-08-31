import { ButtonVariant } from "@/components/Button/types";
import { Colors } from "@/theme/colors";

export const variantConfig = {
  [ButtonVariant.OUTLINED]: {
    textColor: "brandPrimary" as const,
    loaderColor: Colors.brandPrimary,
  },
  [ButtonVariant.FILLED]: {
    textColor: "textSecondary" as const,
    loaderColor: Colors.textSecondary,
  },
  [ButtonVariant.MINIMAL]: {
    textColor: "textPrimary" as const,
    loaderColor: Colors.brandPrimary,
  },
};
