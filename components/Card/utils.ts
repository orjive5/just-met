import { CardBorderStyle } from "@/components/Card/types";
import { Colors } from "@/theme/colors";

export const getBorderStyle = (
  border: CardBorderStyle,
  borderWidth?: number,
) => {
  if (border === CardBorderStyle.None) {
    return { borderWidth: 0 };
  }

  const width = borderWidth ?? 1;
  switch (border) {
    case CardBorderStyle.Connection:
      return { borderWidth: width, borderColor: Colors.greenPrimary };
    case CardBorderStyle.Match:
      return { borderWidth: width, borderColor: Colors.pinkNeon };
    case CardBorderStyle.Neutral:
    default:
      return { borderWidth: width, borderColor: Colors.brandPrimary };
  }
};
