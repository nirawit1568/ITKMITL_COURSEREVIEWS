import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";

import * as firebase from "firebase";

import pic from "../assets/รูปภาพ3.png";

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

const Subject = () => {
  //firebase
  //  .database()
  //  .ref("subject")
  //  .on("value", (snapshot) => {
  //    let data = snapshot.val();
  //    let items = Object.values(data);
  //    setSubject(items);
  //  });

  //const [isSubject, setSubject] = useState();
  //const [isSubjectId, setSubjectId] = useState();
  //const [isSubjectName, setSubjectName] = useState();
  //const [isTeacherName, setTeacher] = useState();
  //const [isDescription, setDescription] = useState();

  //console.log(isSubject);

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.header}>About Subject</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", height: "50%", }}>
          <Image style={styles.pic} source={pic}></Image>
          <View style={{ margin: 10 }}>
            <Text>รหัสวิชา : </Text>
            <Text>ชื่อวิชา : </Text>
            <Text>อาจารย์ : </Text>
            <Text>รายละเอียด : </Text>
          </View>
        </View>
      </View>
      <View style={styles.bottom}>
        <SafeAreaView>
          <ScrollView></ScrollView>
        </SafeAreaView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 8,
    backgroundColor: "white",
  },
  top: {
    flex: 1.5,
  },
  mid: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  bottom: {
    alignItems: "flex-end",
    flex: 3,
    backgroundColor: "#E5CCFF",
  },
  header: {
    fontSize: 35,
    marginTop: "7%",
    marginLeft: "5%",
  },
  input: {
    borderRadius: 10,
    height: "35%",
    width: "70%",
    backgroundColor: "#E0E0E0",
    textAlign: "center",
    marginLeft: 15,
  },
  pic: {
    width: "40%",
    height: "100%",
    marginLeft: "9%",
    marginTop: "5%",
    borderRadius: 15,
  },
  btn: {
    height: "35%",
    width: "15%",
    backgroundColor: "gold",
    borderRadius: 10,
    marginRight: 15,
  },
  details: {
    backgroundColor: "purple",
    width: 400,
    height: 100,
    borderRadius: 15,
    marginVertical: 5,
  },
  subject: {
    fontSize: 15,
    marginTop: 6,
    marginLeft: 30,
    color: "white",
  },
});

export default Subject;
