import React, {
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
} from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { Text, View, Button } from "react-native";
import axios from "axios";
import io from "socket.io-client";
import { useSelector } from "react-redux";

const ChatScreen = ({ route }) => {
  const { currentChat } = route.params;
  const userData = useSelector((state) => state.user.usermeta);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  const socket = io("http://localhost:4000");

  function showRoom() {
    console.log("Joined Room");
  }

  useEffect(() => {
    const input = currentChat._id;
    socket.emit("enter_conversation_space", input, showRoom);
  }, []);

  socket.on("welcome", () => {
    console.log("someone joined");
  });
  socket.on("bye", () => {
    console.log("someone left ");
  });
  const getMessages = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8800/api/messages/${currentChat._id}`
      );
      setMessages(res.data.reverse());
    } catch (error) {
      console.log("3" + error);
    }
  };

  function addMessage(message) {
    getMessages();
  }

  socket.on("new_conversation_message", addMessage);

  useEffect(() => {
    getMessages();
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];
    const message = {
      sender: userData.id,
      text: text,
      conversationId: currentChat._id,
      user: {
        _id: userData.username,
        name: userData.username,
        avatar: "https://placeimg.com/140/140/any",
      },
    };
    try {
      axios.post(`http://localhost:8800/api/messages`, message);
      let roomName = currentChat._id;
      socket.emit("new_conversation_message", message, roomName, () => {
        console.log("rest emit");
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {currentChat ? (
        <GiftedChat
          messages={messages}
          onSend={(messages) => onSend(messages)}
          showAvatarForEveryMessage={true}
          showUserAvatar={true}
          user={{
            _id: userData.username,
            name: userData.username,
            avatar: "https://placeimg.com/140/140/any",
          }}
          // alignTop
          alignTop
          alwaysShowSend
          scrollToBottom
        />
      ) : (
        <Text>No current Chat</Text>
      )}
    </View>
  );
};

export default ChatScreen;

{
  /* {messages.map((m, i) => (
            <View key={i}>
              <Text>{m.text}</Text>
              <Text>{m.createdAt}</Text>
            </View>
          ))}
          <Button title="Text" onPress={() => handleSubmit()} /> */
}
