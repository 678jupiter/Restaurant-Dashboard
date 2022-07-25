import { Button, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import moment from "moment";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { Space } from "./components";

const Time = () => {
  const [date, setDate] = useState(new Date(1598051730000));

  //Establish Open/Closed Variable
  function getStatus() {
    var currentStatus = "closed";
    //Establish Day of Week
    var date = new Date();
    console.log(date);
    function getWeekDay(date) {
      var days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      return days[date.getDay()];
    }
    var day = date.getDate();
    var weekdate = getWeekDay(date);
    var year = date.getFullYear();
    var seconds = date.getSeconds();
    var minutes = date.getMinutes();
    var hours = date.getHours();

    //variables for business
    var days = {
      Sunday: {
        openTime: 9,
        closeTime: 15,
      },
      Monday: {
        openTime: 7,
        closeTime: 17,
      },
      Tuesday: {
        openTime: 7,
        closeTime: 17,
      },
      Wednesday: {
        openTime: 7,
        closeTime: 17,
      },
      Thursday: {
        openTime: 7,
        closeTime: 21,
      },
      Friday: {
        openTime: 7,
        closeTime: 21,
      },
      Saturday: {
        openTime: 7,
        closeTime: 21,
      },
    };
    var theDay = days[weekdate];
    var theTime = date.getHours();

    //function statement
    if (hours >= theDay.openTime && hours < theDay.closeTime) {
      currentStatus = "open";
    }

    console.log("The business is currently " + currentStatus);
  }
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
    console.log(currentDate);
    console.log(moment(selectedDate).format("HH:mm"));
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: false,
    });
  };

  const showTimepicker = () => {
    showMode("time");
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <Button title="Tell me time" onPress={() => getStatus()} />
      <Space height={10} />
      <View>
        <Button onPress={showTimepicker} title="Show time picker!" />
      </View>
      <Text>selected: {date.toLocaleString()}</Text>
    </View>
  );
};

export default Time;

const styles = StyleSheet.create({});
