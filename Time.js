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
    var weekdate = getWeekDay(date);
    var minutes = date.getMinutes();
    var hours = date.getHours();
    //variables for business
    var days = {
      Friday: {
        openTime: {
          min: "06",
          hour: "06",
        },
        closeTime: {
          min: "30",
          hour: "17",
        },
      },
      Monday: {
        openTime: {
          min: "30",
          hour: "07",
        },
        closeTime: {
          min: "00",
          hour: "17",
        },
      },
      Sunday: {
        openTime: {
          min: "00",
          hour: "10",
        },
        closeTime: {
          min: "00",
          hour: "16",
        },
      },
      Tuesday: {
        openTime: {
          min: "11",
          hour: "16",
        },
        closeTime: {
          min: "57",
          hour: "15",
        },
      },
      Saturday: {
        openTime: {
          min: "33",
          hour: "14",
        },
        closeTime: {
          min: "30",
          hour: "18",
        },
      },
      Thursday: {
        openTime: {
          min: "07",
          hour: "07",
        },
        closeTime: {
          min: "30",
          hour: "18",
        },
      },
      Wednesday: {
        openTime: {
          min: "08",
          hour: "08",
        },
        closeTime: {
          min: "30",
          hour: "17",
        },
      },
    };
    var theDay = days[weekdate];
    function checkClosingHour() {
      // open by the minute
      if (Number(hours) === Number(theDay.closeTime.hour)) {
        console.log(" Hours is equal to Hours");
        checkClosingMin();
        return true;
      }

      // clossed greater than
      if (Number(hours) > Number(theDay.closeTime.hour)) {
        // dont chech minutes go direct
        console.log("Clossed Hours");
        return false;
      }

      // open by the Hour
      if (Number(hours) < Number(theDay.closeTime.hour)) {
        // dont chech minutes go direct
        console.log("Open Hours");
        return true;
      }
    }

    function checkClosingMin() {
      console.log(Number(theDay.closeTime.min));
      console.log(minutes);
      if (Number(minutes) <= Number(theDay.closeTime.min)) {
        // True
        console.log("open by the minute");
        return false;
      }
      if (Number(minutes) > Number(theDay.closeTime.min)) {
        console.log("clossed by the minute");
        return false;
      }
    }

    //    checkClosingHour();

    function checkOpeningHour() {
      // open by the minute
      if (Number(hours) === Number(theDay.openTime.hour)) {
        console.log(" Hours is equal to Hours");
        checkOpeningMin();
        // return true;
      }

      // clossed greater than
      if (Number(hours) < Number(theDay.openTime.hour)) {
        // dont chech minutes go direct
        console.log("Clossed1 Hours");
        return false;
      }

      // open by the Hour
      if (Number(hours) > Number(theDay.openTime.hour)) {
        // dont chech minutes go direct
        console.log("Open Hours");
        return true;
      }
    }

    function checkOpeningMin() {
      console.log(Number(theDay.openTime.min));
      console.log(minutes);
      if (Number(minutes) < Number(theDay.openTime.min)) {
        console.log("clossed by the minute");
        return false;
      }
      if (Number(minutes) >= Number(theDay.openTime.min)) {
        console.log("open by the minute");
        return true;
      }
    }

    function timeValidation() {
      if (checkOpeningHour()) {
        // console.log("Hours Open");
      }
    }
    timeValidation();
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
