import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { colors, primaryColor } from "../../../config";
import { Space } from "../../atoms";

const NavHeader = ({
  navigation,
  navGoBack = true,
  title = "Nav Header",
  children,
  borderWidth = 1,
  borderColor = "#e7e7e7",
  showSpaceLeft = true,
}) => {
  return (
    <View style={styles.navHeaderContainer(borderWidth, borderColor)}>
      {navGoBack ? null : showSpaceLeft ? (
        <View>
          <Space width={30} height={32} />
        </View>
      ) : (
        <></>
      )}
      <Text style={styles.textHeader}>{title}</Text>
      <View>{children ? children : <Space width={30} />}</View>
    </View>
  );
};

export default NavHeader;

const styles = StyleSheet.create({
  navHeaderContainer: (borderWidth, borderColor, backgroundColor) => ({
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: borderWidth,
    borderBottomColor: borderColor,
    paddingBottom: 10,
    paddingTop: 10,
    paddingHorizontal: 20,
    backgroundColor: "white",
  }),
  iconBackContainer: {
    // backgroundColor: "red",
    left: -10,
  },
  textHeader: {
    fontFamily: "CircularStdBold",
    fontSize: 18,
    textTransform: "capitalize",
    paddingVertical: 6,
    color: "#fff",
  },
});
