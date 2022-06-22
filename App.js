import { StatusBar } from 'expo-status-bar';
import { StyleSheet,  View, } from 'react-native';
import { useFonts } from 'expo-font';
import Text from './src/component/Text'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/component/Login';
import Home from './src/component/Home';
import Sign from './src/component/Sign';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { useEffect,useState } from 'react';
import { onAuthStateChanged,getAuth,signOut } from 'firebase/auth';
import { ActivityIndicator } from 'react-native';
import Todo from './src/component/Todo';
import Update from './src/component/Update/Update';




const firebaseConfig = {
  apiKey: "AIzaSyBDjeNYEUSypZD1E6adFOhv3Ifr8JYuqAk",
  authDomain: "react-native-all-apps.firebaseapp.com",
  projectId: "react-native-all-apps",
  storageBucket: "react-native-all-apps.appspot.com",
  messagingSenderId: "316796935084",
  appId: "1:316796935084:web:878d8cb793dc7888dbf809",
  measurementId: "G-B651HKGP6Y"
};
 export const app = initializeApp(firebaseConfig);

export default function App() {
const [Loading,setloading] = useState(true)
  const[users,setuser] = useState(null)

  const auth = getAuth()
useEffect(()=>{
const currentuser = onAuthStateChanged(auth,user=>{
  if(user){
    setuser(user)
    // setloading(false)
  }
  else{
    // setloading(true)
    setuser(null)
  }
})
return currentuser
},[])


const Stack = createNativeStackNavigator();
const Apptheme = {
  ...DefaultTheme,
  colors:{
 ...DefaultTheme.colors,
 background:'#FFF'
  }
}
  let [fontsLoaded] = useFonts({
    "Poppins-Bold":require('./assets/Poppins-Bold.ttf'),
    "Poppins-Medium":require('./assets/Poppins-Medium.ttf'),
  });

  if (!fontsLoaded) {
    return <Text preset=''>loading</Text>
  }
// if(Loading){

//  return(
//   <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
//   <ActivityIndicator size="large" color="black" />
// </View>
//  )
// }

  return (
    <View style={styles.container}>

      <StatusBar style="auto" />
      <NavigationContainer theme={Apptheme} >
      <Stack.Navigator >
    {
      users? (

        <>
          <Stack.Screen   name="Home">
          {props => <Home {...props} user={users} />}
          </Stack.Screen>
          <Stack.Screen  name="Todo">
          {props => <Todo {...props} user={users} />}
          </Stack.Screen>
          <Stack.Screen   name="Update" component={Update} />
    
        </>
      ) : (

        <>
          <Stack.Screen  options={{headerShown: false}} name="Login" component={Login} />
          <Stack.Screen  options={{headerShown: false}} name="Signup" component={Sign} />
        </>
      )
    }
      </Stack.Navigator>
    </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
