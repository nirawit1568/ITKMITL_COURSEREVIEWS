import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

import SignIn from "./screens/SignIn";
import Home from "./screens/Home";
import SignUp from "./screens/SignUp";
import Subject from "./screens/Subject";

export default function App() {
  const [login,setLogin] = useState(0);
  const [std_id,setStd_id] = useState(0);
  const [isSubject,setSubject] = useState(0);
  let content;

  const loginHandler = (status) => {
    setLogin(status);
  }
  const person = (std_id) => {
    setStd_id(std_id);
  }
  const subject = (id) => {
    console.log(id);
    setSubject(id);
  }

  if (login === 0) {
    content = <SignIn onStartApp={loginHandler} person={person} />;
  } else if (login === 1) {
    content = <Home onStartApp={loginHandler} std_id={std_id} subject={subject} />;
  } else if (login === 2) {
    content = <SignUp />;
  } else if (login === 3) {
    content = <Subject onStartApp={loginHandler} subject={isSubject} />;
  }

  return (
    <View style={styles.container}>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
