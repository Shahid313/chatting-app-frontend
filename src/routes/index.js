import React from 'react'
import {View,Text} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/main/home';
import Login from '../screens/auth/login';
import Register from '../screens/auth/register';
import Splash from '../screens/splash';

import Chatting from '../screens/main/chatting';
import OtherUserAccount from '../screens/main/other_user_account';
import FavoriteMessages from '../screens/main/favorite_messages';

import AddRoom from '../screens/main/add_room';
import RoomChatting from '../screens/main/room_chatting';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

export default class Routes extends React.Component {
    render(){
        return(
            <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="splash" component={Splash} options={{headerShown:false}}/>

              <Stack.Screen name="home" component={Home} />
              <Stack.Screen name="room chatting" component={RoomChatting} />
              <Stack.Screen name="chatting" component={Chatting} />
              <Stack.Screen name="other_user_account" component={OtherUserAccount} options={{ headerTitle:'User Account' }} />
              <Stack.Screen name="favorite_messages" component={FavoriteMessages} />
              <Stack.Screen name="add room" component={AddRoom} />

              <Stack.Screen name="login" component={Login} />
              <Stack.Screen name="register" component={Register} />

            </Stack.Navigator>
          </NavigationContainer>
        )
    }
}