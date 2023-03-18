import React,{useEffect, useState} from 'react'
import {View,Text,StyleSheet} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = (props) => {

    useEffect(() => {
        setTimeout(()=>{
            isLoggedIn()
        },500)
    },[])

    const isLoggedIn = async () => {
        const user = await AsyncStorage.getItem('user')
        const parse = JSON.parse(user)
        if(parse == null){
            props.navigation.reset({
                index: 0,
                routes: [{ name: 'login'}]
            });
        }else{
            props.navigation.reset({
                index: 0,
                routes: [{ name: 'home'}]
            });
        }
        
    }

    return (
        <View style={styles.container}>
            <Text style={{color:"black",fontSize:18}}>Chatting App </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }
})

export default Splash;