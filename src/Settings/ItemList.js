import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { ListItem, Avatar } from "@rneui/themed";
import { Switch } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";

const list = [
  {
    name: "Amy Farha",
    avatar_url:
      "https://images.unsplash.com/photo-1598532213919-078e54dd1f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZGlzaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    subtitle: "Vice President",
  },
  {
    name: "Chris Jackson",
    avatar_url:
      "https://images.unsplash.com/photo-1571805341302-f857308690e3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8ZGlzaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    subtitle: "Vice Chairman",
  },
];

const ItemList = () => {
  const [checked, setChecked] = useState(false);
  const SwitchComponent = () => {
    const [checked, setChecked] = useState(false);

    const toggleSwitch = () => {
      setChecked(!checked);
    };
  };

  return (
    <View>
      <View>
        {list.map((l, i) => (
          <ListItem key={i} bottomDivider>
            <Avatar source={{ uri: l.avatar_url }} />
            <ListItem.Content>
              <ListItem.Title>{l.name}</ListItem.Title>
              <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
            </ListItem.Content>
            <Switch
              value={checked}
              onValueChange={(value) => setChecked(value)}
            />
          </ListItem>
        ))}
      </View>
    </View>
  );
};

export default ItemList;

const styles = StyleSheet.create({});
