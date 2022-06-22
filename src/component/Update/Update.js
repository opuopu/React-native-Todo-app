import { View,StyleSheet, ActivityIndicator} from 'react-native'
import React, { useState } from 'react'
import Text from '../Text'
import { SafeAreaView } from 'react-native-safe-area-context'
import Input from '../Input'
import Btn from '../Btn'
import { doc, getFirestore, updateDoc } from 'firebase/firestore'
import { app } from '../../../App'

export default function Update({route}) {

const item = route.params.item


const db = getFirestore(app)

const [title,settitle] = useState(item?.title)
const [desc,setdesc] = useState(item?.desc)
const [loading,setloading] = useState(false)
const[color,setcolor] = useState(item?.color)

{
  loading  && <ActivityIndicator color="green"/>
}




  const EditNow = async () =>{

  try{
    await updateDoc(doc,(db,"notes",item?.id),{
      title:title,
      desc:desc
    })

  }

  catch(err){
console.log(err)
  }



  }


  return (
 <SafeAreaView>
<Text>update your notes</Text>
<Input
placeholder="edit your title"
value={title}
onChangeText={item => settitle(item)}

/>
<Input placeholder="edit your desc"
value={desc}
onChangeText={item => setdesc(item)}



/>
<Input placeholder="edit your color"
value={color}
onChangeText={item => setcolor(item)}



/>
<Btn
title="edit now"
customstyle={styles.btns}
onPress={EditNow}
/>
 </SafeAreaView>
  )
}
const styles = StyleSheet.create({
btns:{
  marginTop:20
}

})