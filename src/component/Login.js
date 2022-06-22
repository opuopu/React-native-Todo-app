import { View,StyleSheet,Image } from 'react-native'
import React from 'react'
import Text from './Text'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Dimensions } from 'react-native';
import { TextInput } from 'react-native';
import { Pressable } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Btn from './Btn';
import { useState } from 'react'


export default function Login({navigation}) {
  const auth = getAuth()
  const [email,setemail] = useState('')
  const [password,setpassword] = useState('')
  const [error,seterror] = useState('')
  let dimensions = Dimensions.get("window");
    let imageHeight = Math.round((dimensions.width * 10) / 16);
    let imageWidth = dimensions.width;
    const signIn = () =>{
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        seterror(error.message)
      });
    }
  return (
<SafeAreaView style={style.container}>
 <View style={{}}>
 <Image source={require('../../assets/login.png.png')}     style={{ height: imageHeight, width: imageWidth, }} />
 </View>
 <Text preset='h4' style={style.notes}>Never forget your notes</Text>
  <View style={{paddingHorizontal:15,paddingTop:40}}>
<TextInput placeholder="enter your email" style={style.input}/>
<TextInput placeholder="enter your password" style={style.input}/>
     <Btn 
     title="Login now"
       customstyle={{marginTop:20,}}
 onPress={signIn} />
<View style={{flexDirection:'row',justifyContent:'center',marginTop:200}}>
  <Text>Dont have a accout?</Text><Pressable   onPress={()=> navigation.navigate("Signup")} ><Text style={{marginLeft:10,color:"#32CD32"}} >Sign up</Text></Pressable>
</View>

  </View>
</SafeAreaView>
  )
}


const style = StyleSheet.create({

  // container:{
  //   alignItems:'center',
  //   justifyContent:'center'
  // }
  image:{

    
  },
  notes:{
   alignSelf:'center',
   textTransform:'uppercase'
  },
  input:{
    borderBottomWidth:1,
    paddingHorizontal:10,
    paddingVertical:15,
    marginVertical:10,
    opacity:0.7
  },

})