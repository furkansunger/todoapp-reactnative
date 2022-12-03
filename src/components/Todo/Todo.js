import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from './Todo.styles';

const Todo = props => {
  return (
    <TouchableOpacity
      onLongPress={() => props.onLongPress(props.todo.item.id)}
      onPress={() => props.onPress(props.todo.item.id)}
      style={
        props.todo.item.completed
          ? styles.completedTodoContainer
          : styles.container
      }>
      <Text
        style={
          props.todo.item.completed ? styles.completedTodoText : styles.todoText
        }>
        {props.todo.item.text}
      </Text>
    </TouchableOpacity>
  );
};

export default Todo;
