import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  Image,
  TouchableOpacity
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import pic from "../assets/home.png";

const Home = () => {
  let std_id = "61070343";
  let subject_id = "subject1";
  let subject_name = "RPA";
  let fac = "IT";
  return (

    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.header}>Hi , {std_id}</Text>
        <Text style={{marginLeft:"5%",fontSize:20}}>Find a course you want to see</Text>
        <Image style={styles.pic} source={pic}></Image>
      </View>

      <View style={styles.mid}>
        <TextInput style={styles.input} placeholder="search"></TextInput>
        <TouchableOpacity style={styles.btn}>
          <Text style={{textAlign:"center",marginTop:10}}>Search</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottom}>
        <TouchableOpacity style={styles.details}>
          <Text style={styles.subject}>{"รหัสวิชา : "+subject_id}</Text>
          <Text style={styles.subject}>{"ชื่อวิชา : " +subject_name}</Text>
          <Text style={styles.subject}>{"คณะ : " + fac}</Text>
        </TouchableOpacity>
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
    flex: 4,
  },
  mid: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  bottom: {
    alignItems: "flex-end",
    flex: 3,
  },
  header: {
    fontSize: 35,
    marginTop: "7%",
    marginLeft: "5%"
  },
  input: {
    borderRadius: 10,
    height: "35%",
    width: "70%",
    backgroundColor: "#E0E0E0",
    textAlign: "center",
    marginLeft: 15
  },
  pic: {
    width: "90%",
    height: "70%",
    marginLeft: "5%",
    marginTop: 10,
    borderRadius: 15,
  },
  btn: {
    height:"35%",
    width: "15%",
    backgroundColor: "gold",
    borderRadius: 10,
    marginRight: 15
  },
  details: {
    backgroundColor: "purple",
    width: 350,
    height: 100,
    borderRadius: 15,

  },
  subject: {
    fontSize: 18,
    marginTop: 6,
    marginLeft: 30,
    color: "white"
  }
});
export default Home;
