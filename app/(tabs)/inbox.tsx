import React, { useMemo } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { Typography } from "@/components/Typography/Typography";
import { Colors } from "@/theme/colors";
import { Image } from "expo-image";

type Item = { id: string; label: string };

const makeData = (count: number, prefix = "avatar"): Item[] =>
  Array.from({ length: count }, (_, index) => ({
    id: `${prefix}-${index}`,
    label: prefix,
  }));

const InboxScreen = () => {
  const insets = useSafeAreaInsets();

  const connections = useMemo(() => makeData(20, "avatar"), []);
  const matches = useMemo(() => makeData(20, "avatar"), []);
  const chat = useMemo(() => makeData(60, "avatar"), []);

  const ListHeader = (
    <View style={styles.headerContainer}>
      <View style={styles.section}>
        <Typography variant="h3">Connections</Typography>
        <FlatList
          data={connections}
          keyExtractor={(index) => index.id}
          horizontal
          contentContainerStyle={styles.horizontalListContent}
          ItemSeparatorComponent={() => <View style={styles.hGap} />}
          renderItem={() => (
            <View>
              <Image
                alt="Connection avatar"
                source={require("@/assets/images/mockAvatar.jpeg")}
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 100,
                  borderWidth: 2,
                  borderColor: `${Colors.greenPrimary}`,
                }}
              />
              <Typography variant="m">Jane Doe</Typography>
            </View>
          )}
        />
      </View>

      <View style={styles.section}>
        <Typography variant="h3">Matches</Typography>
        <FlatList
          data={matches}
          keyExtractor={(index) => index.id}
          horizontal
          contentContainerStyle={styles.horizontalListContent}
          ItemSeparatorComponent={() => <View style={styles.hGap} />}
          renderItem={() => (
            <View>
              <Image
                alt="Crush avatar"
                source={require("@/assets/images/mockAvatar.jpeg")}
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 100,
                  borderWidth: 2,
                  borderColor: `${Colors.pinkNeon}`,
                }}
              />
              <Typography variant="m">Jane Doe</Typography>
            </View>
          )}
        />
      </View>

      <Typography variant="h3">Chat</Typography>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <FlatList
        data={chat}
        keyExtractor={(i) => i.id}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: insets.bottom,
          rowGap: 8,
        }}
        ItemSeparatorComponent={() => <View style={styles.vGap} />}
        renderItem={() => (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Image
              alt="Person avatar"
              source={require("@/assets/images/mockAvatar.jpeg")}
              style={{
                width: 70,
                height: 70,
                borderRadius: 100,
                borderWidth: 2,
                borderColor: `${Colors.greenPrimary}`,
              }}
            />
            <Typography variant="m">Jane Doe</Typography>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default InboxScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  headerContainer: {
    gap: 16,
  },

  section: {
    gap: 8,
  },

  horizontalListContent: {
    paddingVertical: 4,
  },

  hGap: { width: 8 },
  vGap: { height: 8 },
});
