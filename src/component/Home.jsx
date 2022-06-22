import { View,StyleSheet, Pressable  } from 'react-native'
import React, { useEffect, useState } from 'react'
import Text from './Text'
import { SafeAreaView } from 'react-native-safe-area-context'
import Btn from './Btn'
import { getAuth, signOut } from "firebase/auth";
import { collection, deleteDoc, doc, getFirestore, onSnapshot, query, QuerySnapshot, where } from 'firebase/firestore'
import { app } from '../../App'
import { FlatList } from 'react-native'
import { ScrollView } from 'react-native'
import { async } from '@firebase/util'




export default function Home({navigation,user}) {
 const db = getFirestore(app);
  const [notes,setnotes] = useState([])
  console.log(notes)


console.log("home screen end")

  // query data i mean read data
  useEffect(()=>{
const q = query(collection(db,"notes"),where("uid","==",user?.uid));
const unsubscribe = onSnapshot(q,(QuerySnapshot)=>{
  const note =[];
  QuerySnapshot.forEach(doc=>{
    note.push({...doc.data(),id:doc?.id})
  })
  setnotes(note)


})
return unsubscribe

  },[])
// deletedoc


  // 
const renderItem = ({item}) =>{


  return(
  <Pressable style={[styles.btns,{backgroundColor:item.color}]} onPress={()=>{
    navigation.navigate("Update",{item})
  }}>
    <Text preset='h3' style={styles.title}>{item?.title}</Text>
    <Text style={styles.title}>{item?.desc}</Text>
    <Pressable onPress={async()=>{
        await deleteDoc(doc(db,"notes",item?.id))

    }}>

<Text style={{color:"#fff"}}>Delete now</Text>
    </Pressable>

    

  </Pressable>




  )


}




const createtodo =() =>{
  navigation.navigate('Todo')
}

  return (
 <SafeAreaView style={styles.container}>
   <Pressable style={{justifyContent:'center',alignSelf:'center'}} onPress={createtodo}><Text preset='h4' e style={styles.create}>create</Text></Pressable>
<ScrollView>
<FlatList
 data={notes}
renderItem={renderItem}
keyExtractor={item => item.title}
/>
</ScrollView>
 </SafeAreaView>    
  )
}

const styles = StyleSheet.create({
container:{
  flex:1,
marginHorizontal:20

},
btns:{
borderRadius:18,
marginTop:10
},
title:{
color:"white",
padding:6,
paddingLeft:10


},
create:{
  backgroundColor:"#6A5ACD",
  width:100,
  padding:10,
  borderRadius:13,

  color:"white",
  alignSelf:'center'
}

})