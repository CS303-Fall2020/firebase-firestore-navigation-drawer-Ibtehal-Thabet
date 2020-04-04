import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableWithoutFeedback, Button, Keyboard, Alert } from 'react-native';

import * as firebase from 'firebase';

export default class LoginScreen extends React.Component {
    state = { email: '', password: '', errorMassage: null }
    
    handleLogin = () => {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => { })
        .catch(error => {
            if(this.state.email == '' && this.state.password == '')
                  Alert.alert('Error', 'Invalid credentials!', [{text: 'dismess'}]);        
                
            else if(error.message == 'The password is invalid or the user does not have a password.'){
                Alert.alert('auth/worng-password', error.message, [{text: 'dismess'}])
            }
            else if(error.message == 'There is no user record corresponding to this identifier. The user may have been deleted.'){
                Alert.alert('auth/user-not-found', error.message, [{text: 'dismess'}])
            }
            else if(error.message == 'The email address is badly formatted.') { 
                Alert.alert('auth/invalid-email', error.message, [{text: 'dismess'}]); }
            else {
                Alert.alert('auth/network-request-failed', error.message, [{text: 'dismess'}])
            }
            })
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <View style={styles.contant}>
                <Text style={styles.greeting}>Login</Text>
                
                <TextInput 
                  style={styles.textInput}
                  autoCapitalize="none"
                  placeholder="Email"
                  onChangeText={email => this.setState({ email })}
                  value={this.state.email} 
                  autoCorrect={false}/>
                
                <TextInput 
                 secureTextEntry
                 style={styles.textInput} 
                 placeholder="Password"
                 onChangeText={password => this.setState({ password })}
                 value={this.state.password}
                 autoCorrect={false} />

                {this.state.errorMassage && 
                 <Text style={{color: 'red'}}>
                    {this.state.errorMassage}    
                 </Text>}

                 <Button title="Login" color="seagreen" onPress={this.handleLogin} />
                <View style={styles.listsign}>
                 <Button title="Signup" color="green"
                 onPress={() => this.props.navigation.navigate('Signup')} />
                </View>
                <View style={styles.listforget}>
                 <Button title="Forgot Password" color="green"
                 onPress={() => this.props.navigation.navigate('ForgotPassword')} />
                </View>
                </View>
            </View>
            </TouchableWithoutFeedback>
        );
    }    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,       
    },
    contant: {
        padding: 30,
        // backgroundColor: "#666",
        flex: 1,
    },
    listsign: {
        marginTop: 80,
        flex: 1,    
    },
    listforget: {
        marginTop: 1,
        flex: 1,    
    },
    greeting: {
        marginTop: 5,
        fontSize: 18,
        fontWeight: "400",
        
    },
    inputTitle: {
        color: "#8A8F9E",
        fontSize: 10,
        textTransform: "uppercase"
    },
    textInput: {
        height: 40,
        width: '100%',
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        marginTop: 6,
        marginBottom: 10,
    },
});
