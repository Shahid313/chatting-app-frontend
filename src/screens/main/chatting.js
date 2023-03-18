import React, {useEffect, useState} from 'react'
import {View,Text, ScrollView,Alert, Button,TextInput,StyleSheet,Image,TouchableOpacity} from 'react-native'
import base_url from '../../base_url'
import Message from '../../components/message'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Chatting = (props) => {
    const [chat, setChat] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        getAllMessages()
        setInterval(()=>{
        getAllMessages()
            
        },20000)
        props.navigation.addListener('focus',()=>{
            getAllMessages()

        })
    }, [])

    const InsertMessage = async () => {
        const user = await AsyncStorage.getItem('user')
        const user_id = await props.route.params.user_id

        const parse = JSON.parse(user)
        if(chat.length<1){
            return false
        }
        let formData = new FormData()
        formData.append("my_id",parse.id)
        formData.append("user_id",user_id)

        formData.append('msg',chat)
      
        fetch(base_url+"/insert_message",{
            method:"POST",
            body:formData
        })
        .then(res=>res.json())
        .then(status=>{
            getAllMessages()
        })
        .catch(err=>{
            Alert.alert("Somthing Went Wrong")
        })

    }


    const getAllMessages = async() => {
        const user = await AsyncStorage.getItem('user')
        const user_id = await props.route.params.user_id

        const parse = JSON.parse(user)
        fetch(base_url+'/get_messages?user_id='+user_id+'&&my_id='+parse.id)
        .then(res=>res.json())
        .then(msgs=>{
            console.log(msgs)
            setMessages(msgs.data)
        })
    }
    return(
        <View style={{flex:1}}>

            <ScrollView>
                  {messages.map((msg,index)=>{
                    return <Message key={index} navigation={props.navigation} screen="chatting" message_id={msg.message_id} msg={msg}/>
                  })}

                  
                    <View style={{marginBottom:80}}>

                    </View>
                </ScrollView>

            <View style={{  position: 'absolute', bottom:0,marginBottom:10,width:'80%',marginLeft:5,flexDirection:'row',justifyContent:"space-between",backgroundColor:"white"}}>
            
                <TextInput placeholder='Write Something..' onSubmitEditing={() => InsertMessage()} onChangeText={(val)=> setChat(val)} style={{borderWidth:1,borderColor:"black",width:'100%',padding:10}}/>
                <Button title='Submit'onPress={() => InsertMessage()} />
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

export default Chatting;