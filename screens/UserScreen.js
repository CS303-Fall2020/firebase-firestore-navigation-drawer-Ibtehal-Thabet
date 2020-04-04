import React from 'react';
import { StyleSheet, Text, TextInput, View, TouchableWithoutFeedback, Button, Keyboard } from 'react-native';

import * as firebase from 'firebase'

export default class UserScreen extends React.Component {
    state = { currentUser: null };
    componentDidMount() {
        const { currentUser } = firebase.auth()
        this.setState({ currentUser });
    }

    signOutUser = () => {
        firebase.auth().signOut();
        // this.props.navigation.navigate('Login')
    }

    render() {
        const { currentUser } = this.state;
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                    <Text style={{paddingTop:20, fontSize: 20, marginBottom: 30}}>
                        Welcome {currentUser && currentUser.email}
                    </Text>
                    <View style={{paddingTop: 30}} />
                    <Button title="Signout" color="green" onPress={this.signOutUser} />
            </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    
})    