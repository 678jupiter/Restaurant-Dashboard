import {
  FlatList,
  View,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React from "react";
import { colors } from "../config";
import { IconContainer, Row, Space } from "./atoms";
import { Ionicons, AntDesign } from "@expo/vector-icons";

const Data = [
  {
    id: 1,
    name: "Burger",
    image_url:
      "http://localhost:1337/uploads/thumbnail_1_A214128_4574_4_EE_5_8_F71_E6_DF_96_CD_3_C07_4e6e7d36be.jpg?width=4288&height=2848",
    des: "Des blah lorem ipsum description",
    price: 1,
  },
];

const FlexBox = ({}) => {
  return (
    <>
      <View style={{ flex: 3 }}>
        <FlatList
          data={Data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <>
              <View>
                <ImageBackground
                  style={styles.featImage}
                  source={{ uri: `${item.image_url}` }}
                  resizeMode="cover"
                />
              </View>
              <Row>
                <Text style={styles.name}>{item.name}</Text>
                <Space height={10} />
                <Text style={styles.desc}>{item.des}</Text>
                <Space height={10} />
                <View style={styles.priceWeightLove}>
                  <View style={styles.priceWeight}>
                    <Text style={styles.price}>
                      KSh
                      {""} {item.price}
                    </Text>
                  </View>
                </View>
              </Row>

              <View
                style={{
                  justifyContent: "flex-end",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={styles.rowTitle}>Quantity</Text>
                <Row flexDirection={true}>
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity>
                      <Text style={styles.iconPlusCircle}>
                        <AntDesign
                          name="minuscircleo"
                          size={26}
                          color={colors.dark_gray}
                        />
                      </Text>
                    </TouchableOpacity>
                    <View style={styles.numberOrderContainer}>
                      <Text style={styles.numberOrder}>1</Text>
                    </View>
                    <TouchableOpacity>
                      <Text style={styles.iconMinusCircle}>
                        <Ionicons
                          name="add-circle-outline"
                          size={32}
                          color={colors.dark_gray}
                        />
                      </Text>
                    </TouchableOpacity>
                  </View>
                </Row>
              </View>
            </>
          )}
        />
      </View>
      <View style={{ flex: 2, justifyContent: "center" }}>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Add 1 to basket &#8226;</Text>
        </Pressable>
      </View>
      {/* <View style={{ backgroundColor: "#7cb48f", flex: 0.9 }} />
      <View style={{ backgroundColor: "#7CA1B4", flex: 3 }}></View>
      <View style={{ backgroundColor: "pink", flex: 0.9 }} /> */}
    </>
  );
};

export default FlexBox;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: colors.light_gray,
    // backgroundColor: 'red',
  },
  featImage: {
    height: Dimensions.get("window").height / 3,
  },
  promoStickerProductContainer: {
    position: "absolute",
    borderBottomLeftRadius: 10,
    backgroundColor: "#03CC3085",
    paddingLeft: 6,
    paddingTop: 4,
    paddingBottom: 4,
    paddingRight: 4,
    right: 0,
  },
  promoText: {
    color: "#fff",
    fontSize: 18,
    textTransform: "capitalize",
    fontFamily: "CircularStdBold",
  },
  priceWeightLove: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 20,
  },
  priceWeight: {
    flexDirection: "row",
    alignItems: "center",
  },
  price: {
    fontSize: 16,
    fontFamily: "CircularStdBold",
    paddingRight: 10,
  },
  weight: {
    fontFamily: "CircularStdBook",
    fontSize: 16,
    paddingLeft: 10,
  },
  name: {
    fontFamily: "CircularStdBold",
    lineHeight: 20,
    paddingRight: 30,
    fontSize: 16,
  },
  desc: {
    paddingRight: 30,
    fontFamily: "CircularStdBook",
    fontSize: 16,
    lineHeight: 20,
  },
  labelGroupContainer: {
    flexDirection: "row",
    // backgroundColor: 'red',
  },
  labelContainer: {
    left: 60,
    width: 50,
    // backgroundColor: 'red',
    marginRight: 10,
    alignItems: "center",
    marginTop: 10,
  },
  label: {
    fontFamily: "CircularStdBook",
    fontSize: 14,
  },
  radioFormContainer: {
    flexDirection: "row",
    // backgroundColor: 'grey',
    alignItems: "center",
    marginTop: 10,
    left: 0,
    height: 30,
  },
  radioTitleContainer: {
    width: 60,
    fontSize: 15,
    // backgroundColor: 'aqua',
    alignItems: "flex-start",
    justifyContent: "center",
  },
  radioTitle: {
    fontFamily: "CircularStdBold",
    fontSize: 16,
  },
  rowTitle: {
    fontSize: 16,
    fontFamily: "CircularStdBold",
  },
  iconMinusCircle: { marginRight: 4 },
  numberOrderContainer: {
    borderBottomWidth: 3,
    borderColor: "#cecece",
    borderStyle: "solid",
  },
  numberOrder: {
    paddingHorizontal: 8,
    marginHorizontal: 6,
    fontSize: 16,
    fontFamily: "CircularStdBold",
    paddingTop: 6,
  },

  iconPlusCircle: { marginLeft: 4, marginTop: 4 },

  navBottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    // backgroundColor: 'red',
    justifyContent: "center",
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderTopColor: "#efefef",
    borderTopWidth: 0.5,
    backgroundColor: colors.light_gray,
    shadowColor: "#bdbdbd",
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.1,
  },
  touchFastBuyContainer: {
    paddingVertical: 6,
    // backgroundColor: 'cyan',
  },
  touchAddCartContainer: {
    paddingVertical: 6,
    // backgroundColor: 'cyan'
  },
  fastBuyContainer: {
    // backgroundColor: "cyan",
  },
  addCartContainer: {
    // backgroundColor: "red" ,
  },
  fastBuy: {
    fontSize: 16,
    fontFamily: "CircularStdMedium",
  },
  addCart: {
    fontSize: 16,
    fontFamily: "CircularStdMedium",
  },
  itemContainer: {
    flex: 1,
    margin: 10,
    justifyContent: "space-around",
  },
  button: {
    backgroundColor: "black",
    padding: 20,
    alignItems: "center",
    margin: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 18,
  },
});
