import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ListItem, Avatar } from "@rneui/themed";
import axios from "axios";
import { gql, useQuery } from "@apollo/client";

const list = [
  {
    name: "Amy Farha",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
    lastMessage: "add a banana",
    times: "1:00 am",
  },
  {
    name: "Chris Jackson",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    lastMessage:
      "add extra source add extra source add extra source add extra source add extra source add extra source add extra source ",
    times: "30/05/2022",
  },
];

const CHART_LIST = gql`
  {
    restaurantmessages {
      data {
        id
        attributes {
          mgs
          users_permissions_user {
            data {
              id
              attributes {
                username
              }
            }
          }
        }
      }
    }
  }
`;
const ChartList = ({ navigation }) => {
  const { loading, error, data } = useQuery(CHART_LIST);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error :</Text>;
  if (data) {
    const { restaurantmessages } = data;
    console.log(restaurantmessages);
    return (
      <View style={{ backgroundColor: "white", flex: 1 }}>
        <View>
          {restaurantmessages?.data.map((l, i) => (
            <ListItem
              key={i}
              bottomDivider
              onPress={() => navigation.navigate("chatScreen")}
            >
              <Avatar
                avatarStyle={{ borderRadius: 24, aspectRatio: 1 }}
                size="medium"
                source={{
                  uri: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
                }}
              />
              <ListItem.Content>
                {/* <ListItem.Title>
                  {l.users_permissions_user.data.attributes?.username}
                </ListItem.Title> */}
                <ListItem.Subtitle numberOfLines={1}>
                  {l.attributes.mgs}
                </ListItem.Subtitle>
                <ListItem.Subtitle
                  style={{ alignSelf: "flex-end", justifyContent: "flex-end" }}
                  numberOfLines={1}
                >
                  {l.times}
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          ))}
        </View>
      </View>
    );
  }
};

export default ChartList;

const styles = StyleSheet.create({});
