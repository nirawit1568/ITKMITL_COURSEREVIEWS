import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image,Picker, Button} from 'react-native';
import pic from "../assets/send.png";
import signout from "../assets/SignOut.png";
import back from "../assets/back.png";

import * as firebase from "firebase";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { render } from 'react-dom';

var firebaseConfig = {
    apiKey: "AIzaSyBl1cjx2N5tP2vx70kGcmVd7-dnKTRmWdE",
    authDomain: "coursereview-itkmitl.firebaseapp.com",
    databaseURL: "https://coursereview-itkmitl.firebaseio.com",
    projectId: "coursereview-itkmitl",
    storageBucket: "coursereview-itkmitl.appspot.com",
    messagingSenderId: "40812640422",
    appId: "1:40812640422:web:fc4c58257c6390db515c67",
    measurementId: "G-0TSDMPJ93K"
};

// Initialize Firebase
if (firebase.apps.length==0){
  firebase.initializeApp(firebaseConfig);
}

class Comments extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          text:"",
          score:5,
          allsubject:[],
          comments:[],
          button:false,
          subject_id: props.subject,
          logout: props.onStartApp,
          teacher_name: props.teacher,
          subject_name: props.subject_name
        }
    }

    viewcomment = () => {
      let comment = [];
      for(let i=0;i<this.state.allsubject.length;i++){
        if(this.state.allsubject[i].subject_id==this.state.subject_id){
          for(let j=0;j<this.state.allsubject[i].teacher.length;j++){
            if(this.state.allsubject[i].teacher[j].name==this.state.teacher_name){
              for(let k=0;k<this.state.allsubject[i].teacher[j].comment.length;k++){
                //text = <TouchableOpacity style={styles.details}><Text style={styles.subject}>คะแนน : {item.item.teacher[j].score[k] + " / 5"}</Text><Text style={styles.subject}>ความคิดเห็น : {item.item.teacher[j].comment[k]}</Text></TouchableOpacity>
                comment[k] = this.state.allsubject[i].teacher[j].comment[k]
              }
            }
          }
        }
      }
      this.setState({comments:comment})
      this.setState({button:true})
    }

    componentDidMount() {
        firebase.database().ref("subject").on('value', (snapshot) => {
          let data = snapshot.val();
          let items = Object.values(data);
          this.setState({ allsubject:items });
        });
    }

    back=()=> {
      this.state.logout(3);
    }

    logout=()=>{
      this.state.logout(0);
    }

    test = (score,text) => {
      console.log(score,text)
      return(
        <TouchableOpacity style={styles.details}>
          <Text style={styles.subject}>คะแนน : {score}</Text>
          <Text style={styles.subject}>ความคิดเห็น : {text}</Text>
        </TouchableOpacity>
      );
    }

    savecomment = () => {
      var sub = this.state.allsubject
      if(this.state.button == true){
        for(let i=0;i<sub.length;i++){
          if(sub[i].subject_id == this.state.subject_id){
            for(let j=0;j<sub[i].teacher.length;j++){
              if(sub[i].teacher[j].name==this.state.teacher_name){
                firebase.database().ref('subject/'+i+'/teacher/'+j+'/comment/'+sub[i].teacher[j].comment.length).set(
                  this.state.text
                )
                firebase.database().ref('subject/'+i+'/teacher/'+j+'/score/'+sub[i].teacher[j].score.length).set(
                  parseInt(this.state.score)
                )
              }
            }
          }
        } 
      }
    }

    renderItem = (item) =>{
      return (
        <TouchableOpacity style={styles.details}>
          <Text style={styles.subject}>ความคิดเห็น : {item.item}</Text>
        </TouchableOpacity>
      );
    }

    render(){
        return(
          <View style={styles.container}>
            <View style={styles.head}>
              <TouchableOpacity onPress={()=>this.back()}>
                <Image source={back} style={{width:50,height:50,marginLeft:10}}/>
              </TouchableOpacity>
              <View style={styles.info_subject}>
                <Text style={styles.title_info}>รหัสวิชา : {this.state.subject_id}</Text>
                <Text style={styles.title_info}>ชื่อวิชา : {this.state.subject_name}</Text>
                <Text style={styles.title_info}>ชื่ออาจารย์ : {this.state.teacher_name}</Text>
              </View>
              <TouchableOpacity onPress={()=>this.logout()}>
                <Image source={signout} style={{width:60,height:55,marginTop:10}}></Image>
              </TouchableOpacity>
            </View>

              <View style={styles.Comments_title}>
                <Text style={styles.title}>Comments</Text>
              </View>
              
              <View style={styles.mid} >
                <ScrollView>
                  {this.state.button == false? (
                    <TouchableOpacity style={{width:"30%",height:"100%",backgroundColor:"#9370DB",marginLeft:"35%",marginTop:"50%"}} onPress={()=>this.viewcomment()}>
                        <Text style={{marginLeft:13,color:"white",fontSize:23}}>ดู comment</Text>
                    </TouchableOpacity>
                  ):(
                    <FlatList data={this.state.comments} renderItem={this.renderItem} />
                  )}
                  
                  
                </ScrollView>                          
              </View>

              <View style={styles.bottom}>
                <View style={{flexDirection:"row",marginTop:20,marginLeft:25}}>
                  <TextInput style={styles.box} placeholder="เขียนความคิดเห็น" onChangeText={(text) => this.setState({text:text})}></TextInput>
                  <TouchableOpacity onPress={()=>this.savecomment()}>
                    <Image style={styles.pic} source={pic}></Image>
                  </TouchableOpacity>
                </View>
                <View style={{flexDirection:"row"}}>
                  <Text style={{fontSize:16,marginTop:20,marginLeft:40}} >คะแนนที่ให้</Text>
                  <View style={{marginTop:5,marginLeft:20,backgroundColor:"white"}}>
                    <Picker
                      selectedValue={this.state.score}
                      style={{ height: 50, width: 100 }}
                      onValueChange={(itemValue, itemIndex) => this.setState({score:itemValue})}
                    >
                      <Picker.Item label="5" value="5" />
                      <Picker.Item label="4" value="4" />
                      <Picker.Item label="3" value="3" />
                      <Picker.Item label="2" value="2" />
                      <Picker.Item label="1" value="1" />
                    </Picker>
                  </View>
                </View>
              </View>
          </View>
        )
    }
}




const styles = StyleSheet.create({
  container: {
    flex: 8,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  head:{
    flex:1,
    marginRight:130,
    marginTop:30,
    width:"75%",
    height:"100%",
    flexDirection: "row",
    alignItems: "center",
  },
  Comments_title: {
    marginTop: "6%",
    backgroundColor:"#FFE4B5",
    borderRadius:10,
    width:"100%",
    height:"5%",
    alignItems:"center"
  },
  title: {
    fontSize: 36,
  },
  info_subject:{
    width:"90%",
    marginLeft:10,
    marginRight:10,
  },
  title_info: {
    fontSize: 16,
  },
  mid:{
    flex:6,
    backgroundColor:"#FFE4B5",
    width:"100%",
    height:"100%"
  },
  bottom: {
    width:"100%",
    height:"100%",
    flexDirection:"column",
    backgroundColor:"#FFE4B5",
    flex: 2,

  },
  details: {
    backgroundColor: "#DDA0DD",
    marginLeft:35,
    width: 420,
    height: 80,
    borderRadius: 15,
    marginVertical:10

  },
  subject: {
    fontSize: 18,
    color: "white",
    padding: "3%",
    
  },
  box: {
    borderRadius:30,
    height: 60,
    width: 350,
    backgroundColor: "white",
    textAlign: "center",
    fontSize: 16,
  },
  pic:{
    width:62,
    height:65,
    marginLeft:10,
    marginRight:10,
  }

});

export default Comments;
