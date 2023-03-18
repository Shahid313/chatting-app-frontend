import React, { useEffect, useState } from 'react'
import {View,Text, ScrollView, Button,TextInput, StyleSheet,Image, TouchableOpacity,Alert} from 'react-native'
import base_url from '../../base_url'
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoriteMessages = (props) => {
    const [messages, setMessages] = useState([]);
    const [room_messages, setRoomMessages] = useState([]);

    const getFavoriteMessages = async()=>{
        const user = await AsyncStorage.getItem('user')
        const parse = JSON.parse(user)
        fetch(base_url+"/get_favorite_msgs?user_id="+parse.id)
        .then(res=>res.json())
        .then(msgs=>{
            console.log(msgs)
            setMessages(msgs.data)
            
        })
    }

    const getRoomFavoriteMessages = async()=> {
        const user = await AsyncStorage.getItem('user')
        const parse = JSON.parse(user)
        fetch(base_url+"/get_room_favorite_msgs?user_id="+parse.id)
        .then(res=>res.json())
        .then(msgs=>{
            console.log(msgs)
            setRoomMessages(msgs.data);
            
        })
    }

    const unfavorite_message = (id)=>{
        let formData = new FormData()
        formData.append('favorite_id',id)
        fetch(base_url+'/unfavorite_message',{
            method:'POST',
            body:formData
        })
        .then(res=>res.json())
        .then(status=>{
            getFavoriteMessages()
        })
        .catch(err=>{
            Alert.alert("Something Went Wrong")
        })
    }


    const unfavorite_room_message = (id)=>{
        let formData = new FormData()
        formData.append('favorite_id',id)
        fetch(base_url+'/unfavorite_room_message',{
            method:'POST',
            body:formData
        })
        .then(res=>res.json())
        .then(status=>{
            getRoomFavoriteMessages()
        })
        .catch(err=>{
            Alert.alert("Something Went Wrong")
        })
    }

    useEffect(() => {
        getFavoriteMessages()
        getRoomFavoriteMessages()
        props.navigation.addListener('focus',()=>{
        getFavoriteMessages()
        getRoomFavoriteMessages()
        })

    },[])



    return (
        <View style={{flex:1}}>

                <ScrollView>
                
                <Text style={{color:"black",fontWeight:"bold",fontSize:17}}>One to one Messages</Text>
              
                    {messages.map((msg,index)=>{
                        return <View key={index} style={styles.my_messege}>


                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                          <Text> </Text>
    
                           <TouchableOpacity onPress={() => unfavorite_message(msg.favorite_id)}>
                            <Image source={require('../../assets/red_heart.png')} style={{ width:25,height:20 }}/>
                           </TouchableOpacity>
    
                        </View>
    
    
    
                            <Text style={{color:"black"}}>{msg.message}</Text>
                        </View>
                    })}


            <Text style={{color:"black",fontWeight:"bold",fontSize:17}}>Room Messages</Text>
              
              {room_messages.map((msg,index)=>{
                  return <View key={index} style={styles.my_messege}>


                  <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text> </Text>

                     <TouchableOpacity onPress={()=> unfavorite_room_message(msg.room_favorite_id)}>
                      <Image source={require('../../assets/red_heart.png')} style={{ width:25,height:20 }}/>
                     </TouchableOpacity>

                  </View>



                      <Text style={{color:"black"}}>{msg.message}</Text>
                  </View>
              })}
                    

                   
                    <View style={{marginBottom:80}}>

                    </View>
                </ScrollView>

        
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

export default FavoriteMessages;