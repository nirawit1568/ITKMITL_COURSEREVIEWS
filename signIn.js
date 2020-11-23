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

import ImgSignIn from "../assets/signin.png";

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
    if(isUsername.includes("@it.kmitl.ac.th")){
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
    }
    else {
      Alert.alert("Please enter email @it.kmitl.ac.th")
    }
    

  };

  //when press register
  const onPressSignUp = () => {
    props.onStartApp(2);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header1}>SignIn</Text>
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
      <Button
        style={styles.btn}
        title="Login"
        color="gold"
        onPress={() => onPressSignIn()}
      />
      <TouchableOpacity onPress={() => onPressSignUp()}>
        <Text style={{ color: "white", fontSize: 15 }}>Register</Text>
      </TouchableOpacity>
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
  header1: {
    fontSize: 50,
  },
  header2: {
    fontSize: 30,
  },
  box: {
    borderWidth: 0.5,
    borderRadius: 15,
    height: 50,
    width: 300,
    backgroundColor: "white",
    textAlign: "center",
  },
  img: {
    width: "70%",
    height: "40%",
  },
});

export default SignIn;
