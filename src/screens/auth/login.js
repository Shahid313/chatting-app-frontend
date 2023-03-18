import React, {useEffect, useState} from 'react'
import {View,Text, TextInput, TouchableOpacity, StyleSheet,Alert} from 'react-native'
import base_url from '../../base_url'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const login = ()=>{
        let formData = new FormData()
       
        formData.append('password', password)
        formData.append('email', email)

        fetch(base_url+'/login_user',{
            method: 'POST',
            body:formData
        })
        .then(res=>res.json())
        .then(async(data)=>{
            console.log(data)
            if(data.is_loggedin == 1){
                try{
                    await AsyncStorage.setItem('user',JSON.stringify(data.user))
                    props.navigation.reset({
                        index: 0,
                        routes: [{ name: 'home'}]
                    });
                }catch(e){
                    Alert.alert("Something Went Wrong")
                }
               
            }else{
                Alert.alert("Invalid Email or Password")
                
            }
        })
        .catch(err=>{
            Alert.alert("Something Went Wrong")
        })

    }

    return(
        <View style={styles.container}>
                <TextInput placeholder='Email' onChangeText={(val)=> setEmail(val)} style={{ borderWidth:1,borderColor:'black',padding:10,width:'80%',marginTop:50 }}/>
                <TextInput placeholder='Password' secureTextEntry onChangeText={(val)=> setPassword(val)} style={{ borderWidth:1,borderColor:'black',padding:10,width:'80%',marginTop:18 }}/>


                <TouchableOpacity onPress={() => login()} style={styles.btn}>
                    <Text style={{color:"black"}}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>props.navigation.navigate('register')} style={{marginTop:50}}>
                    <Text style={{color:"blue"}}>Dont have an account? Register</Text>
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


export default Login;