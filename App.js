import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Firebase from './config/Firebase'
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './routes/homeStack';
import Navigator from './routes/drawer';

import * as firebase from 'firebase';

export default class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {isLoading: false, isAuthenticationReady: false, isAuthenticated: false};

  if(!firebase.apps.length) {
    firebase.initializeApp(Firebase.FirebaseConfig);}
  
   firebase.auth().onAuthStateChanged(user => {
    this.setState({isAuthenticationReady: true});
    this.setState({isAuthenticated: !!user})
   });
  };

  render() {
    return (
      <NavigationContainer>
       {(this.state.isAuthenticated) ? <Navigator /> : <MainNavigator />}
      </NavigationContainer>
    )
  }
}