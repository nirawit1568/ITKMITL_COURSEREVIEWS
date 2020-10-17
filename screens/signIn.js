import { StatusBar } from "expo-status-bar";
import React,{useState} from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  Image
} from "react-native";

import pic from "../assets/signin.png";

import * as firebase from "firebase";


var firebaseConfig = {
  apiKey: "AIzaSyBVVoujZZZ4ywJtktg3fOJaodTuWb5rcHY",
  authDomain: "itkmitl-coursereviews-6c92e.firebaseapp.com",
  databaseURL: "https://itkmitl-coursereviews-6c92e.firebaseio.com",
  projectId: "itkmitl-coursereviews-6c92e",
  storageBucket: "itkmitl-coursereviews-6c92e.appspot.com",
  messagingSenderId: "86142338526",
  appId: "1:86142338526:web:275590aa6d38c5978d094f",
  measurementId: "G-GR6QTPGP6Z"
};
// Initialize Firebase
if (firebase.apps.length==0){
  firebase.initializeApp(firebaseConfig);
}

const SignIn = (props) => {
  const [username,setUsername] = useState();
  const [password,setPassword] = useState();

  const onPressLogin = () => {
    firebase.database().ref("user").on("value",(data)=>{
      for(var i=0;i<data.val().length;i++){
        if(data.val()[i].username == username){
          if(data.val()[i].password == password){
            props.onStartApp(true);
            props.person(data.val()[i].std_id);
          }
          else{
            Alert.alert("Password was wrong");
          }
        }
      }
    });
  };
  const onPressRegister = () => {
    Alert.alert("Register.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header1}>Sign in</Text>
      <Text style={styles.header2}>IT KMITL COURSE REVIEW</Text>
      <Image style={styles.pic} source={pic}></Image>
      <TextInput style={styles.box} placeholder="Username" onChangeText={(text)=>setUsername(text)}></TextInput>
      <TextInput secureTextEntry={true} style={styles.box} placeholder="Password" onChangeText={(text)=>setPassword(text)}></TextInput>
      <Button style={styles.btn} title="LOGIN" color="gold" onPress={() => onPressLogin()}></Button>
      <TouchableOpacity onPress={() => onPressRegister()}>
        <Text style={{ color: "white", fontSize: 15 }}>Register Now !</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    borderRadius:15,
    height: 50,
    width: 300,
    backgroundColor: "white",
    textAlign: "center",
  },
  pic: {
    width: "70%",
    height:"40%"
  },

});
export default SignIn;
