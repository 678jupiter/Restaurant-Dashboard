import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { Text, View, Button } from "react-native";
import axios from "axios";
import io from "socket.io-client";

const ChatScreen = () => {
  const [chatMessages, setChatMessages] = useState([]);
  useEffect(() => {
    const socket = io("http://localhost:3000");
    socket.on("chat message", (msg) => {
      setChatMessages({ chatMessages: [...chatMessages, msg] });
    });
  }, []);

  const submit = () => {
    const socket = io("http://localhost:3000");
    socket.emit("chat message", "Hello World");
    // clear chat message state
  };

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);
  console.log(chatMessages);

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Button title="Send text" onPress={() => submit()} />
    </View>
  );
};

export default ChatScreen;
