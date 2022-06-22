import { View,StyleSheet,Image } from 'react-native'
import React from 'react'
import Text from './Text'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Dimensions } from 'react-native';
import { TextInput } from 'react-native';
import { Pressable } from 'react-native';
import Btn from './Btn';
import { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword  } from "firebase/auth";
import { collection, addDoc, getFirestore } from "firebase/firestore"; 
import { app } from '../../App';



export default function Login({navigation}) {
  const auth = getAuth()
  const [selected,setselected] = useState('')
  const [email,seteamail] = useState('')
  const [password,setpassword] = useState('')
  const [name,setname]= useState('')
  const[age,setage] = useState('')
  const [error,seterror] = useState('')
  const db = getFirestore(app)

  const Gender = ["Male","Female"]
  

const signUp  = () =>{
  
   createUserWithEmailAndPassword(auth, email, password)
 .then((userCredential) => {
    const user = userCredential.user;
      const docRef =   addDoc(collection(db, "Users"), {
     name:name,
     email:email,
     password:password,
     gender:selected,
     age:age,
     uid:user?.uid
      });
      console.log("Document written with ID: ", docRef.id);

    
    
  

   })

  .catch((error) => {

    const errorMessage = error.message;
    seterror(errorMessage)

  });
}
 
  let dimensions = Dimensions.get("window");
    let imageHeight = Math.round((dimensions.width * 10) / 16);
    let imageWidth = dimensions.width;
  return (
<SafeAreaView style={style.container}>
 <View style={{}}>
 <Image source={require('../../assets/login.png.png')}     style={{ height: imageHeight, width: imageWidth, }} />
 </View>
 <Text preset='h4' style={style.notes}>Never forget your notes</Text>
  <View style={{paddingHorizontal:15,paddingTop:40}}>
<TextInput placeholder="enter your name" style={style.input} onChangeText={text => setname(text)}/>
<TextInput placeholder="enter your age" style={style.input} onChangeText={text => setage(text)}/>
<TextInput placeholder="enter your email" style={style.input} onChangeText={text => seteamail(text)}/>
<TextInput placeholder="enter your password" style={style.input} onChangeText={text => setpassword(text)}/>
{
     Gender?.map(option =>{
     const Genders = selected === option
return   <Pressable  key={option} onPress={()=> setselected(option)} style={{flexDirection:'row',marginTop:10}}>
      <View style={[style.outercontainer,Genders && style.selectedouter]}>
      <View style={[style.innercontainer,Genders && style.selectedInner]}></View>
      </View>
      <Text style={{marginLeft:10}}>{option}</Text>
        </Pressable>
     
     })
   }

     <Btn 
     title="Sign up"
       customstyle={{marginTop:20,}}
      onPress={signUp}/>
<View style={{flexDirection:'row',justifyContent:'center',marginTop:70}}>
  <Text>Already have a account?</Text><Pressable   onPress={()=> navigation.navigate("Login")} ><Text style={{marginLeft:10,color:"#32CD32"}} >Log in</Text></Pressable>
</View>

  </View>

</SafeAreaView>
  )
}


const style = StyleSheet.create({

  container:{
flex:1
  },
  image:{

    
  },
  notes:{
   alignSelf:'center',
   textTransform:'uppercase'
  },
  input:{
    borderBottomWidth:1,
    paddingHorizontal:10,
    paddingVertical:12,
    marginVertical:5,
    opacity:0.7
  },
  outercontainer:{
    width:30,
    height:30,
    borderRadius:30,
    borderWidth:1,
    borderColor:"#000",
    justifyContent:'center',
    alignItems:'center',
    opacity:0.6

  },
  innercontainer:{
    width:15,
    height:15,
    borderRadius:15,
    borderWidth:1,
    borderColor:"#000",

  },
  selectedouter:{
    borderColor:'orange'
  },
  selectedInner:{
    backgroundColor:"orange",
    borderColor:"orange"
  }

})
