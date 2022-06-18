import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import MapView from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import io from "socket.io-client";
import Arrow from "../../assets/arrow.png";
import call from "react-native-phone-call";

const DeliveringDetailed = ({ route, navigation }) => {
  const courierCords = [
    {
      courierLat: "37.795835",
      courierLng: "-122.406417",
    },
  ];
  const {
    userName,
    orderNumber,
    orderId,
    status,
    customermobilenumber,
    courierName,
    courierMobileNumber,
  } = route.params;
  const [curPos, setcurPos] = useState({
    latitude: 37.795835,
    longitude: -122.406417,
  });
  const curAng = 45;
  const latitudeDelta = 0.0922;
  const longitudeDelta = 0.0421;

  const socket = io("http://localhost:4000");
  function showRoom() {
    console.log("Joined Room");
  }

  useEffect(() => {
    let isCancelled = false;
    const hookup = async () => {
      const input = "nico_room";
      socket.emit("enter_room", input, showRoom);
    };
    hookup();
    return () => {
      isCancelled = true;
    };
  }, []);
  socket.on("new_message", addMessage);
  function addMessage(message) {
    courierCords.push(message);
    let last = courierCords[courierCords.length - 1];
    let k = Number(last.courierLat);
    let l = Number(last.courierLng);
    let latitude = k;
    let longitude = l;
    setcurPos({ latitude, longitude });

    camera();
  }
  const mapRef = useRef(null);

  const camera = () => {
    const secondToLast = courierCords[courierCords.length - 2];
    if (secondToLast === undefined) {
      console.log("Failed");
      let last = courierCords[courierCords.length - 1];
      let f = Number(last.courierLat);
      let j = Number(last.courierLng);
      if (mapRef.current) {
        console.log("2");
        mapRef.current.animateCamera({
          center: {
            latitude: f,
            longitude: j,
          },
          pitch: curAng,
        });
      }
      return false;
    } else if (secondToLast !== undefined) {
      let last = courierCords[courierCords.length - 1];
      let secondToLast = courierCords[courierCords.length - 2];
      let yDiff = Number(last.courierLng) - Number(secondToLast.courierLng);
      let xDiff = Number(last.courierLat) - Number(secondToLast.courierLat);
      let rotator = (Math.atan2(yDiff, xDiff) * 180.0) / Math.PI;
      console.log(rotator);
      let f = Number(last.courierLat);
      let j = Number(last.courierLng);
      //console.log("1");
      if (rotator === 0 && mapRef.current) {
        mapRef.current.animateCamera({
          center: {
            latitude: f,
            longitude: j,
          },
          // pitch: curAng,
        });
      }
      if (mapRef.current && rotator !== 0) {
        // console.log("2");
        if (rotator !== 0) {
          mapRef.current.animateCamera({
            // heading: rotator,
            center: {
              latitude: f,
              longitude: j,
            },
            // pitch: curAng,
          });
        } else {
          mapRef.current.animateCamera({
            center: {
              latitude: f,
              longitude: j,
            },
            // pitch: curAng,
          });
        }
      }
    } else {
      console.log("shiet");
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: "indigo" }}>
      <View
        style={{
          flex: 0.1,
          backgroundColor: "white",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Text>{orderNumber}</Text>
        <Text>{userName}</Text>
        <View
          style={{
            flexDirection: "row",

            alignItems: "center",
          }}
        ></View>

        <Text>{status}</Text>
      </View>
      <View style={{ flex: 0.8 }}>
        <MapView
          ref={mapRef}
          style={styles.flex}
          minZoomLevel={15}
          initialRegion={{
            ...curPos,
            latitudeDelta: latitudeDelta,
            longitudeDelta: longitudeDelta,
          }}
        >
          <MapView.Marker
            coordinate={curPos}
            anchor={{ x: 0.5, y: 0.5 }}
            image={Arrow}
          />
        </MapView>
      </View>
      <View
        style={{
          flex: 0.1,
          backgroundColor: "white",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",

            alignItems: "center",
          }}
        >
          <Pressable onPress={() => console.warn("Call")}>
            <Ionicons
              onPress={() =>
                call({ number: `${customermobilenumber}`, prompt: false })
              }
              name="call-outline"
              size={40}
              color="black"
              style={{ marginRight: 10, padding: 10 }}
            />
          </Pressable>
          <Text>{userName}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",

            alignItems: "center",
          }}
        >
          <Pressable onPress={() => console.warn("Call")}>
            <Ionicons
              onPress={() =>
                call({ number: `${courierMobileNumber}`, prompt: false })
              }
              name="call-outline"
              size={40}
              color="black"
              style={{ marginRight: 10, padding: 10 }}
            />
          </Pressable>
          <Text>{courierName}</Text>
        </View>
      </View>
    </View>
  );
};

export default DeliveringDetailed;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    width: "100%",
  },
});
