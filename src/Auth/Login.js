import { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Platform,
  SafeAreaView,
  Dimensions,
  Text,
  Pressable,
} from "react-native";
import { TextInput as MytextInput } from "react-native";
import { Button, Header, Space, TextInput } from "../../components";
import KeyboardScrollUpForms from "../../utils/KeyboardScrollUpForms";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors, primaryColor } from "../../config";
import { useTogglePasswordVisibility } from "../../components/useTogglePasswordVisibility";
import { useDispatch } from "react-redux";
import { authActions } from "../Redux/authSlice";
import { userActions } from "../Redux/userSlice";
import { isEmail } from "../../utils";
import axios from "axios";
import { WTAYE } from "@env";

const Login = () => {
  const dispatch = useDispatch();

  const [identifier, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const space = Dimensions.get("screen").height / 28;

  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();

  const handleMessage = (message, type = "FAILED") => {
    setMessage(message);
    setMessageType(type);
  };
  const isFormValid = () => {
    if (identifier === "" || password === "") {
      setMessage(() => (
        <Text style={styles.msgBox}>All fields are required!</Text>
      ));
      setIsSubmitting(false);
      return false;
    }

    if (!isEmail(identifier)) {
      setMessage(() => (
        <Text style={styles.msgBox}>Please add a valid email address!</Text>
      ));
      return false;
    }
    return true;
  };
  const handleSubmit = async () => {
    if (!isFormValid()) {
      return;
    }
    handleMessage("");
    setIsSubmitting(true);
    console.log(JSON.stringify(identifier));
    console.log(JSON.stringify(password));
    console.log(`${WTAYE}`);
    await axios
      .post(`${WTAYE}`, {
        // identifier: JSON.stringify(identifier),
        // password: JSON.stringify(password),
        identifier: "rest@gmail.com",
        password: "R121212",
      })
      .then((res) => {
        dispatch(
          userActions.addUser({
            jwt: res.data.jwt,
            id: res.data.user.id,
            username: res.data.user.username,
            email: res.data.user.email,
            mobileNumber: res.data.user.mobileNumber,
            secondName: res.data.user.secondName,
            address: res.data.user.Address,
            buildinginfo: res.data.user.Buildinginfo,
            image: "",
          })
        );
        dispatch(authActions.login());
        handleMessage(message);
        setMessage("");
        setIsSubmitting(false);
      })
      .catch((error) => {
        console.log(error.message);
        if (error.message === "Network Error") {
          handleMessage(() => (
            <Text style={styles.msgBox}>
              Network Error! Check your Internet Connection.
            </Text>
          ));
        } else {
          handleMessage(() => (
            <Text style={styles.msgBox}>Invalid email or password!</Text>
          ));
        }

        setIsSubmitting(false);
      });
  };
  return (
    <SafeAreaView style={styles.page}>
      <KeyboardScrollUpForms
        enabled
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        {/* {Platform.OS === "android" && <StatusBar backgroundColor="#000000" />} */}

        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}
        >
          <Space height={space} />
          <Header
            // title="Login"
            desc="Restaurant admin panel, login first. 🤝"
          />
          <View style={styles.container}>
            <TextInput
              label="Email"
              onChangeText={(text) => setEmail(text)}
              KeybordType="email-address"
            />
            <Space height={30} />
            <View>
              <Text style={styles.label}>Password</Text>

              <View style={styles.inputContainer}>
                <MytextInput
                  style={styles.inputField}
                  onChangeText={(text) => setPassword(text)}
                  value={password}
                  secureTextEntry={passwordVisibility}
                />
                <Pressable onPress={handlePasswordVisibility}>
                  <MaterialCommunityIcons
                    name={rightIcon}
                    size={22}
                    color="#232323"
                  />
                </Pressable>
              </View>
            </View>

            <Space height={25} />
            <Text>{message}</Text>
            <Space height={25} />

            <Button
              label="Log In"
              radius={6}
              txtSize={14}
              bgColor={colors.blurple}
              padSizeX={20}
              borderWidth={0}
              fontFam="CircularStdBold"
              txtDecorationLine="none"
              onPress={handleSubmit}
              isSubmitting={isSubmitting}
            />

            <Space height={20} />
            {/* <Button
              label="Forgot password"
              txtSize={12}
              radius={0}
              borderWidth={0}
              bgColor="#fff"
              textColor={primaryColor}
              fontFam="CircularStdBold"
              onPress={() => navigation.navigate("ForgotPassword")}
            /> */}
          </View>
        </ScrollView>
      </KeyboardScrollUpForms>
      {/* <FlashMessage
      // ref={showMessage}
      style={{ backgroundColor: 'red' }}
      textStyle={{ fontFamily: 'CircularStdBold' }}
      hideOnPress={true}
      duration={4000}
    /> */}
    </SafeAreaView>
  );
};
const styles = StyleSheet.compose({
  page: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingVertical: 24,
    marginTop: 0,
    flex: 1,
  },
  msgBox: {
    fontFamily: "CircularStdBold",
    fontSize: 12,
    //marginBottom: 10,

    textAlign: "center",
    justifyContent: "center",
    color: primaryColor,
  },
  label: {
    fontFamily: "CircularStdBold",
    fontSize: 14,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    fontFamily: "CircularStdBook",
    fontSize: 14,
    color: "#000",
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 6,
    borderStyle: "solid",
    borderColor: colors.blurple,
  },
  inputField: {
    width: "90%",
  },
});

export default Login;
