import React, { useState, useEffect, Component } from "react";
import axios from 'axios';
import { StyleSheet, Text, View, FlatList, Alert, TouchableWithoutFeedback,
ActivityIndicator, AsyncStorage, Keyboard, Button } from "react-native";
import { ListItem } from 'react-native-elements';
import TodoItem from "../components/todoItem";
import AddTodo from "../components/addTodo";

import * as firebase from 'firebase';
import 'firebase/firestore';
import { decode, encode } from "base-64"; 

export default function Todo({ route, navigation }) {
  if (!global.btoa) {global.btoa = encode;} 
  if (!global.atob) {global.atob = decode;}

  const [todos, setTodos] = useState([]);
  // const [todo, setTodo] = useState('');
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(firebase.auth().currentUser.uid)

  var db = firebase.firestore();

  useEffect(() => {
    // setLoading(false);
    // onRefresh();
    
  })

  // useEffect(() => {
  //   return ref.onSnapshot((querySnapshot) => {
  //     const list = [];
  //     querySnapshot.forEach(doc => {
  //       const { title, completed } = doc.data();
  //       list.push({
  //         id: doc.id,
  //         title,
  //         completed,
  //       });
  //     });

  //     setTodos(list);

  //     if (loading) {
  //       setLoading(false);
  //     }
  //   });
  // }, []);

  // async function toggleComplete() {
  //   await firestore()
  //     .collection('todos')
  //     .doc(id)
  //     .update({
  //       completed: !completed,
  //     });
  // }

  const getData = () => {
    db.collection("Todos").where("userId", "==", userId).get()
      .then((querySnapshot) => {
        setLoading(false);
        setTodos([]);
        querySnapshot.forEach((doc) => {
          console.log(doc.data())
          setTodos((prevTodos) => {
            return [doc.data(), ...prevTodos]
          })
        });
      }).catch((error) => console.log(error))
  
  }
  
  const onRefresh = () => {
    setLoading(true);
    db.collection("Todos").where("userId", "==", userId).get()
      .then((querySnapshot) => {
        setLoading(false);
        setTodos([]);
        querySnapshot.forEach((doc) => {
          console.log(doc.data())
          setTodos((prevTodos) => {
            return [doc.data(), ...prevTodos]
          })
        });
      }).catch((error) => console.log(error))
  }

  const pressHandler = id => {
      db.collection("Todos").doc(id).delete()
      .then(function() {
        console.log("Document successfully deleted!");
      })
      .catch(function(err) {
        console.log("Error removing document: ", err)
      });
      setTodos(prevTodos => {   
        return [...prevTodos.filter(todo => todo.id != id)];
    });
  };

  const pressHandler1 = item => {
    navigation.navigate('ReviewDetails', {item, edit});
    //navigation.push('ReviewDetails');
  }

  const onCheck = id => { 
    setTodos(prevTodos => {
      prevTodos.filter(todo => {
        prevTodos = (todo.id != id) 
          db.collection("Todos").doc(todo.id).update({
          completed: !prevTodos.completed
          })
        return prevTodos;
      });
    });
  };

  const submitHandler = (title)  => {
    if (title.length > 3) {
      let todo = {
        userId: userId,
        id: Math.random().toString(),
        title: title,
        completed: false,       
        date: Date.now().toString()
      }
      db.collection("Todos").add(todo)
        .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
        .catch(function(error) {
        console.error("Error adding document: ", error)
      });
      todo.id = Math.random().toString();
      setTodos(prevTodos => {
        return [todo, ...prevTodos];
      });
    } else {
      Alert.alert("OOPS!", "Todos must over 3 chars long", [
        { text: "Understood", onPress: () => console.log("alert closed") }
      ]);
    }
  };
 
  const edit = (id, title) => {
    setTodos(prevTodos => {
      return prevTodos.filter(todo => {
        if((todo.id != id) == false) {
         db.collection('Todos').doc(id).update({
        //  completed: !completed,
        title: todo.title,
       });
          // todo.title = title;
      }
        return true;
      });
    })
    navigation.navigate('Todo')
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        console.log("dismissed keyboard");
      }}>
        {(loading)? (
            <ActivityIndicator size="large" color="green" />
          ):(
          <View style={styles.container}>
          <View style={styles.contant}>
            <AddTodo submitHandler={submitHandler} />
             <View style={styles.list}>              
              <FlatList
                  data={todos}
                  renderItem={({ item }) => (
                    // <TouchableOpacity onPress={() => navigation.navigate('ReviewDetails', item)}>
                    <TodoItem item={item} pressHandler={pressHandler} pressHandler1={pressHandler1}
                    onCheck={onCheck} edit={edit} />
                    // </TouchableOpacity>
                  )}
                />           
            </View> 
            <Button title='Refresh' onPress={onRefresh} color='green' />          
            </View>       
        </View>
        )}
    </TouchableWithoutFeedback>
                
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  contant: {
    padding: 30,
    // backgroundColor: "#666",
    flex: 1,
  },
  list: {
    marginTop: 20,
    flex: 1,

  }
});
