import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  FlatList,
} from "react-native";

import pic from "../assets/home.png";
import logout from "../assets/SignOut.png";
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
if (firebase.apps.length == 0) {
  firebase.initializeApp(firebaseConfig);
}

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      subject: [],
      search: [],
      status_search: false,
      std_id: props.std_id,
      subjectid: props.subject,
      tosubject: props.onStartApp,
      logout: props.onStartApp
    };
  }

  //add data from firebase to state subject:[]
  componentDidMount() {
    firebase
      .database()
      .ref("subject")
      .on("value", (snapshot) => {
        let data = snapshot.val();
        let items = Object.values(data);
        this.setState({ subject: items });
      });
  }

  onPressTo = (id) => {
    this.state.subjectid(id);
    this.state.tosubject(3);
  };

  //renderItem from Flatlist
  renderItem = (item) => {
    return (
      <TouchableOpacity style={styles.details} onPress={() => this.onPressTo(item.item.subject_id)} >
        <Text style={styles.subject}>
          {"รหัสวิชา : " + item.item.subject_id}
        </Text>
        <Text style={styles.subject}>{"ชื่อวิชา : " + item.item.name}</Text>
        <Text style={styles.subject}>{"คณะ : Information of technology"}</Text>
      </TouchableOpacity>
    );
  };

  logout = () => {
    this.state.logout(0);
  }
  //when search
  search = () => {
    var data = this.state.subject;
    if (this.state.text == "") {
      this.setState({ status_search: false });
    } else {
      var search = this.state.search;
      search.splice(0, search.length);
      for (let i = 0; i < data.length; i++) {
        if (this.state.text == data[i].subject_id) {
          this.state.search.push(data[i]);
        }
      }
      this.setState({ status_search: true });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 0.8 }}>
              <Text style={styles.header}>Hi</Text>
              <Text style={{ marginLeft: "5%", fontSize: 20 }}>
                Find a course you want to see
              </Text>
            </View>
            <View style={{ flex: 0.2, marginTop: "6%" }}>
              <TouchableOpacity
                onPress={this.logout}
              >
                <Image source={logout} style={{width:60,height:55,marginTop:15,marginLeft:20}}></Image>
              </TouchableOpacity>
            </View>
          </View>
          <Image style={styles.pic} source={pic}></Image>
        </View>
        <View style={styles.mid}>
          <TextInput
            style={styles.input}
            placeholder="ค้นหาจากรหัสวิชา"
            onChangeText={(text) => this.setState({ text })}
          ></TextInput>
          <TouchableOpacity style={styles.btn} onPress={this.search}>
            <Text style={{ textAlign: "center", marginTop: 10 }}>Search</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottom}>
          <ScrollView>
            {this.state.status_search == true ? (
              <FlatList data={this.state.search} renderItem={this.renderItem} />
            ) : (
              <FlatList
                data={this.state.subject}
                renderItem={this.renderItem}
              />
            )}
          </ScrollView>
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
    height:"90%",
    width:"90%",
    marginLeft:25
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
    width: "100%",
    height: "70%",

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
export default Home;
