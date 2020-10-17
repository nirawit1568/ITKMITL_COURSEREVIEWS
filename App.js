import { StatusBar } from "expo-status-bar";
import React,{useState} from "react";
import { StyleSheet, View } from "react-native";
import SignIn from "./screens/signIn";
import Home from "./screens/home";

export default function App() {
  const [login,setLogin] = useState(false);
  const [std_id,setStd_id] = useState(0);
  let content;

  const loginHandler = (status) => {
    setLogin(status);
  }
  const logoutHandler = (status) => {
    setLogin(status); 
  }
  const person = (std_id) => {
    setStd_id(std_id);
  }

  if(login==false){
    content = <SignIn onStartApp={loginHandler} person={person}/>
  }
  else if(login==true){
    content = <Home endApp={logoutHandler} std_id={std_id}/>
  }


  return (
    <View style={styles.screen}>
      {content}
    </View>
  );
}


const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});