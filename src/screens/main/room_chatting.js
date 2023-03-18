import React, {useEffect, useState} from 'react'
import {View,Text, ScrollView, Button,TextInput, StyleSheet,Image, TouchableOpacity, Alert} from 'react-native'
import base_url from '../../base_url'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Message from '../../components/message';

const RoomChatting = (props) => {
    const [chat, setChat] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        getAllRoomMessages()
        setInterval(()=>{
            getAllRoomMessages()
                
            },20000)
        props.navigation.addListener('focus',()=>{
            getAllRoomMessages()

        })
    }, [])

    const InsertRoomMessage = async()=>{
        const user = await AsyncStorage.getItem('user')
        const room_id = await props.route.params.room_id

        const parse = JSON.parse(user)
        if(chat.length<1){
            return false
        }
        let formData = new FormData()
        formData.append("user_id",parse.id)
        formData.append('msg',chat)
        formData.append('room_id',room_id)
        fetch(base_url+"/insert_room_message",{
            method:"POST",
            body:formData
        })
        .then(res=>res.json())
        .then(status=>{
            getAllRoomMessages()
        })
        .catch(err=>{
            Alert.alert("Somthing Went Wrong")
        })

    }

    const getAllRoomMessages = async()=>{
        const user = await AsyncStorage.getItem('user')
        const room_id = await props.route.params.room_id
        const parse = JSON.parse(user)
        fetch(base_url+"/get_room_messages?user_id="+parse.id+"&&room_id="+room_id)
        .then(res=>res.json())
        .then(data=> {
            console.log(data.data)
            setMessages(data.data)
        }
            )
    }


    return (
        <View style={{flex:1}}>

                <ScrollView>
                    {messages.map((msg,index)=>{
                        return  <Message key={index} screen="room_chatting" navigation={props.navigation} message_id={msg.room_message_id} msg={msg}/>
                    })}
          

                 
                  
                    <View style={{marginBottom:80}}>

                    </View>
                </ScrollView>

            <View style={{  position: 'absolute', bottom:0,marginBottom:10,width:'80%',marginLeft:5,flexDirection:'row',justifyContent:"space-between",backgroundColor:"white"}}>
            
                <TextInput placeholder='Write Something..' onSubmitEditing={() => InsertRoomMessage()} onChangeText={(val)=> setChat(val)} style={{borderWidth:1,borderColor:"black",width:'100%',padding:10}}/>
                <Button title='Submit' onPress={() => InsertRoomMessage()}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    my_messege:{
        backgroundColor:"skyblue",
        width:'70%',
        padding:10,
        borderWidth:1,
        borderColor:"skyblue",
        marginLeft:10,
        marginTop:10

    },
    other_user_messege:{
        backgroundColor:"white",
        width:'70%',
        padding:10,
        borderWidth:1,
        borderColor:"white",
        marginLeft:'27%',
        marginTop:10
    }
})

export default RoomChatting;