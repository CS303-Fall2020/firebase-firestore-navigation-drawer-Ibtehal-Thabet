import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { TouchableOpacity, Text } from 'react-native';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import UserScreen from '../screens/UserScreen';
import Loading from '../screens/Loading';
import Todo from '../screens/todo';
import Profile from '../screens/Profile';
import Header from '../components/header';

import * as firebase from 'firebase';
import 'firebase/auth'
import 'firebase/database'


const signOutUser = () => {
    firebase.auth().signOut();
}

const screens = {
    Loading: {
        screen: Loading,
        navigationOptions: {
            title: '',
            headerLeft: null,
        } 
    },
    Login: {
        screen: LoginScreen,
        navigationOptions: {
            title: 'Login',
            headerLeft: null,
        } 
    },
    Signup: {
        screen: SignupScreen,
        navigationOptions: {
            title: 'Signup',
            headerLeft: null,
        } 
    },
    ForgotPassword: {
        screen: ForgotPasswordScreen,
        navigationOptions: {
            title: 'ForgetPassword',
            headerLeft: null,
        } 
    },
    // Todo: {
    //     screen: Todo,
    //     navigationOptions: ({ navigation }) => {
    //         return {
    //         headerTitle: () => <Header navigation={navigation} />,
    //         headerLeft: null,
    //         headerRight: (
    //             <TouchableOpacity style={{marginHorizontal: 22}}
    //                 onPress={signOutUser}>
    //                   <Text style={{fontSize: 18 ,fontWight: 'bold', 
    //                   textDecorationLine: 'underline', color:'white'}}>Signout</Text>
    //               </TouchableOpacity>
    //         ),
    //         headerTitleStyle: {
    //             fontSize: 'normal',
    //         },
    //     }
    //     } 
    // },
    // Profile: {
    //     screen: Profile,
    //     navigationOptions: {
    //         title: 'Profile',
    //     }    
    // }
}

const HomeStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: 'white',
        headerStyle: { backgroundColor: 'green', height: 90, }
    }
}, {
    initialRouteName: 'LoginScreen',
  });

export default createAppContainer(HomeStack); 