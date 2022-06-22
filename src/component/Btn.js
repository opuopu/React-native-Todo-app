import { View,Pressable ,StyleSheet} from 'react-native'
import React from 'react'
import Text from './Text'
// import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'

export default function Btn({onPress,title,customstyle,textstyle}) {

  return (
    <Pressable onPress={onPress} style={[style.button,customstyle]}>
    <Text style={[style.title,textstyle]}>{title}</Text>
     </Pressable>
  )
}

const style = StyleSheet.create({
button:{
borderRadius:30,
width:165,
height:45,
backgroundColor:'#FFA500',
justifyContent:'center',
alignSelf:'center'

},
title:{
fontSize:18,
color:"#fff",
alignSelf:'center'
}

})