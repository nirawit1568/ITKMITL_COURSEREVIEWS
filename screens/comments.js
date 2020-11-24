import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image,Picker, Button} from 'react-native';
import pic from "../assets/send.png";
import signout from "../assets/SignOut.png";
import back from "../assets/back.png";
import icon from "../assets/comment.png";
import stu from "../assets/stud.jpg";

import * as firebase from "firebase";
import { FlatList, ScrollView } from "react-native-gesture-handler";

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
                <Image source={back} style={{width:40,height:40,marginLeft:10,marginTop:10}}/>
              </TouchableOpacity>
              <View style={{width:"50%",height:50,marginLeft:110}}>
                <Text style={styles.title_Comments} >Comments</Text>
              </View>
              <TouchableOpacity onPress={()=>this.logout()}>
                <Image source={signout} style={{width:50,height:45,marginLeft:10,marginTop:10}}></Image>
              </TouchableOpacity>
            </View>
            
            
              
              <View style={styles.mid} >
              {this.state.button == false? (
              <View style={styles.info_subject}>
              <Text style={{fontWeight:"bold", fontSize:25, color: "#272b2f", marginBottom:30}}>{this.state.subject_name}</Text>
              <Text style={styles.title_info}>{this.state.subject_id}</Text>
              <Text style={styles.title_info}>ชื่ออาจารย์ : {this.state.teacher_name}</Text>
            </View>
            ):(
              <View></View>
            )}
                <ScrollView>
                  {this.state.button == false? (
                    <TouchableOpacity style={styles.seemore} onPress={()=>this.viewcomment()}>
                      <Image source={icon} style={{width:45,height:40,marginTop:30}}></Image>
                        <Text style={{marginLeft:12,color:"#202937",fontSize:20, textAlign: "center", fontWeight: "bold",marginTop:30}}>See Comments</Text>
                        
                    </TouchableOpacity>
                  ):(
                    <FlatList data={this.state.comments} renderItem={this.renderItem} />
                  )}
                  
                  
                </ScrollView>                          
              </View>

              
              {this.state.button == true? (
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
              ):(
                <Image source={stu} style={{width:460,height:435,marginTop:8,marginLeft:28}}></Image>
              )}

              
          </View>
        )
    }
}




const styles = StyleSheet.create({
  container: {
    flex: 8,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  head:{
    flex:1,
    width:"100%",
    height:"100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3e1a4a",
    borderBottomEndRadius: 40,
    borderBottomStartRadius: 40
  },
  
  title: {
    fontSize: 36,
  },
  info_subject:{
    
    width:"80%",
    marginLeft:30,
    marginRight:10,
    marginTop:70,
    textAlign: "center"
  },
  title_info: {
    fontSize: 20,
    marginTop:10,
    color: "#4f5459"
  },
  mid:{
    flex:4,
    backgroundColor:"white",
    width:"100%",
    height:"100%",
    borderTopEndRadius: 60,
    borderTopStartRadius: 50,
    
  },
  bottom: {
    width:"100%",
    height:"100%",
    flexDirection:"column",
    backgroundColor:"white",
    flex: 1,

  },
  details: {
    backgroundColor: "#e8e1f4",
    marginLeft:35,
    width: 420,
    height: 130,
    borderRadius: 12,
    marginVertical:10,
    marginTop:50  

  },
  subject: {
    fontSize: 18,
    color: "black",
    padding: "3%",
    
  },
  box: {
    borderRadius:30,
    height: 60,
    width: 350,
    backgroundColor: "#f2f2f2",
    textAlign: "center",
    fontSize: 16,
  },
  pic:{
    width:62,
    height:65,
    marginLeft:10,
    marginRight:10,
  },
  seemore:{
    backgroundColor: "white",
    width: 240,
    height: 90,
    borderRadius: 22,
    justifyContent: "center",
    marginTop: 35,
    borderColor: "#b2b2b2",
    borderWidth:  1,
    marginLeft: 30,
    flexDirection:"row"
  },
  title_Comments:{
    fontSize: 33,
    // fontWeight:"bold",
    marginTop:7,
    color: "white"
  }

});

export default Comments;
