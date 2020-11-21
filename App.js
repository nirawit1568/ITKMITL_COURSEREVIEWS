import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

import SignIn from "./screens/signIn";
import Home from "./screens/home";
import SignUp from "./screens/SignUp";
import Subject from "./screens/Subject";
import Comments from "./screens/comments";

export default function App() {
  const [login,setLogin] = useState(0);
  const [isSubject,setSubject] = useState(0);
  const [isTeacher,setTeacher] = useState(0);
  const [isSubjectname,setSubjectname] = useState(0);
  let content;

  const loginHandler = (status) => {
    setLogin(status);
  }

  const subject = (id) => {
    setSubject(id);
  }

  const teacher = (name) => {
    setTeacher(name);
  }

  const subject_name = (name) => {
    setSubjectname(name);
  }

  if (login === 0) {
    content = <SignIn onStartApp={loginHandler} />;
  } else if (login === 1) {
    content = <Home onStartApp={loginHandler} subject={subject} />;
  } else if (login === 2) {
    content = <SignUp onStartApp={loginHandler}/>;
  } else if (login === 3) {
    content = <Subject onStartApp={loginHandler} subject={isSubject} subject_name={subject_name} teacher_no={teacher}/>;
  } else if (login === 4) {
    content = <Comments onStartApp={loginHandler} subject={isSubject} subject_name={isSubjectname} teacher={isTeacher}/>;
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
