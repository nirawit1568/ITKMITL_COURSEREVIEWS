import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";

import ImgSignIn from "../assets/SignIn.png";

import * as firebase from "firebase";

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

const SignIn = (props) => {
  const [isUsername, setUsername] = useState();
  const [isPassword, setPassword] = useState();

  //When press login button
  const onPressSignIn = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(isUsername, isPassword)
      .then((res) => {
        console.log("User logged-in successfully!");
        props.onStartApp(1);
      })
      .catch((error) => {
        //error callback
        Alert.alert("Email or password was wrong")
        console.log("error ", error);
      });
  };

  //when press register
  const onPressSignUp = () => {
    props.onStartApp(2);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header1}>SIGN IN</Text>
      <Text style={styles.header2}>IT KMITL COURSE REVIEW</Text>
      <Image style={styles.img} source={ImgSignIn} />
      <TextInput
        style={styles.box}
        placeholder="email @it.kmitl.ac.th"
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        secureTextEntry={true}
        style={styles.box}
        placeholder="password"
        onChangeText={(text) => setPassword(text)}
      />
      <View style={styles.btn}>
      <Button
        // style={styles.btn}
        title="Login"
        color="#FFCB3E"
        onPress={() => onPressSignIn()}
      />
      </View>
      <TouchableOpacity onPress={() => onPressSignUp()}>
        <Text style={{ color: "white", fontSize: 15, marginTop: "6%"}}>Don't have an account ? <Text style={{ color: "#4f3558", fontSize: 17, }}> Register</Text></Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "space-evenly",
    backgroundColor: "#E5CCFF",
  },
  header1: {
    fontSize: 50,
    // marginRight: "58%",
    marginTop: "10%",
    fontWeight: "bold",
    color: "#4f3558"
  },
  header2: {
    fontSize: 21,
    // marginRight: "28%",
    marginTop: "4%",
    color: "#693b69"
  },
  btn:{
    marginTop: "9%",
    width: 130,
    
  },
  box: {
    // borderWidth: 0.5,
    borderRadius: 23,
    height: 50,
    width: 350,
    backgroundColor: "white",
    textAlign: "center",
    marginTop: "6%"
  },
  img: {
    width: "70%",
    height: "40%",
    marginTop: "6%",
  },
});

export default SignIn;
