import React, {useEffect, useState} from 'react'
import {View,Text, TextInput, TouchableOpacity, StyleSheet,Alert} from 'react-native'
import * as ImagePicker from "react-native-image-picker"

import base_url from '../../base_url'

const Register = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [profileImage, setProfileImage] = useState('')

    const choosePhoto = () => {
        const options = {
          noData:true
        };
        ImagePicker.launchImageLibrary(options, response => {
            if(response.didCancel){
                console.log("Image uploading canceled")
              }else if(response.assets[0].uri){
                setProfileImage(response.assets[0])
          }
        });
      }

    const register = ()=>{
        var profile_image = {
            uri:profileImage.uri,
            type:profileImage.type,
            name:profileImage.fileName
        }

        let formData = new FormData()
        formData.append('name',name)
        formData.append('password',password)
        formData.append('email',email)
        formData.append('profile_image',profile_image)

        fetch(base_url+'/register_user',{
            method: 'POST',
            body:formData,
            headers: { "Content-type": "multipart/form-data" }
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.is_registered == 1){
                Alert.alert("User Registered Successfully")
            }else{
                Alert.alert("User Already Exists.Please try another email")
                
            }
        })
        .catch(err=>{
            Alert.alert("Something Went Wrong")
        })
    }


    return(
        <View style={styles.container}>
        <TextInput placeholder='Name' onChangeText={(val)=> setName(val)} style={{ borderWidth:1,borderColor:'black',padding:10,width:'80%',marginTop:50 }}/>

        <TextInput placeholder='Email' onChangeText={(val)=> setEmail(val)} style={{ borderWidth:1,borderColor:'black',padding:10,width:'80%',marginTop:18 }}/>
        <TextInput placeholder='Password' secureTextEntry onChangeText={(val)=> setPassword(val)} style={{ borderWidth:1,borderColor:'black',padding:10,width:'80%',marginTop:18 }}/>

        <TouchableOpacity onPress={() => choosePhoto()} style={styles.btn}>
            <Text style={{color:"black"}}>Profile Image</Text>
        </TouchableOpacity>


        <TouchableOpacity onPress={() => register()} style={styles.btn}>
            <Text style={{color:"black"}}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>props.navigation.navigate('login')} style={{marginTop:50}}>
            <Text style={{color:"blue"}}>Already have an account? Login</Text>
        </TouchableOpacity>
    </View>
    )
}



const styles = StyleSheet.create({
    container:{
        flex:1,
      
        alignItems:'center',
       
    },
    btn:{
        width:200,
        height:50,
        padding:10,
        justifyContent:'center',
        alignItems:'center',
        borderColor:"skyblue",
        borderWidth:1,
        borderRadius:10,
        marginTop:20,
        backgroundColor:"skyblue"
       
    }
})

export default Register;