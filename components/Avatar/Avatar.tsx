import React from "react";
import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { Typography } from "@/components/Typography/Typography";
import {
  AvatarProps,
  AvatarSize,
  BorderWidth,
} from "@/components/Avatar/types";
import { getBorderColor, getTitleSize } from "@/components/Avatar/utils";

const Avatar: React.FC<AvatarProps> = ({
  source,
  title,
  size = AvatarSize.small,
  type = "neutral",
  horizontal = false,
  borderWidth = BorderWidth.thick,
  ...props
}) => {
  return (
    <View style={[styles.container, horizontal ? styles.row : styles.column]}>
      <Image
        source={source}
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: borderWidth,
          borderColor: getBorderColor(type),
        }}
        alt="Avatar"
        {...props}
      />
      {title && <Typography variant={getTitleSize(size)}>{title}</Typography>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    gap: 8,
  },
  column: {
    flexDirection: "column",
  },
});

export default Avatar;
