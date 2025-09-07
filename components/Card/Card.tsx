import React, { PropsWithChildren } from "react";
import { View, StyleSheet } from "react-native";
import { CardBorderStyle, TCardProps } from "@/components/Card/types";
import { getBorderStyle } from "@/components/Card/utils";
import { Colors } from "@/theme/colors";

const Card: React.FC<PropsWithChildren<TCardProps>> = ({
  border = CardBorderStyle.None,
  borderWidth,
  style,
  children,
  ...rest
}) => {
  return (
    <View
      {...rest}
      style={[styles.card, getBorderStyle(border, borderWidth), style]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: `${Colors.textSecondary}`,
    borderRadius: 16,
    padding: 12,

    shadowColor: `${Colors.textPrimary}`,
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
});

export default Card;
