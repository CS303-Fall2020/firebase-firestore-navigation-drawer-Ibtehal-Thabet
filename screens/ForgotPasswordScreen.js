import React from 'react';
import { StyleSheet, Text, TextInput, View, TouchableWithoutFeedback, Button, Keyboard, Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';
import * as firebase from 'firebase'

export default class ForgetPasswordScreen extends React.Component {
    
    state = { email: '', password: '', errorMessage: null};

    onResetPasswordPress = () => {
        firebase.auth().sendPasswordResetEmail(this.state.email)
            .then(() => {
                this.setState({ errorMessage: 'Email was sent successfully, please follow instructions to reset your pssword.' })
            }, (error) => {
                if(this.state.email == '')
                  Alert.alert('Error', 'Invalid credentials!', [{text: 'dismess'}]);        
                else if(error.message == 'The email address is badly formatted.')
                    Alert.alert('auth/invalid-email', error.message, [{text: 'dismess'}]);
                else if(error.message == 'There is no user record corresponding to this identifier. The user may have been deleted.'){
                    Alert.alert('auth/user-not-found', error.message, [{text: 'dismess'}])
                }    
                else 
                    Alert.alert(error.message);
                
            });
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
            <View style={styles.contant}>
                <Text style={styles.greeting}>Forgot Password?</Text>               
             <TextInput
              placeholder="Email" 
              autoCapitalize="none" 
              style={styles.textInput} 
              onChangeText={email => this.setState({ email })}
              value={this.state.email} />

                {this.state.errorMessage && 
                <Text style={{ color: 'black' }}>
                {this.state.errorMessage} </Text>}

             
              <Button title="Send Reset Email" color="seagreen" onPress={this.onResetPasswordPress} />
                <View style={styles.listlogin}>
                 <Button title="Signup" color="green"
                 onPress={() => this.props.navigation.navigate('Signup')} />
                </View>
                <View style={styles.listforget}>
                 <Button title="Login" color="green"
                 onPress={() => this.props.navigation.navigate('Login')} />
                </View>
            </View>
            </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        flex: 1,
    },
    contant: {
        padding: 30,
        // backgroundColor: "#666",
        flex: 1,
    },
    greeting: {
        marginTop: 5,
        fontSize: 18,
        fontWeight: "400",
        
    },
    listlogin: {
        marginTop: 80,
        flex: 1,    
    },
    listforget: {
        marginTop: 1,
        flex: 1,    
    },
    textInput: {
        height: 40,
        width: '100%',
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        marginTop: 6,
        marginBottom: 10,
    }
});