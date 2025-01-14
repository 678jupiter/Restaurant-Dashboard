import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../../config";
import { Space } from "../../atoms";

const TextPlainNav = ({
  title = "Title",
  subtitle = "Subtitle",
  titleTextSize = 12,
  titleTextFam = "CircularStdBook",
  subtitleTextSize = 16,
  subtitleTextFam = "CircularStdBold",
  children,
}) => {
  return (
    <View style={styles.textButtonRowContainer}>
      <View style={styles.titleSubtitleContainer}>
        <Text style={styles.title(titleTextSize, titleTextFam)}>{title}</Text>
        <Space height={7} />
        <Text style={styles.subtitle(subtitleTextSize, subtitleTextFam)}>
          {subtitle}
        </Text>
      </View>
      {children}
    </View>
  );
};

export default TextPlainNav;

const styles = StyleSheet.create({
  textButtonRowContainer: {
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    backgroundColor: colors.light_gray,
    // borderBottomWidth: 1,
    // borderBottomColor: '#efefef',
  },
  title: (titleTextSize, titleTextFam) => ({
    fontSize: titleTextSize,
    fontFamily: titleTextFam,
  }),
  subtitle: (subtitleTextSize, subtitleTextFam) => ({
    fontSize: subtitleTextSize,
    fontFamily: subtitleTextFam,
  }),
});
