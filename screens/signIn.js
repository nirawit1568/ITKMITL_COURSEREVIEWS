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
  const [isUsername, setUsername] = useState('');
  const [isPassword, setPassword] = useState('');

  //When press login button
  const onPressSignIn = () => {
    if(isUsername.length > 0 && isPassword.length>0){
          firebase
      .auth()
      .signInWithEmailAndPassword(isUsername, isPassword)
      .then((res) => {
        console.log("User logged-in successfully!");
        props.onStartApp(1);
      })
      .catch((error) => {
        //error callback
        Alert.alert("Email or password was wrong");
        console.log("error ", error);
      });
    }
    else {
      Alert.alert("Please enter email and password.")
    }

  };

  //when press register
  const onPressSignUp = () => {
    props.onStartApp(2);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header1}>SIGN <Text style={styles.header3}>IN</Text></Text>
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
        color="#16a588"
        onPress={() => onPressSignIn()}
      />
      </View>
      <Text style={{ color: "white", fontSize: 17, marginTop: "6%"}}>Don't have an account ?
      <TouchableOpacity onPress={() => onPressSignUp()}>
        <Text style={{ color: "#dd544c", fontSize: 17}}> Register</Text>
      </TouchableOpacity>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "space-evenly",
    backgroundColor: "#43254c",
  },
  header1: {
    fontSize: 55,
    // marginRight: "58%",
    marginTop: "10%",
    fontWeight: "bold",
    color: "#f0c15e"
  },
  header2: {
    fontSize: 21,
    // marginRight: "28%",
    marginTop: "4%",
    color: "white"
  },
  header3:{
    color: "#dd544c"
  },
  btn: {
    marginTop: "9%",
    width: 150,
    
  },
  box: {
    // borderWidth: 0.5,
    borderRadius: 23,
    height: 50,
    width: 360,
    backgroundColor: "white",
    textAlign: "center",
    marginTop: "5%"
  },
  img: {
    width: "72%",
    height: "42%",
    marginTop: "4%",
  },
});

export default SignIn;
