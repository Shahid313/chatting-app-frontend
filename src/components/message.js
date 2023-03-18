import React from 'react'
import {View,Text, ScrollView, Button,TextInput, StyleSheet,Image, TouchableOpacity, Alert} from 'react-native'
import base_url from '../base_url'
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class Message extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            is_favorite:false,
            user_id:""
        }
        this.check_is_favorite()
    }

    check_is_favorite = ()=>{
        console.log(this.props.msg)
        if(this.props.msg.is_favorite == 1){
            this.setState({is_favorite:true})
        }else{
            this.setState({is_favorite:false})

        }
    }

    get_userID = async()=>{
        const user = await AsyncStorage.getItem('user')
        const parse = JSON.parse(user)
        this.setState({user_id:parse.id})
    }

    favorite_or_unfavorite_message = async()=>{
        const user = await AsyncStorage.getItem("user")
        const parse = JSON.parse(user)
        if(this.state.is_favorite){
            this.setState({is_favorite:false})

        }else{
            this.setState({is_favorite:true})

        }
        let formData = new FormData()
        formData.append('msg_id',this.props.message_id)
        formData.append('user_id',parse.id)

        fetch(base_url+'/favorite_or_unfavorite_message',{
            method:'POST',
            body:formData
        })
        .then(res=>res.json())
        .then(status=>{})
        .catch(err=>{
            Alert.alert("Something Went Wrong")
        })
    }


    favorite_or_unfavorite_room_message = async()=>{
        const user = await AsyncStorage.getItem("user")
        const parse = JSON.parse(user)
        if(this.state.is_favorite){
            this.setState({is_favorite:false})

        }else{
            this.setState({is_favorite:true})

        }
        let formData = new FormData()
        formData.append('msg_id',this.props.message_id)
        formData.append('user_id',parse.id)

        fetch(base_url+'/favorite_or_unfavorite_room_message',{
            method:'POST',
            body:formData
        })
        .then(res=>res.json())
        .then(status=>{})
        .catch(err=>{
            Alert.alert("Something Went Wrong")
        })
    }



    componentDidMount(){
        console.log("Message")
        console.log(this.props.msg.id)
        this.check_is_favorite()
        this.get_userID()
    }

    render(){
        return   <View  style={this.props.msg.id==this.state.user_id || this.props.msg.sended_by==this.state.user_id?styles.my_messege:styles.other_user_messege}>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <View style={{flexDirection:'row'}}>

           <TouchableOpacity disabled={this.props.msg.id==this.state.user_id || this.props.msg.sended_by==this.state.user_id?true:false} onPress={()=>this.props.navigation.navigate('other_user_account',{user_id:this.props.msg.id,name:this.props.msg.name, profile_image:this.props.msg.profile_image})} style={{borderColor:'blue',borderWidth:1,backgroundColor:'white',width:30,height:30,borderRadius:30,justifyContent:'center',alignItems:'center'}}>
           <Image style={{width:'100%', height:'100%'}} source={{uri:base_url+'/static/uploads/'+this.props.msg.profile_image}}/>
           </TouchableOpacity>
           <Text style={{fontSize:12,color:'black',marginTop:10,marginLeft:5}}>{this.props.msg.name}</Text>
          </View>

          <TouchableOpacity onPress={()=>{
            if(this.props.screen == "chatting"){
                this.favorite_or_unfavorite_message()
            }else{
                this.favorite_or_unfavorite_room_message()
            }
          }}>
           <Image source={this.state.is_favorite?require('../assets/red_heart.png'):require('../assets/black_heart.png')} style={{ width:25,height:20 }}/>
          </TouchableOpacity>

       </View>
         
           <Text style={{color:"black"}}>{this.props.msg.message}</Text>
   </View>
    }
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