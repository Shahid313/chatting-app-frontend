import React, {useEffect, useState} from 'react'
import {View,Text, TextInput, TouchableOpacity, StyleSheet,Alert} from 'react-native'
import base_url from '../../base_url'
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddRoom = () => {
    const [room_name, setRoomName] = useState('')

    const add_group = async()=>{
        const user= await AsyncStorage.getItem('user')
        const parse = JSON.parse(user)
        let formData = new FormData()
        formData.append('room_name',room_name)
        formData.append('user_id',parse.id)
        fetch(base_url+'/add_room',{
            method:"POST",
            body:formData
        })
        .then(res=>res.json())
        .then(data=>{
            Alert.alert('Added Successfully')
        })
        .catch(err=>{
            Alert.alert('Something Went Wrong')
        })
    }

    return (
        <View style={styles.container}>
        <TextInput placeholder='Room Name' onChangeText={(val)=> setRoomName(val)} style={{ borderWidth:1,borderColor:'black',padding:10,width:'80%',marginTop:50 }}/>


        <TouchableOpacity onPress={() => add_group()} style={styles.btn}>
            <Text style={{color:"black"}}>Add</Text>
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

export default AddRoom;