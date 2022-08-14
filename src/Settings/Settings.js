import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Modal,
  Dimensions,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { Icon } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "@rneui/base";
import { dfhs } from "@env";
import { ScrollView } from "react-native-gesture-handler";
import { Space } from "../../components";
import moment from "moment";
import { useSelector } from "react-redux";
import axios from "axios";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const Settings = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [PauseModalVisible, setPauseModalVisible] = useState(false);
  const [reasonModal, setReasonModal] = useState(false);
  useState(false);
  const [clossingHoursModailVisible, setClossingHoursModailVisible] =
    useState(false);
  const [holidayModal, setHoliday] = useState(false);

  const userData = useSelector((state) => state.user.usermeta);
  const authAxios = axios.create({
    baseURL: `${dfhs}`,
    headers: {
      Authorization: `Bearer ${userData.jwt}`,
    },
  });

  const updateTime = async () => {
    setLoading(true);
    await authAxios
      .put(`my-restaurants/1`, {
        data: {
          Hours: days,
        },
      })
      .then((res) => {
        getPreviousHours();
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const pauseOrders = async () => {
    setLoading(true);
    await authAxios
      .put(`my-restaurants/1`, {
        data: {
          paused: true,
        },
      })
      .then((res) => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };
  const resumeOrders = async () => {
    setLoading(true);
    await authAxios
      .put(`my-restaurants/1`, {
        data: {
          paused: false,
        },
      })
      .then((res) => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };
  // cronJob
  // 15 min
  // 30 min
  // 1 hrs
  // 1 30mins
  // 2 hrs
  // 12 hrs
  // 24 hours

  const getPreviousHours = async () => {
    setLoading(true);
    await authAxios
      .get(`my-restaurants/1`)
      .then((res) => {
        const {
          data: {
            attributes: { Hours },
          },
        } = res.data;
        // setModayOpening(Hours.Monday.openTime);
        setModayOpening({
          openTime: {
            hour: Hours.Monday.openTime.hour,
            min: Hours.Monday.openTime.min,
          },
        });
        setMonClossing({
          closeTime: {
            hour: Hours.Monday.closeTime.hour,
            min: Hours.Monday.closeTime.min,
          },
        });
        setTuesdayOpening({
          openTime: {
            hour: Hours.Tuesday.openTime.hour,
            min: Hours.Tuesday.openTime.min,
          },
        });
        settusdayClosing({
          closeTime: {
            hour: Hours.Tuesday.closeTime.hour,
            min: Hours.Tuesday.closeTime.min,
          },
        });
        setWednesdayOpening({
          openTime: {
            hour: Hours.Wednesday.openTime.hour,
            min: Hours.Wednesday.openTime.min,
          },
        });
        setwednesdayClosing({
          closeTime: {
            hour: Hours.Wednesday.closeTime.hour,
            min: Hours.Wednesday.closeTime.min,
          },
        });
        setThursdayOpening({
          openTime: {
            hour: Hours.Thursday.openTime.hour,
            min: Hours.Thursday.openTime.min,
          },
        });
        setThursdayClosing({
          closeTime: {
            hour: Hours.Thursday.closeTime.hour,
            min: Hours.Thursday.closeTime.min,
          },
        });
        setFridayOpening({
          openTime: {
            hour: Hours.Friday.openTime.hour,
            min: Hours.Friday.openTime.min,
          },
        });
        setFridayClosing({
          closeTime: {
            hour: Hours.Friday.closeTime.hour,
            min: Hours.Friday.closeTime.min,
          },
        });
        setSatOpening({
          openTime: {
            hour: Hours.Saturday.openTime.hour,
            min: Hours.Saturday.openTime.min,
          },
        });
        setSatClosing({
          closeTime: {
            hour: Hours.Saturday.closeTime.hour,
            min: Hours.Saturday.closeTime.min,
          },
        });
        setSundayOpening({
          openTime: {
            hour: Hours.Sunday.openTime.hour,
            min: Hours.Sunday.openTime.min,
          },
        });
        setSundayClosing({
          closeTime: {
            hour: Hours.Sunday.closeTime.hour,
            min: Hours.Sunday.closeTime.min,
          },
        });
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);

        console.log(error);
      });
  };
  useEffect(() => {
    getPreviousHours();
  }, []);

  const moveToNextModal = () => {
    setPauseModalVisible(!PauseModalVisible);
    setReasonModal(true);
  };

  const [mondayOpening, setModayOpening] = useState({
    openTime: {
      hour: "0",
      min: "0",
    },
  });
  const [mondayClosing, setMonClossing] = useState({
    closeTime: {
      hour: "0",
      min: "0",
    },
  });

  const onChangeOpenMon = (event, selectedDate) => {
    let a = moment(selectedDate).format("HH");
    let b = moment(selectedDate).format("mm");
    console.log(b);
    if (event.type === "set") {
      setModayOpening({
        openTime: {
          hour: a,
          min: b,
        },
      });
      //console.log(a);
    }
  };
  const openingMon = () => {
    DateTimePickerAndroid.open({
      value: new Date(),
      onChange: onChangeOpenMon,
      mode: "time",
      is24Hour: false,
    });
  };

  const onChangeCloseMon = (event, selectedDate) => {
    let a = moment(selectedDate).format("HH");
    let b = moment(selectedDate).format("mm");
    if (event.type === "set") {
      setMonClossing({
        closeTime: {
          hour: a,
          min: b,
        },
      });
    }
  };

  const clossingMon = () => {
    DateTimePickerAndroid.open({
      value: new Date(),
      onChange: onChangeCloseMon,
      mode: "time",
      is24Hour: false,
    });
  };

  const [tuesdatOpening, setTuesdayOpening] = useState({
    openTime: {
      hour: "0",
      min: "0",
    },
  });
  const [tuesdayClosing, settusdayClosing] = useState({
    closeTime: {
      hour: "0",
      min: "0",
    },
  });

  const onChangeOpenTuesday = (event, selectedDate) => {
    let a = moment(selectedDate).format("HH");
    let b = moment(selectedDate).format("mm");
    if (event.type === "set") {
      setTuesdayOpening({
        openTime: {
          hour: a,
          min: b,
        },
      });
    }
  };

  const openingTuesday = () => {
    DateTimePickerAndroid.open({
      value: new Date(),
      onChange: onChangeOpenTuesday,
      mode: "time",
      is24Hour: false,
    });
  };

  const onChangeCloseTues = (event, selectedDate) => {
    let a = moment(selectedDate).format("HH");
    let b = moment(selectedDate).format("mm");
    if (event.type === "set") {
      settusdayClosing({
        closeTime: {
          hour: a,
          min: b,
        },
      });
    }
  };

  const clossingTuesday = () => {
    DateTimePickerAndroid.open({
      value: new Date(),
      onChange: onChangeCloseTues,
      mode: "time",
      is24Hour: false,
    });
  };

  const [wednesdayOpening, setWednesdayOpening] = useState({
    openTime: {
      hour: "0",
      min: "0",
    },
  });
  const [wednesdayClosing, setwednesdayClosing] = useState({
    closeTime: {
      hour: "0",
      min: "0",
    },
  });

  const onChangeOpenWednesday = (event, selectedDate) => {
    let a = moment(selectedDate).format("HH");
    let b = moment(selectedDate).format("mm");
    if (event.type === "set") {
      setWednesdayOpening({
        openTime: {
          hour: a,
          min: b,
        },
      });
    }
  };

  const openingWednesday = () => {
    DateTimePickerAndroid.open({
      value: new Date(),
      onChange: onChangeOpenWednesday,
      mode: "time",
      is24Hour: false,
    });
  };

  const onChangeCloseWed = (event, selectedDate) => {
    let a = moment(selectedDate).format("HH");
    let b = moment(selectedDate).format("mm");

    if (event.type === "set") {
      setwednesdayClosing({
        closeTime: {
          hour: a,
          min: b,
        },
      });
    }
  };
  const clossingWednesday = () => {
    DateTimePickerAndroid.open({
      value: new Date(),
      onChange: onChangeCloseWed,
      mode: "time",
      is24Hour: false,
    });
  };

  const [thursdayOpening, setThursdayOpening] = useState({
    openTime: {
      hour: "0",
      min: "0",
    },
  });
  const [thursdayClosing, setThursdayClosing] = useState({
    closeTime: {
      hour: "0",
      min: "0",
    },
  });

  const onChangeOpenThursday = (event, selectedDate) => {
    let a = moment(selectedDate).format("HH");
    let b = moment(selectedDate).format("mm");
    if (event.type === "set") {
      setThursdayOpening({
        openTime: {
          hour: a,
          min: b,
        },
      });
    }
  };

  const openingThurday = () => {
    DateTimePickerAndroid.open({
      value: new Date(),
      onChange: onChangeOpenThursday,
      mode: "time",
      is24Hour: false,
    });
  };

  const onChangeCloseThurs = (event, selectedDate) => {
    let a = moment(selectedDate).format("HH");
    let b = moment(selectedDate).format("mm");
    if (event.type === "set") {
      setThursdayClosing({
        closeTime: {
          hour: a,
          min: b,
        },
      });
    }
  };
  const clossingThursday = () => {
    DateTimePickerAndroid.open({
      value: new Date(),
      onChange: onChangeCloseThurs,
      mode: "time",
      is24Hour: false,
    });
  };

  const [fridayOpening, setFridayOpening] = useState({
    openTime: {
      hour: "0",
      min: "0",
    },
  });
  const [fridayClosing, setFridayClosing] = useState({
    closeTime: {
      hour: "0",
      min: "0",
    },
  });

  const onChangeOpenFriday = (event, selectedDate) => {
    let a = moment(selectedDate).format("HH");
    let b = moment(selectedDate).format("mm");
    if (event.type === "set") {
      setFridayOpening({
        openTime: {
          hour: a,
          min: b,
        },
      });
    }
  };

  const openingFriday = () => {
    DateTimePickerAndroid.open({
      value: new Date(),
      onChange: onChangeOpenFriday,
      mode: "time",
      is24Hour: false,
    });
  };

  const onChangeCloseFrid = (event, selectedDate) => {
    let a = moment(selectedDate).format("HH");
    let b = moment(selectedDate).format("mm");
    if (event.type === "set") {
      setFridayClosing({
        closeTime: {
          hour: a,
          min: b,
        },
      });
    }
  };
  const clossingFriday = () => {
    DateTimePickerAndroid.open({
      value: new Date(),
      onChange: onChangeCloseFrid,
      mode: "time",
      is24Hour: false,
    });
  };

  const [satOpening, setSatOpening] = useState({
    openTime: {
      hour: "0",
      min: "0",
    },
  });
  const [satClosing, setSatClosing] = useState({
    closeTime: {
      hour: "0",
      min: "0",
    },
  });

  const onChangeOpenSartuday = (event, selectedDate) => {
    let a = moment(selectedDate).format("HH");
    let b = moment(selectedDate).format("mm");
    if (event.type === "set") {
      setSatOpening({
        openTime: {
          hour: a,
          min: b,
        },
      });
    }
  };

  const openingSartuday = () => {
    DateTimePickerAndroid.open({
      value: new Date(),
      onChange: onChangeOpenSartuday,
      mode: "time",
      is24Hour: false,
    });
  };

  const onChangeCloseSat = (event, selectedDate) => {
    let a = moment(selectedDate).format("HH");
    let b = moment(selectedDate).format("mm");
    if (event.type === "set") {
      setSatClosing({
        closeTime: {
          hour: a,
          min: b,
        },
      });
    }
  };
  const clossingSat = () => {
    DateTimePickerAndroid.open({
      value: new Date(),
      onChange: onChangeCloseSat,
      mode: "time",
      is24Hour: false,
    });
  };

  const [sundayOpening, setSundayOpening] = useState({
    openTime: {
      hour: "0",
      min: "0",
    },
  });
  const [sundayClosing, setSundayClosing] = useState({
    closeTime: {
      hour: "0",
      min: "0",
    },
  });

  const onChangeOpenSunday = (event, selectedDate) => {
    let a = moment(selectedDate).format("HH");
    let b = moment(selectedDate).format("mm");
    if (event.type === "set") {
      setSundayOpening({
        openTime: {
          hour: a,
          min: b,
        },
      });
    }
  };

  const openingSunday = () => {
    DateTimePickerAndroid.open({
      value: new Date(),
      onChange: onChangeOpenSunday,
      mode: "time",
      is24Hour: false,
    });
  };

  const onChangeCloseSun = (event, selectedDate) => {
    let a = moment(selectedDate).format("HH");
    let b = moment(selectedDate).format("mm");
    if (event.type === "set") {
      setSundayClosing({
        closeTime: {
          hour: a,
          min: b,
        },
      });
    }
  };
  const clossingSun = () => {
    DateTimePickerAndroid.open({
      value: new Date(),
      onChange: onChangeCloseSun,
      mode: "time",
      is24Hour: false,
    });
  };

  var days = {
    Sunday: {
      openTime: {
        hour: sundayOpening.openTime.hour,
        min: sundayOpening.openTime.min,
      },
      closeTime: {
        hour: sundayClosing.closeTime.hour,
        min: sundayClosing.closeTime.min,
      },
    },
    Monday: {
      openTime: {
        hour: mondayOpening.openTime.hour,
        min: mondayOpening.openTime.min,
      },
      closeTime: {
        hour: mondayClosing.closeTime.hour,
        min: mondayClosing.closeTime.min,
      },
    },
    Tuesday: {
      openTime: {
        hour: tuesdatOpening.openTime.hour,
        min: tuesdatOpening.openTime.min,
      },
      closeTime: {
        hour: tuesdayClosing.closeTime.hour,
        min: tuesdayClosing.closeTime.min,
      },
    },
    Wednesday: {
      openTime: {
        hour: wednesdayOpening.openTime.hour,
        min: wednesdayOpening.openTime.hour,
      },
      closeTime: {
        hour: wednesdayClosing.closeTime.hour,
        min: wednesdayClosing.closeTime.min,
      },
    },
    Thursday: {
      openTime: {
        hour: thursdayOpening.openTime.hour,
        min: thursdayOpening.openTime.hour,
      },
      closeTime: {
        hour: thursdayClosing.closeTime.hour,
        min: thursdayClosing.closeTime.min,
      },
    },
    Friday: {
      openTime: {
        hour: fridayOpening.openTime.hour,
        min: fridayOpening.openTime.hour,
      },
      closeTime: {
        hour: fridayClosing.closeTime.hour,
        min: fridayClosing.closeTime.min,
      },
    },
    Saturday: {
      openTime: {
        hour: satOpening.openTime.hour,
        min: satOpening.openTime.hour,
      },
      closeTime: {
        hour: satClosing.closeTime.hour,
        min: satClosing.closeTime.min,
      },
    },
  };

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <View
            style={{
              flex: 0.1,
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Pressable
              onPress={() => navigation.goBack()}
              // style={{ alignSelf: "flex-start" }}
            >
              <Ionicons
                name="arrow-back-sharp"
                size={24}
                color="black"
                style={{ marginLeft: 10 }}
              />
            </Pressable>
          </View>
          <ScrollView
            style={{
              flex: 0.9,
              marginLeft: 10,
              marginRight: 10,
              marginBottom: 10,
            }}
          >
            <View>
              <Space height={10} />
              <View
                style={{
                  backgroundColor: "white",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    width: windowWidth / 3,
                    textAlign: "center",
                    fontSize: 20,
                  }}
                >
                  Days
                </Text>
                <Text
                  style={{
                    width: windowWidth / 3,
                    textAlign: "center",
                    fontSize: 20,
                  }}
                >
                  Opening Hours
                </Text>
                <Text
                  style={{
                    width: windowWidth / 3,
                    textAlign: "center",
                    fontSize: 20,
                  }}
                >
                  Closing Hours
                </Text>
              </View>
              <Space height={10} />
              <View
                style={{
                  flexDirection: "row",
                  height: 30,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: windowWidth / 3,
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      width: windowWidth / 3,
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                      }}
                    >
                      Monday
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    width: windowWidth / 3,
                    flexDirection: "row",
                  }}
                >
                  <View style={{ width: "50%" }}>
                    <Text
                      style={{
                        textAlign: "center",
                      }}
                    >
                      {mondayOpening.openTime.hour}:{mondayOpening.openTime.min}
                    </Text>
                  </View>
                  <View style={{ width: "50%" }}>
                    <Ionicons
                      onPress={() => openingMon()}
                      name="pencil"
                      size={22}
                      color="blue"
                      style={{
                        alignSelf: "flex-end",
                        justifyContent: "flex-end",
                        alignContent: "flex-end",
                        alignItems: "flex-end",
                      }}
                    />
                  </View>
                </View>

                <View
                  style={{
                    width: windowWidth / 3,
                    flexDirection: "row",
                  }}
                >
                  <View style={{ width: "50%" }}>
                    <Text
                      style={{
                        textAlign: "center",
                      }}
                    >
                      {mondayClosing.closeTime.hour}:
                      {mondayClosing.closeTime.min}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "50%",
                    }}
                  >
                    <Ionicons
                      onPress={() => clossingMon()}
                      name="pencil"
                      size={22}
                      color="blue"
                      style={{
                        alignSelf: "center",
                      }}
                    />
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  height: 30,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: windowWidth / 3,
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                    }}
                  >
                    Tuesday
                  </Text>
                </View>

                <View
                  style={{
                    width: windowWidth / 3,
                    flexDirection: "row",
                  }}
                >
                  <View style={{ width: "50%" }}>
                    <Text
                      style={{
                        textAlign: "center",
                      }}
                    >
                      {tuesdatOpening.openTime.hour}:
                      {tuesdatOpening.openTime.min}
                    </Text>
                  </View>
                  <View style={{ width: "50%" }}>
                    <Ionicons
                      onPress={() => openingTuesday()}
                      name="pencil"
                      size={22}
                      color="blue"
                      style={{
                        alignSelf: "flex-end",
                        justifyContent: "flex-end",
                        alignContent: "flex-end",
                        alignItems: "flex-end",
                      }}
                    />
                  </View>
                </View>

                <View
                  style={{
                    width: windowWidth / 3,
                    flexDirection: "row",
                  }}
                >
                  <View style={{ width: "50%" }}>
                    <Text
                      style={{
                        textAlign: "center",
                      }}
                    >
                      {tuesdayClosing.closeTime.hour}:
                      {tuesdayClosing.closeTime.min}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "50%",
                    }}
                  >
                    <Ionicons
                      onPress={() => clossingTuesday()}
                      name="pencil"
                      size={22}
                      color="blue"
                      style={{
                        alignSelf: "center",
                      }}
                    />
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  height: 30,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: windowWidth / 3,
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      width: windowWidth / 3,
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                      }}
                    >
                      Wednesday
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    width: windowWidth / 3,
                    flexDirection: "row",
                  }}
                >
                  <View style={{ width: "50%" }}>
                    <Text
                      style={{
                        textAlign: "center",
                      }}
                    >
                      {wednesdayOpening.openTime.hour}:
                      {wednesdayOpening.openTime.min}
                    </Text>
                  </View>
                  <View style={{ width: "50%" }}>
                    <Ionicons
                      onPress={() => openingWednesday()}
                      name="pencil"
                      size={22}
                      color="blue"
                      style={{
                        alignSelf: "flex-end",
                        justifyContent: "flex-end",
                        alignContent: "flex-end",
                        alignItems: "flex-end",
                      }}
                    />
                  </View>
                </View>

                <View
                  style={{
                    width: windowWidth / 3,
                    flexDirection: "row",
                  }}
                >
                  <View style={{ width: "50%" }}>
                    <Text
                      style={{
                        textAlign: "center",
                      }}
                    >
                      {wednesdayClosing.closeTime.hour}:
                      {wednesdayClosing.closeTime.min}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "50%",
                    }}
                  >
                    <Ionicons
                      onPress={() => clossingWednesday()}
                      name="pencil"
                      size={22}
                      color="blue"
                      style={{
                        alignSelf: "center",
                      }}
                    />
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  height: 30,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: windowWidth / 3,
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      width: windowWidth / 3,
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                      }}
                    >
                      Thursday
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    width: windowWidth / 3,
                    flexDirection: "row",
                  }}
                >
                  <View style={{ width: "50%" }}>
                    <Text
                      style={{
                        textAlign: "center",
                      }}
                    >
                      {thursdayOpening.openTime.hour}:
                      {thursdayOpening.openTime.min}
                    </Text>
                  </View>
                  <View style={{ width: "50%" }}>
                    <Ionicons
                      onPress={() => openingThurday()}
                      name="pencil"
                      size={22}
                      color="blue"
                      style={{
                        alignSelf: "flex-end",
                        justifyContent: "flex-end",
                        alignContent: "flex-end",
                        alignItems: "flex-end",
                      }}
                    />
                  </View>
                </View>

                <View
                  style={{
                    width: windowWidth / 3,
                    flexDirection: "row",
                  }}
                >
                  <View style={{ width: "50%" }}>
                    <Text
                      style={{
                        textAlign: "center",
                      }}
                    >
                      {thursdayClosing.closeTime.hour}:
                      {thursdayClosing.closeTime.min}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "50%",
                    }}
                  >
                    <Ionicons
                      onPress={() => clossingThursday()}
                      name="pencil"
                      size={22}
                      color="blue"
                      style={{
                        alignSelf: "center",
                      }}
                    />
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  height: 30,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: windowWidth / 3,
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      width: windowWidth / 3,
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                      }}
                    >
                      Friday
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    width: windowWidth / 3,
                    flexDirection: "row",
                  }}
                >
                  <View style={{ width: "50%" }}>
                    <Text
                      style={{
                        textAlign: "center",
                      }}
                    >
                      {fridayOpening.openTime.hour}:{fridayOpening.openTime.min}
                    </Text>
                  </View>
                  <View style={{ width: "50%" }}>
                    <Ionicons
                      onPress={() => openingFriday()}
                      name="pencil"
                      size={22}
                      color="blue"
                      style={{
                        alignSelf: "flex-end",
                        justifyContent: "flex-end",
                        alignContent: "flex-end",
                        alignItems: "flex-end",
                      }}
                    />
                  </View>
                </View>

                <View
                  style={{
                    width: windowWidth / 3,
                    flexDirection: "row",
                  }}
                >
                  <View style={{ width: "50%" }}>
                    <Text
                      style={{
                        textAlign: "center",
                      }}
                    >
                      {fridayClosing.closeTime.hour}:
                      {fridayClosing.closeTime.min}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "50%",
                    }}
                  >
                    <Ionicons
                      onPress={() => clossingFriday()}
                      name="pencil"
                      size={22}
                      color="blue"
                      style={{
                        alignSelf: "center",
                      }}
                    />
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  height: 30,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: windowWidth / 3,
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      width: windowWidth / 3,
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                      }}
                    >
                      Saturday
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    width: windowWidth / 3,
                    flexDirection: "row",
                  }}
                >
                  <View style={{ width: "50%" }}>
                    <Text
                      style={{
                        textAlign: "center",
                      }}
                    >
                      {satOpening.openTime.hour}:{satOpening.openTime.min}
                    </Text>
                  </View>
                  <View style={{ width: "50%" }}>
                    <Ionicons
                      onPress={() => openingSartuday()}
                      name="pencil"
                      size={22}
                      color="blue"
                      style={{
                        alignSelf: "flex-end",
                        justifyContent: "flex-end",
                        alignContent: "flex-end",
                        alignItems: "flex-end",
                      }}
                    />
                  </View>
                </View>

                <View
                  style={{
                    width: windowWidth / 3,
                    flexDirection: "row",
                  }}
                >
                  <View style={{ width: "50%" }}>
                    <Text
                      style={{
                        textAlign: "center",
                      }}
                    >
                      {satClosing.closeTime.hour}:{satClosing.closeTime.min}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "50%",
                    }}
                  >
                    <Ionicons
                      onPress={() => clossingSat()}
                      name="pencil"
                      size={22}
                      color="blue"
                      style={{
                        alignSelf: "center",
                      }}
                    />
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  height: 30,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: windowWidth / 3,
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      width: windowWidth / 3,
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                      }}
                    >
                      Sunday
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    width: windowWidth / 3,
                    flexDirection: "row",
                  }}
                >
                  <View style={{ width: "50%" }}>
                    <Text
                      style={{
                        textAlign: "center",
                      }}
                    >
                      {sundayOpening.openTime.hour}:{sundayOpening.openTime.min}
                    </Text>
                  </View>
                  <View style={{ width: "50%" }}>
                    <Ionicons
                      onPress={() => openingSunday()}
                      name="pencil"
                      size={22}
                      color="blue"
                      style={{
                        alignSelf: "flex-end",
                        justifyContent: "flex-end",
                        alignContent: "flex-end",
                        alignItems: "flex-end",
                      }}
                    />
                  </View>
                </View>

                <View
                  style={{
                    width: windowWidth / 3,
                    flexDirection: "row",
                  }}
                >
                  <View style={{ width: "50%" }}>
                    <Text
                      style={{
                        textAlign: "center",
                      }}
                    >
                      {sundayClosing.closeTime.hour}:
                      {sundayClosing.closeTime.min}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "50%",
                    }}
                  >
                    <Ionicons
                      onPress={() => clossingSun()}
                      name="pencil"
                      size={22}
                      color="blue"
                      style={{
                        alignSelf: "center",
                      }}
                    />
                  </View>
                </View>
              </View>
              <View style={{ alignItems: "center" }}>
                <Button
                  type="outline"
                  onPress={() => updateTime()}
                  buttonStyle={{ width: 100 }}
                >
                  <Text>SAVE</Text>
                </Button>
              </View>
            </View>

            <View
              style={{
                flex: 0.8,
                alignItems: "flex-start",
                marginLeft: 13,
                marginTop: 10,
              }}
            >
              <Button
                type="outline"
                onPress={() => setPauseModalVisible(true)}
                buttonStyle={{
                  alignItems: "center",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <Icon name="pause" color="rgba(39, 39, 39, 1)" size={30} />
              </Button>
            </View>
          </ScrollView>
        </View>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={PauseModalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setPauseModalVisible(!PauseModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ flex: 0.2 }}>
              <Text>Pause Orders</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                flex: 0.8,
              }}
            >
              <Button type="outline">10 min</Button>
              <Button type="outline">15 min</Button>
              <Button type="outline">30 min</Button>
              <Button type="outline">1 hour</Button>
              <Button type="outline">1 hour 30 mins</Button>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                // alignItems: "center",
                flex: 0.8,
              }}
            >
              <Button type="outline">2 hours</Button>
              <Button type="outline">3 hours</Button>
              <Button type="outline">4 hours</Button>
              <Button type="outline">Rest of the day</Button>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                flex: 0.2,
              }}
            >
              <Button
                onPress={() => setPauseModalVisible(!PauseModalVisible)}
                title="CANCEL"
                buttonStyle={{
                  backgroundColor: "rgba(39, 39, 39, 1)",
                  height: 50,
                }}
                containerStyle={{
                  width: 150,
                  marginHorizontal: 30,
                  marginVertical: 10,
                }}
                titleStyle={{
                  color: "white",
                  marginHorizontal: 20,
                  fontWeight: "900",
                  fontSize: 19,
                }}
              />
              <Button
                onPress={() => moveToNextModal()}
                title="NEXT"
                buttonStyle={{
                  backgroundColor: "rgba(39, 39, 39, 1)",
                  height: 50,
                }}
                containerStyle={{
                  width: 150,
                  marginHorizontal: 30,
                  marginVertical: 10,
                }}
                titleStyle={{
                  color: "white",
                  marginHorizontal: 20,
                  fontWeight: "900",
                  fontSize: 19,
                }}
              />
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={clossingHoursModailVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setClossingHoursModailVisible(!clossingHoursModailVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ flex: 0.08 }}>
              <Text>Clossing Hours</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                flex: 0.8,
              }}
            >
              <Text>Set Time</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                flex: 0.2,
              }}
            >
              <Button
                onPress={() =>
                  setClossingHoursModailVisible(!clossingHoursModailVisible)
                }
                title="CANCEL"
                buttonStyle={{
                  backgroundColor: "rgba(39, 39, 39, 1)",
                  height: 50,
                }}
                containerStyle={{
                  width: 150,
                  marginHorizontal: 30,
                  marginVertical: 10,
                }}
                titleStyle={{
                  color: "white",
                  marginHorizontal: 20,
                  fontWeight: "900",
                  fontSize: 19,
                }}
              />
              <Button
                onPress={() =>
                  setClossingHoursModailVisible(!clossingHoursModailVisible)
                }
                title="SAVE"
                buttonStyle={{
                  backgroundColor: "rgba(39, 39, 39, 1)",
                  height: 50,
                }}
                containerStyle={{
                  width: 150,
                  marginHorizontal: 30,
                  marginVertical: 10,
                }}
                titleStyle={{
                  color: "white",
                  marginHorizontal: 20,
                  fontWeight: "900",
                  fontSize: 19,
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={holidayModal}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setHoliday(!holidayModal);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ flex: 0.08 }}>
              <Text>Holiday</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                flex: 0.8,
              }}
            >
              <Text>Set Holiday</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                flex: 0.2,
              }}
            >
              <Button
                onPress={() => setHoliday(!holidayModal)}
                title="CANCEL"
                buttonStyle={{
                  backgroundColor: "rgba(39, 39, 39, 1)",
                  height: 50,
                }}
                containerStyle={{
                  width: 150,
                  marginHorizontal: 30,
                  marginVertical: 10,
                }}
                titleStyle={{
                  color: "white",
                  marginHorizontal: 20,
                  fontWeight: "900",
                  fontSize: 19,
                }}
              />
              <Button
                onPress={() => setHoliday(!holidayModal)}
                title="SAVE"
                buttonStyle={{
                  backgroundColor: "rgba(39, 39, 39, 1)",
                  height: 50,
                }}
                containerStyle={{
                  width: 150,
                  marginHorizontal: 30,
                  marginVertical: 10,
                }}
                titleStyle={{
                  color: "white",
                  marginHorizontal: 20,
                  fontWeight: "900",
                  fontSize: 19,
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={reasonModal}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setReasonModal(!reasonModal);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ flex: 0.08 }}>
              <Text>Pause Orders</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                flex: 0.8,
              }}
            >
              <Text>Reson For Pause</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                flex: 0.2,
              }}
            >
              <Button
                onPress={() => setReasonModal(!reasonModal)}
                title="CANCEL"
                buttonStyle={{
                  backgroundColor: "rgba(39, 39, 39, 1)",
                  height: 50,
                }}
                containerStyle={{
                  width: 150,
                  marginHorizontal: 30,
                  marginVertical: 10,
                }}
                titleStyle={{
                  color: "white",
                  marginHorizontal: 20,
                  fontWeight: "900",
                  fontSize: 19,
                }}
              />
              <Button
                onPress={() => setReasonModal(!reasonModal)}
                title="SAVE"
                buttonStyle={{
                  backgroundColor: "rgba(39, 39, 39, 1)",
                  height: 50,
                }}
                containerStyle={{
                  width: 150,
                  marginHorizontal: 30,
                  marginVertical: 10,
                }}
                titleStyle={{
                  color: "white",
                  marginHorizontal: 20,
                  fontWeight: "900",
                  fontSize: 19,
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: windowHeight / 1.5,
    width: windowWidth / 1.2,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default Settings;
