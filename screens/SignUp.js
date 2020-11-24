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
import backlogo from "../assets/back.png";
import ImgSignUp from "../assets/SignUp.png";
import { TouchableOpacity } from "react-native-gesture-handler";

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
          Alert.alert("registered successfully!");
          props.onStartApp(0);
          console.log("User registered successfully!");
        })
        .then((data) => {
          //success callback
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
  const back = () => {
    props.onStartApp(0);
  }

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <TouchableOpacity onPress={back}>
          <Image source ={backlogo} style={{width:45,height:40, marginRight:100}}/>
        </TouchableOpacity>
        <Text style={styles.header1}>SIGN <Text style={styles.header3}>UP</Text></Text>
      </View>
      
      
      <Image style={styles.img} source={ImgSignUp} />
      <View style={styles.bottom}>
      <View style={{ flexDirection: "row", alignItems: "center", marginTop:70}}>

        <Text style={{ fontSize: 20, color:"white",marginRight:60 }}>Email(@it) </Text>
        <TextInput style={styles.box} placeholder="@it.kmitl.ac.th" onChangeText={(text) => setEmail(text)} />
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", marginTop:35}}>
        <Text style={{ fontSize: 20,color:"white" ,marginRight:60}}>Password </Text>
        <TextInput
          style={styles.box}
          secureTextEntry={true}
          placeholder="more than 6 characters"
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", marginTop:35 }}>
        <Text style={{ fontSize: 20 , color:"white"}}>ConfirmPassword </Text>
        <TextInput
          style={styles.box}
          secureTextEntry={true}
          placeholder="more than 6 characters"
          onChangeText={(text) => setConfirmPassword(text)}
        />
      </View>
      <View style={styles.btn}>
      <Button title="Register"
      color="#16a588"
       onPress={writeUserData} />
       </View>
       </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 4,
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "white",
  },
  box: {
    borderWidth: 0.5,
    borderRadius: 25,
    marginLeft:20,
    height: 50,
    width: 250,
    backgroundColor: "white",
    textAlign: "center",
  },
  img: {
    width: "100%",
    height: "25%",
  },
  head: {
    flex:1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginRight: "26%"
    
  },
  btn: {
    marginTop:70,
    width: 150,
  },
  header1: {
    fontSize: 55,
    fontWeight: "bold",
    color: "#f0c15e"
  },
  header3:{
    color: "#dd544c"
  },
  bottom: {
    alignItems: "center",
    flex: 3,
    width:"100%",
    backgroundColor: "#43254c",
    borderTopEndRadius: 50,
    borderTopStartRadius: 50,
    // marginTop:30,
    
  },
  
});

export default SignUp;
