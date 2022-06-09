import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

const Button = ({
  onPress,
  isSubmitting,
  label = "Button",
  bgColor = "#000",
  borderColor,
  borderWidth,
  padSizeX = 0,
  padSizeY = 0,
  radius = 0,
  textColor = "#fff",
  txtSize = 20,
  fontFam = "CircularStdBook",
  txtDecorationLine = "underline",
  txtDecorationStyle = "solid",
  txtAlign = "center",
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={isSubmitting ? null : onPress}
    >
      <View
        style={styles.container(
          bgColor,
          padSizeX,
          padSizeY,
          radius,
          borderColor,
          borderWidth
        )}
      >
        {isSubmitting ? (
          <ActivityIndicator color={"white"} />
        ) : (
          <Text
            style={styles.title(
              textColor,
              fontFam,
              txtSize,
              txtDecorationLine,
              txtDecorationStyle,
              txtAlign
            )}
          >
            {label}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.compose({
  title: (
    color,
    fontFam,
    txtSize,
    txtDecorationLine,
    txtDecorationStyle,
    txtAlign
  ) => ({
    color: color,
    fontFamily: fontFam,
    fontSize: txtSize,
    textDecorationStyle: txtDecorationStyle,
    textDecorationLine: txtDecorationLine,
    textAlign: txtAlign,
  }),

  container: (color, sizeY, sizeX, radius, borderColor, borderWidth) => ({
    backgroundColor: color,
    paddingVertical: sizeY,
    paddingHorizontal: sizeX,
    borderRadius: radius,
    borderColor: borderColor,
    borderWidth: borderWidth,
    // flexDirection: 'row',
  }),
});
