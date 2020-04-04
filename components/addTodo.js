import React, { useState } from "react";
import { StyleSheet, Text, TextInput, Button, View } from "react-native";

export default function AddTodo({ submitHandler }) {

  const [text, setText] = useState('');

  const changeHandler = val => {
    setText(val);
  };

  const pressHandler = () => {
    submitHandler(text);
    setText('');
  }

  return (
    <View>
      <TextInput
        style={styles.input}
        multiline minHeight={20} maxLength={100}
        placeholder="new todo..."
        onChangeText={changeHandler}
        value={text}
      />
      <Button onPress={pressHandler} title='add todo' color='green' /> 
    </View>
  );
}

const styles = StyleSheet.create({
    input: {
        marginBottom: 10,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    }
});
