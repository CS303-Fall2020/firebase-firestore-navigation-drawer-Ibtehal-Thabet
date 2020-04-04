import React from 'react';
import { StyleSheet, Text, View} from 'react-native';

export default function ProfileHeader({ navigation }) {

    return(
        <View style={styles.header}>
            <View>
            <Text style={styles.title}>Profile</Text> 
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: 350,
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'green',
    },
    title: {
        textAlign: 'center',       
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
        letterSpacing: 1,
    },
    icon: {
        position: 'absolute',
        left: 16,
        color:'white',
        justifyContent: 'space-between',
    },
});