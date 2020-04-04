import React from 'react';
import { createDrawerNavigator, DrawerActions, DrawerItems } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import HomeStackk from './homeStackk';
import ProfileStack from './profileStack';
import { SafeAreaView, View, Text, Button } from 'react-native';

import * as firebase from 'firebase';

const signOutUser = () => {
    firebase.auth().signOut();
}

const DrawerWithLogoutButton = (props) => (
    <View contentContainerStyle={{flex: 1,  flexDirection: 'column', justifyContent: 'space-between' }}>
      <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
        <DrawerItems {...props} />
      </SafeAreaView>      
        <Button title='SignOut' onPress={signOutUser} color='green' />
    </View>
  );

const RootDrawerNavigator = createDrawerNavigator({
    Todo: {
        screen: HomeStackk, 
    },
    Profile: {
        screen: ProfileStack,
    },
},
    {
        initialRouteName: "Todo",
        contentComponent: DrawerWithLogoutButton,
    },
);

export default createAppContainer(RootDrawerNavigator);