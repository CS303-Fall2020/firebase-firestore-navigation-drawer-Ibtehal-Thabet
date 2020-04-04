import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Alert, FlatList, Button, Keyboard } from "react-native";
import TodoItem from "../components/todoItem";

  export default function ReviewDetails({ navigation }) {
    const [title, setText] = useState(navigation.getParam('item').title);

  const changeHandler = val => {
    setText(val);
  };

  const edi = navigation.getParam('edit');

    return (
      <View style={styles.detail}>
        <View style={styles.contant}>
           <TextInput style={styles.input} 
            onChangeText={changeHandler}
             defaultValue={navigation.getParam('item').title }
            />
            <Button onPress={() => edi(navigation.getParam('item').id, title)}
              title='done' color='green' />             
        </View>
      </View>
      )
  }

const styles = StyleSheet.create({
    detail: {
      flex: 1,
      padding: 10,
    },
    contant: {
        padding: 40,
        // backgroundColor: "#666",
        flex: 1
    },
    list: {
        marginTop: 28,
        flex: 1 
    
      },
})   