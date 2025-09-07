import React from "react";
import {
  ImageSourcePropType,
  SectionList,
  StyleSheet,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { Colors } from "@/theme/colors";
import Avatar from "@/components/Avatar/Avatar";
import { Typography } from "@/components/Typography/Typography";
import { AvatarSize } from "@/components/Avatar/types";
import Card from "@/components/Card/Card";
import { CardBorderStyle } from "@/components/Card/types";

type TNotification = {
  id: string;
  actorName: string;
  avatar: ImageSourcePropType;
  heading: string;
  text: string;
  read?: boolean;
};

type TSection = { title: string; data: TNotification[] };

const MOCK_SECTIONS: TSection[] = [
  {
    title: "Today",
    data: [
      {
        id: "1",
        actorName: "Jane Doe",
        avatar: require("@/assets/images/mockAvatar.jpeg"),
        heading: "You have new connection!",
        text: "You've connected with",
        read: false,
      },
      {
        id: "2",
        actorName: "Mina Park",
        avatar: require("@/assets/images/mockAvatar.jpeg"),
        heading: "You have new match!",
        text: "You've matched with",
        read: false,
      },
    ],
  },
  {
    title: "Yesterday",
    data: [
      {
        id: "1",
        actorName: "Jane Doe",
        avatar: require("@/assets/images/mockAvatar.jpeg"),
        heading: "You have new connection!",
        text: "You've connected with",
        read: false,
      },
      {
        id: "2",
        actorName: "Mina Park",
        avatar: require("@/assets/images/mockAvatar.jpeg"),
        heading: "You have new match!",
        text: "You've matched with",
        read: false,
      },
    ],
  },
  {
    title: "05 Sep 2025",
    data: [
      {
        id: "1",
        actorName: "Jane Doe",
        avatar: require("@/assets/images/mockAvatar.jpeg"),
        heading: "You have new connection!",
        text: "You've connected with",
        read: true,
      },
      {
        id: "2",
        actorName: "Mina Park",
        avatar: require("@/assets/images/mockAvatar.jpeg"),
        heading: "You have new match!",
        text: "You've matched with",
        read: true,
      },
    ],
  },
];

const NotificationCard = ({ item }: { item: TNotification }) => {
  return (
    <Card border={item.read ? CardBorderStyle.None : CardBorderStyle.Neutral}>
      <View style={styles.row}>
        <Avatar source={item.avatar} horizontal size={AvatarSize.extraSmall} />
        <View style={styles.content}>
          <Typography variant="mBold">{item.heading}</Typography>
          <Typography variant="m">
            {item.text} {item.actorName}
          </Typography>
        </View>
      </View>
    </Card>
  );
};

const NotificationsScreen = () => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <SectionList
        sections={MOCK_SECTIONS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: insets.bottom + 8,
          rowGap: 8,
        }}
        ItemSeparatorComponent={() => <View style={styles.vGap} />}
        renderSectionHeader={({ section }) => (
          <View style={styles.header}>
            <Typography variant="l" color="textLight">
              {section.title}
            </Typography>
          </View>
        )}
        renderItem={({ item }) => <NotificationCard item={item} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Typography variant="l">No notifications yet</Typography>
            <Typography variant="m" color="textLight">
              You’re all caught up.
            </Typography>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  header: {
    backgroundColor: Colors.background,
    paddingTop: 12,
    paddingBottom: 6,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  content: {
    flex: 1,
    gap: 4,
  },

  vGap: { height: 8 },

  empty: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    gap: 8,
  },
});
