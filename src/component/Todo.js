import { View,StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Text from './Text'
import { SafeAreaView } from 'react-native-safe-area-context'
import Input from './Input'
import Btn from './Btn'
import { collection, addDoc } from "firebase/firestore"; 
import { getFirestore } from "firebase/firestore";
import { app } from '../../App'
import { ActivityIndicator } from 'react-native-paper'
import { showMessage } from 'react-native-flash-message'


export default function Todo({user,navigation}) {
    // console.log(user)
    const db = getFirestore(app);
    const cl =["red","green","orange","blue"]

    const [title,settitle] = useState('')
    const [desc,setdesc] = useState('')
    const [loading,setloading] = useState(false)

    const submittodo = async() =>{
     setloading(true)
        try {
            const docRef = await addDoc(collection(db, "notes"), {
      title:title,
    desc:desc,
    uid:user?.uid,
    color:cl[Math.floor(Math.random()*cl.length)]

            });

            setloading(false)
            // navigation.goBack()
          
            
       
          
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
            setloading(false)
          }
       
    }
  return (
<SafeAreaView style={style.todomain}>
    <Text>todo</Text>
<Input
placeholder="Title"
onChangeText={text =>settitle(text)}

/>
<Input
placeholder="Description"
multiline={true}
onChangeText={text => setdesc(text)}
/>

{ loading?    <ActivityIndicator size="small" color="#0000ff" /> :<Btn title="Submit now"
customstyle={style.custom}
onPress={submittodo}
/>}
</SafeAreaView>
  )
}
const style = StyleSheet.create({
    todomain:{
        // flex:1,
        marginHorizontal:20

    },
    custom:{
        marginTop:10
    }

})