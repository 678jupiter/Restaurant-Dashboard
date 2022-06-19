import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";

const Time = () => {
  function timetell() {
    // Configure this for your tests
    var Now = new Date(
      2015, // year
      7, //month
      3, //date
      20, // hours
      1 //minutes
    );
    var startingHour = {
      1: 8,
      2: 8,
      3: 8,
      4: 8,
      5: 8,
      6: 9,
      0: 10,
    };
    var startingMin = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      0: 0,
    };

    var closingHour = {
      1: 20,
      2: 20,
      3: 20,
      4: 20,
      5: 20,
      6: 17,
      0: 16,
    };

    var closingMin = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      0: 0,
    };

    var CurrentDay = Now.getDay();
    var startingTime = new Date(
      Now.getFullYear(),
      Now.getMonth(),
      Now.getDate(),
      startingHour[CurrentDay],
      startingMin[CurrentDay]
    );
    var closingTime = new Date(
      Now.getFullYear(),
      Now.getMonth(),
      Now.getDate(),
      closingHour[CurrentDay],
      closingMin[CurrentDay]
    );
    var Open =
      Now.getTime() > startingTime.getTime() &&
      Now.getTime() < closingTime.getTime();
    // days 0.sun 1.mon 2.tues 3.wed 4.thur 5.fri 6.sat
    // CurrentDay !== 0 && the # is the day to eclude, so if I want to be closed on Sat6, Sun0, Wed3
    // CurrentDay !== 6 && CurrentDay !== 0 && CurrentDay !== 3 && Open
    if (Open) {
      console.log("We are open");
      console.log(closingTime + " / " + Now);
    } else {
      console.log("nah");
    }
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <Button title="Tell me time" onPress={() => timetell()} />
    </View>
  );
};

export default Time;

const styles = StyleSheet.create({});
