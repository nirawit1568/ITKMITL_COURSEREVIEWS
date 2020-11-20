import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  Image,
} from "react-native";

import * as firebase from "firebase";

import ImgSignUp from "../assets/SignUp.png";

var firebaseConfig = {
  apiKey: "AIzaSyBl1cjx2N5tP2vx70kGcmVd7-dnKTRmWdE",
  authDomain: "coursereview-itkmitl.firebaseapp.com",
  databaseURL: "https://coursereview-itkmitl.firebaseio.com",
  projectId: "coursereview-itkmitl",
  storageBucket: "coursereview-itkmitl.appspot.com",
  messagingSenderId: "40812640422",
  appId: "1:40812640422:web:fc4c58257c6390db515c67",
  measurementId: "G-0TSDMPJ93K",
};

// Initialize Firebase
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const SignUp = (props) => {
  const [isPassword, setPassword] = useState();
  const [isConfirmPassword, setConfirmPassword] = useState();
  const [isEmail, setEmail] = useState();

  const writeUserData = () => {
    if (isPassword === isConfirmPassword) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(isEmail, isPassword)
        .then(() => {
          console.log("User registered successfully!");
        })
        .then((data) => {
          //success callback
          props.onStartApp(0);
          console.log("data ", data);
        })
        .catch((error) => {
          //error callback
          console.log("error ", error);
        });
    } else {
      Alert.alert("ConfirmPassword was wrong");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 50 }}>SignIn</Text>
      <Image style={styles.img} source={ImgSignUp} />

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ fontSize: 20 }}>Email(@it) </Text>
        <TextInput style={styles.box} onChangeText={(text) => setEmail(text)} />
      </View>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ fontSize: 20 }}>Password </Text>
        <TextInput
          style={styles.box}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ fontSize: 20 }}>ConfirmPassword </Text>
        <TextInput
          style={styles.box}
          secureTextEntry={true}
          onChangeText={(text) => setConfirmPassword(text)}
        />
      </View>
      <Button title="Register" onPress={writeUserData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#E5CCFF",
  },
  box: {
    borderWidth: 0.5,
    borderRadius: 15,
    height: 50,
    width: 200,
    backgroundColor: "white",
    textAlign: "center",
  },
  img: {
    width: "100%",
    height: "22%",
  },
});

export default SignUp;
