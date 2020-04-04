import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { TouchableOpacity, Text } from 'react-native';
import Todo from '../screens/todo';
import ReviewDetails from '../screens/reviewDetails';
import Header from '../components/header';
import { MaterialIcons } from '@expo/vector-icons';

import * as firebase from 'firebase';

const signOutUser = () => {
    firebase.auth().signOut();
}

const screens = { 
    Todo: {
        screen: Todo,
        navigationOptions: ({ navigation }) => {
            return {
            headerTitle: () => <Header navigation={navigation} />,
            headerLeft: () => (
                <MaterialIcons name='menu' size={28} onPress={() => navigation.openDrawer()} style={{
                    position: 'absolute', left: 16, color:'white', justifyContent: 'space-between',
                }} />
            ),
            headerRight:() => (
                <TouchableOpacity style={{marginHorizontal: 22}}
                    onPress={signOutUser}>
                      <Text style={{fontSize: 18 ,fontWight: 'bold', 
                      textDecorationLine: 'underline', color:'white'}}>Signout</Text>
                  </TouchableOpacity>
            ),
            headerTitleStyle: {
                fontSize: 'normal',
            },
        }
        } 
    },    
    ReviewDetails: {
        screen: ReviewDetails,
        navigationOptions: {
            title: "Todo Details",
        },
    },
}

const HomeStackk = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: 'white',
        headerStyle: { backgroundColor: 'green', height: 90, }
    }
},
);

export default HomeStackk; 