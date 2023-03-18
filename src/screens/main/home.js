import React, {useState, useEffect} from 'react'
import {View,Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native'
import base_url from '../../base_url';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = (props) => {
    const [data, setData] = useState([])
    const [users, setUsers] = useState([])

    const logout = ()=>{
        props.navigation.reset({
            index: 0,
            routes: [{ name: 'login'}]
        });
    }

    const getAllRooms = () =>{
        fetch(base_url+'/get_all_rooms',{
            method:'GET'
        })
        .then(res=>res.json())
        .then(data=>{
            setData(data.data);
        })
    }


    const getAllUsers = async() => {
        const user = await AsyncStorage.getItem("user")
        const parse = JSON.parse(user)
        fetch(base_url+'/get_users?my_id='+parse.id,{
            method:"GET",
            
        })
        .then(res=>res.json())
        .then(users=>setUsers(users.data));
    }

    useEffect(() => {
        getAllRooms()
        getAllUsers()

        props.navigation.addListener('focus',()=>{
            getAllRooms()
            getAllUsers()
        })
    },[]);
    

    return(
        <ScrollView >
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <TouchableOpacity onPress={()=>props.navigation.navigate('favorite_messages')} style={styles.top_btn}>
                <Text style={{color:'black',fontSize:12}}>Favorite Messages</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => logout()} style={styles.top_btn}>
                <Text style={{color:'black',fontSize:12}}>Logout</Text>
            </TouchableOpacity>
        </View>



    <View style={styles.container}>
        {data.map((room,index)=>{
            return <TouchableOpacity key={index} onPress={()=>props.navigation.navigate('room chatting',{room_id:room.room_id})} style={styles.rooms_containers}>
            <Text style={{color:"black",textAlign:'center'}}>{room.room_name}</Text>
        </TouchableOpacity>
        })}
            

         

           
    </View>
    <TouchableOpacity onPress={() => props.navigation.navigate('add room')} style={styles.btn}>
        <Text style={{color:"black"}}>Add Room</Text>
    </TouchableOpacity>   

    <View style={{marginTop:50,backgroundColor:"skyblue"}}>
      <Text style={{color:"black",fontSize:13,marginLeft:10}}>One to one chat</Text>  
    </View>

        {users.map((user,index)=>{
            return   <TouchableOpacity key={index} onPress={() => props.navigation.navigate('chatting',{user_id:user.id})} style={styles.user_container}>
            <Text style={{color:'black',fontSize:13}}>{user.name}</Text>
        </TouchableOpacity>
        })}
  

  
        <View style={{marginTop:80}}>

        </View>

        </ScrollView>
)
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:20,
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'space-between',
       
    },
    rooms_containers:{
        width:'45%',
        padding:10,
        justifyContent:'center',
        height:200,
        borderWidth:1,
        borderColor:"blue",
        marginTop:10
    },
    btn:{
        width:200,
        height:50,
        padding:10,
        justifyContent:'center',
        alignItems:'center',
        borderColor:"skyblue",
        borderWidth:1,
        borderRadius:2,
        marginTop:20,
        backgroundColor:"skyblue",
        marginLeft:20
       
    },
    top_btn:{
        width:200,
        height:50,
        padding:10,
        justifyContent:'center',
        alignItems:'center',
        borderColor:"skyblue",
        borderWidth:1,
        borderRadius:2,
        marginTop:20,
        backgroundColor:"skyblue",
       
    },
    user_container:{
        width:'90%',
        padding:10,
        
        height:40,
        borderWidth:1,
        borderColor:"blue",
        marginTop:10,
        alignSelf:'center',

    }
})

export default Home;