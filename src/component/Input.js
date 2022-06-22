

import { View, Text } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { TextInput } from 'react-native'

export default function Input({placeholder,onChangeText,multiline,value,editable,autoCorrect,defaultValue}) {
  return (
<TextInput placeholder={placeholder} style={style.input} onChangeText={onChangeText} value={value} multiline={multiline} defaultValue={defaultValue}  editable={editable} autoCorrect={autoCorrect}/>

  )
}


const style = StyleSheet.create({
      input:{
    borderBottomWidth:1,
    paddingHorizontal:10,
    paddingVertical:12,
    marginVertical:5,
    opacity:0.7
  },
})