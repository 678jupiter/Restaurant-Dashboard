import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Conversation from "./conversation";

const ChartList = () => {
  const [conversations, setConversations] = useState([]);
  const userData = useSelector((state) => state.user.usermeta);

  const getConversations = async () => {
    try {
      const res = await axios.get(
        `https://msgintisha.herokuapp.com/api/conversations/${userData.id}`
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
        <Conversation conversation={c} key={i} />
      ))}
    </View>
  );
};

export default ChartList;
