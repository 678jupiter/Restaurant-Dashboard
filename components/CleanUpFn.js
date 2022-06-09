import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { TextInput } from "./atoms";

const CleanUpFn = () => {
  const [value, setValue] = useState("");

  function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  useEffect(() => {
    let isCancelled = false;
    const handleChange = async () => {
      // maybe an api call
      await timeout(1000);

      if (!isCancelled) {
        console.log(`A name was changed: ${value}`);
      }
    };
    handleChange();
    // cleanup function is called when useEffect is called again or on unmount
    return () => {
      isCancelled = true;
    };
  }, [value]);

  return (
    <View style={{ justifyContent: "center", alignContent: "center", flex: 1 }}>
      <TextInput onChangeText={(text) => setValue(text)} />
    </View>
  );
};

export default CleanUpFn;
