import { View, Text as RNtext,StyleSheet} from 'react-native'
import React from 'react'
import { Typography } from './Typography'

export default function Text({children,preset="default",style}) {

    const Customstyle = StyleSheet.compose(presets[preset],style)
  return (
    <View>
<RNtext style={Customstyle}>{children}</RNtext>
    </View>
  )
}

const Base={
    fontFamily:Typography.primary,
    fontSize:16,
    color:"black"

}

const Base_BOLD={
    fontFamily:Typography.bold,
    fontSize:16,
    color:"black"

}
export const presets = {
    default:Base,
    bold:Base_BOLD,
    h1:{
        ...Base_BOLD,
        fontFamily:Typography.bold,
        fontSize:32
    },
    
    h2:{
        ...Base_BOLD,
        fontFamily:Typography.bold,
        fontSize:28
    },
    h3:{
        ...Base_BOLD,
        fontFamily:Typography.bold,
        fontSize:24
    },
    h4:{
        ...Base,
        fontFamily:Typography.bold,
        fontSize:20
    },
    p:{
        ...Base,
        fontFamily:Typography.primary,
        fontSize:16
    }
    
}