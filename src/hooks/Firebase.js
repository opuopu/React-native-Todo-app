import { getAuth, createUserWithEmailAndPassword  } from "firebase/auth";
import { collection, addDoc, getFirestore } from "firebase/firestore"; 
import { useState } from "react";

const auth = getAuth()
const [email,setemail] = useState("")
const [password,setpassword] = useState("")
const [loading,setloading] = useState(false)
const [name,setname] = useState('')
const [selected,setselected] = useState('')
const[age,setage] = useState('')
const [error,seterror] = useState('')
const db = getFirestore(app)

// sign up
const signup = () =>{
  return (
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

  )



}