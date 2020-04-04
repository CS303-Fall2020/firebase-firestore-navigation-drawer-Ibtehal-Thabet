import React from 'react';
import { StyleSheet, Text, TextInput, View, TouchableWithoutFeedback, Button, Keyboard, Alert } from 'react-native';

import * as firebase from 'firebase'

export default class SignupScreen extends React.Component {
    
    state = { email: '', password: '', passwordConfirm: '', errorMessage: null};

    handleSignup = () => {
        if (this.state.password !== this.state.passwordConfirm) {
            Alert.alert("Passwords do not match");
            return;
        }
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => this.props.navigation.navigate('User'))
        .catch(error => { 
            if(this.state.email == '' && this.state.password == '' && this.state.passwordConfirm == '')
                 Alert.alert('Error', 'Invalid credentials!', [{text: 'dismess'}]);                       
           else  if(error.message == 'The email address is already in use by another account.')
                Alert.alert('auth/email-already-in-use', error.message, [{text: 'Dismess'}]);
            else if(error.message == 'The email address is badly formatted.') { 
                Alert.alert('auth/invalid-email', error.message, [{text: 'dismess'}]); }
        })
        
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
            <View style={styles.contant}>
                <Text style={styles.greeting}>Signup</Text>               

             <TextInput
              placeholder="Email" 
              autoCapitalize="none" 
              style={styles.textInput} 
              onChangeText={email => this.setState({ email })}
              value={this.state.email} 
              autoCorrect={false} />

            <TextInput
              secureTextEntry
              placeholder="Password" 
              autoCapitalize="none" 
              style={styles.textInput} 
              onChangeText={password => this.setState({ password })}
              value={this.state.password} 
              autoCorrect={false} />
              
              <TextInput
              secureTextEntry
              placeholder="Confirm Password" 
              autoCapitalize="none" 
              style={styles.textInput} 
              onChangeText={passwordConfirm => this.setState({ passwordConfirm })}
              value={this.state.passwordConfirm} 
              autoCorrect={false} />
             
             {this.state.errorMessage && 
             <Text style={{ color: 'red' }}>
             {this.state.errorMessage} </Text>}

              <Button title="Signup" color="seagreen" onPress={this.handleSignup} />
               
                <View style={styles.listlogin}>
                 <Button title="Login" color="green"
                 onPress={() => this.props.navigation.navigate('Login')} />
                </View>
                <View style={styles.listforget}>
                 <Button title="Forgot Password" color="green"
                 onPress={() => this.props.navigation.navigate('ForgotPassword')} />
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