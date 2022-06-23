import { ListItem, Avatar } from "@rneui/themed";

import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Conversation from "./conversation";

const ChartList = ({ navigation }) => {
  const [conversations, setConversations] = useState([]);
  const userData = useSelector((state) => state.user.usermeta);

  const getConversations = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8800/api/conversations/${userData.id}`
      );
      setConversations(res.data);
    } catch (error) {
      console.log("1" + error);
    }
  };
  useEffect(() => {
    getConversations();
  }, [userData.id]);

  return (
    <View>
      {conversations?.map((c, i) => (
        <>
          <Conversation conversation={c} />
        </>
      ))}
    </View>
  );
};

export default ChartList;
