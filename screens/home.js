import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView, ScrollView,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView
} from "react-native";

import pic from "../assets/signin.png";
import logout from "../assets/logout.png";
import * as firebase from "firebase";
import { FlatList } from "react-native-gesture-handler";


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

class home extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          text:"",
          subject: [],
          search:[],
          status_search:false,
          std_id: props.std_id,
          logout: props.endApp,
          
        }
    }

    componentDidMount() {
        firebase.database().ref("subject").on('value', snapshot => {
          let data = snapshot.val();
          let items = Object.values(data);
          this.setState({ subject:items });
        });
        
      }

    renderItem = (item) => {
    return(
        <TouchableOpacity style={styles.details}>
            <Text style={styles.subject}>{"รหัสวิชา : "+item.item.subject_id}</Text>
            <Text style={styles.subject}>{"ชื่อวิชา : " +item.item.name}</Text>
            <Text style={styles.subject}>{"คณะ : Information of technology"}</Text>
        </TouchableOpacity>
    );
  }

    search = () => {

      var data = this.state.subject;

      if (this.state.text==""){
        this.setState({status_search:false})
      }
      else {
        var search = this.state.search
        search.splice(0,search.length)
        for (let i=0;i<data.length;i++){
          if(this.state.text==data[i].subject_id){
              this.state.search.push(data[i])
          }
        }
        this.setState({status_search:true})
      }
    }

    render(){
        return(
          <View style={styles.container}>
              <View style={styles.top}>
                  <View style={{flexDirection:"row"}}>
                  <View style={{flex:0.8}}>
                  <Text style={styles.header}>Hi, {this.state.std_id}</Text>
                      <Text style={{marginLeft:"5%",fontSize:20}}>Find a course you want to see</Text>
                  </View>
                  <View style={{flex:0.2,marginTop:"6%"}}>
                      <TouchableOpacity onPress={() => {this.state.logout(false)}}>
                      <Image source={logout}></Image>
                      </TouchableOpacity>
                  </View>
                  </View>
                  <Image style={styles.pic} source={pic}></Image>
              </View>
              <View style={styles.mid}>
                  <TextInput style={styles.input} placeholder="ค้นหาจากรหัสวิชา" onChangeText={(text) => this.setState({ text })}></TextInput>
                  <TouchableOpacity style={styles.btn} onPress={this.search}>
                      <Text style={{textAlign:"center",marginTop:10}}>Search</Text>
                  </TouchableOpacity>
              </View>
              <View style={styles.bottom}>
                  <SafeAreaView>
                      <ScrollView>
                          {this.state.status_search == true ?
                            <FlatList
                            data={this.state.search}
                            renderItem={this.renderItem}
                            />
                            : 
                            <FlatList
                            data={this.state.subject}
                            renderItem={this.renderItem}
                            />}
                          
                      </ScrollView>
                  </SafeAreaView>
              </View>
          </View>

        );
    }
}
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
      marginTop:20
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
      width: "80%",
      height: "70%",
      marginLeft: "9%",
      marginTop: "5%",
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
      width: 400,
      height: 100,
      borderRadius: 15,
      marginVertical:5
  
    },
    subject: {
      fontSize: 15,
      marginTop: 6,
      marginLeft: 30,
      color: "white"
    }
  });
export default home;