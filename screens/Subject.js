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
import backlogo from "../assets/back.png"
import signout from "../assets/SignOut.png";
import boy from "../assets/boy.png";
import girl from "../assets/woman.png"

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

class Subject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allsubject: [],
      subject_id: props.subject,
      subject_name: "",
      teacher: [],
      description: "",
      backpage: props.onStartApp,
      teacher_name: props.teacher_no,
      sbj_name:props.subject_name
    };
  }

  componentDidMount() {
    firebase
    .database()
    .ref("subject")
    .on("value", (snapshot) => {
      let data = snapshot.val();
      let items = Object.values(data);
      this.setState({allsubject:items})
    });

  }

  back = () => {
    this.state.backpage(1)
  }
  
  logout = () => {
    this.state.backpage(0)
  }

  teacher_select = (name) => {
    this.state.teacher_name(name)
    this.state.sbj_name(this.state.subject_name)
    this.state.backpage(4)
  }

  renderItem = (item) => {
    //render subject from subject select
    if (this.state.subject_id == item.item.subject_id){
      var score1 = 0;
      var score2 = 0;
      //calculate score
      for (let i=0;i<item.item.teacher.length;i++){
        for(let j=0;j<item.item.teacher[i].score.length;j++){
          if(i==0){
            score1 = score1 + item.item.teacher[i].score[j];
          }
          else{
            score2 = score2 + item.item.teacher[i].score[j];
          }
        }

      }
      this.setState({subject_name:item.item.name})
      this.setState({description:item.item.description})

      //render subject for 1 teacher
      if(item.item.teacher.length == 1){
        return(
          <View style={styles.teacher} >
          <TouchableOpacity style={styles.details} onPress={() => this.teacher_select(item.item.teacher[0].name)}>
            <View style={{flexDirection:"row",alignItems:"center"}}>
              <Image source={boy} style={{width:90,height:110}}></Image>
                <View style={{flexDirection:"column"}}>
                  <Text style={{fontSize:17,width:"65%",marginVertical:10}}>{"อาจารย์ : " + item.item.teacher[0].name}</Text>
                  <Text style={{fontSize:17,width:"65%"}}>{"คะแนน : " + (score1/item.item.teacher[0].score.length).toFixed(1) + "/5.0"}</Text>
                </View>
            </View>
          </TouchableOpacity>
          </View>
        )
      }
      //render subject for 2 teachers
      else if(item.item.teacher.length == 2){
        return(
        <View style={styles.teacher} >
          <TouchableOpacity style={styles.details} onPress={() => this.teacher_select(item.item.teacher[0].name)}>
          <View style={{flexDirection:"row",alignItems:"center"}}>
              <Image source={boy} style={{width:90,height:110}}></Image>
                <View style={{flexDirection:"column"}}>
                  <Text style={{fontSize:17,width:"65%",marginVertical:10}}>{"อาจารย์ : " + item.item.teacher[0].name}</Text>
                  <Text style={{fontSize:17,width:"65%"}}>{"คะแนน : "+ (score1/item.item.teacher[0].score.length).toFixed(1) +"/5.0"}</Text>
                </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.details} onPress={() => this.teacher_select(item.item.teacher[1].name)}>
          <View style={{flexDirection:"row",alignItems:"center"}}>
              <Image source={girl} style={{width:90,height:110}}></Image>
                <View style={{flexDirection:"column"}}>
                  <Text style={{fontSize:17,width:"65%",marginVertical:10}}>{"อาจารย์ : " + item.item.teacher[1].name}</Text>
                  <Text style={{fontSize:17,width:"65%"}}>{"คะแนน : "+ (score2/item.item.teacher[1].score.length).toFixed(1) +"/5.0"}</Text>
                </View>
            </View>
          </TouchableOpacity>
        </View>
        )
      }
    }
  };

  render(){
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.head}>
            <TouchableOpacity onPress={this.back}>
                <Image source={backlogo} style={{width:40,height:40,marginTop:10,marginRight:50,marginLeft:12}}/>
              </TouchableOpacity>
              <Text style={styles.header}>About <Text style={styles.header1}>Subject</Text></Text>
              <TouchableOpacity
                onPress={this.logout}
              >
                <Image source={signout} style={{width:45,height:40,marginTop:10,marginLeft:75}}></Image>
              </TouchableOpacity>
             
            </View>
          </View>
          {/* <View style={{ flexDirection: "row", alignItems: "center", height: "60%", }}>
            <Image style={styles.pic} source={pic}></Image>
            <View style={styles.aboutsubject}>
              <Text style={styles.abouttext}>รหัสวิชา : {this.state.subject_id}</Text>
              <Text style={styles.abouttext}>ชื่อวิชา : {this.state.subject_name}</Text>
              <Text style={styles.abouttext}>คณะ : เทคโนโลยีสารสนเทศ </Text>
              <Text style={styles.abouttext}>รายละเอียดวิชา : {this.state.description}</Text>
            </View>
          </View> */}
        </View>
        <View style={styles.bottom}>
        <View style={{ flexDirection: "row", alignItems: "center", height: "22%", }}>
            <View style={styles.aboutsubject}>
              <Text style={{fontSize :24,marginVertical:3,marginLeft:15, fontWeight: "bold", color:"#202937", marginTop: 120, marginBottom:20, textAlign: "center"}}>{this.state.subject_name}</Text>
              <Text style={styles.abouttext}>รหัสวิชา : {this.state.subject_id}</Text>
              <Text style={styles.abouttext}>คณะ : เทคโนโลยีสารสนเทศ </Text>
              <Text style={styles.abouttext}>รายละเอียดวิชา : {this.state.description}</Text>
            </View>
          </View>
          <SafeAreaView>
            <ScrollView>
              <FlatList data={this.state.allsubject} renderItem={this.renderItem} />
            </ScrollView>
          </SafeAreaView>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 4,
    backgroundColor: "#3e1a4a",
  },
  bottom: {
    alignItems: "center",
    flex: 4,
    backgroundColor: "white",
    // borderRadius: 50,
    borderTopEndRadius: 50,
    borderTopStartRadius: 50,
    marginTop:30,
    
  },
  header: {
    fontSize: 33,
    marginTop: "2%",
    marginLeft: "8%",
    color: "#f0c15e",
    fontWeight: "bold"
  },
  header1: {
    
    color: "#dd544c",
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
    width: "35%",
    height: "100%",
    // marginLeft: "6%",
    marginTop: "10%",
    borderRadius: 15,
  },
  btn: {
    height: "35%",
    width: "15%",
    backgroundColor: "gold",
    borderRadius: 10,
    marginRight: 15,
  },

  subject: {
    fontSize: 15,
    marginTop: 6,
    marginLeft: 30,
    color: "white",
  },
  head:{
    marginTop:30,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  details: {
    backgroundColor: "#dccff5",
    width: 370,
    height: 140,
    borderRadius: 30,
    marginTop:35,
    justifyContent: "center",
    marginTop: 35,
    borderColor: "#a696e2",
    borderWidth:  2.5,
    

  },
  aboutsubject:{
    margin: 12,
    width:380,
    height:170,
    borderRadius:15,
    marginTop:60,
    justifyContent: "center",
    marginBottom:20,
    
  },
  abouttext: {
    color:"#606366",
    fontSize:14,
    marginVertical:3,
    marginLeft:10,
    textAlign: "center"
    
  },
  // backout: {
  //   flexDirection: "row",
  //   marginLeft:100,
  // },
  teacher:{
    marginTop: "33%",
  }
});

export default Subject;

