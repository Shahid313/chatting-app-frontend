import React, {useEffect, useState} from 'react'
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage';

const OtherUserAccount = (props) => {
    return(
        <View style={styles.container}>
                <View style={{borderWidth:1,borderColor:"blue",width:100,height:100,borderRadius:50,justifyContent:'center',alignItems:'center',marginTop:30}}>
                    <Text style={{fontSize:25,fontWeight:'bold',color:'black'}}>{props.route.params.name[0]}</Text>
                </View>
                <Text style={{fontSize:25,color:'black',fontWeight:'bold'}}>{props.route.params.name}</Text>

                <TouchableOpacity onPress={()=>props.navigation.navigate('chatting',{user_id:props.route.params.user_id})} style={styles.btn}>
                <Text style={{color:"black"}}>Chat</Text>
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

export default OtherUserAccount;