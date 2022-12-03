import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import styles from './NewTodo.styles';

const NewTodo = props => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Yapılacak..."
        onChangeText={props.handleTodo}
        value={props.todo}
      />
      <TouchableOpacity style={styles.button} onPress={props.handlePress}>
        <Text style={styles.buttonText}>Kaydet</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NewTodo;
