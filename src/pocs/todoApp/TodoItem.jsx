// src/pocs/todoApp/TodoItem.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const TodoItem = ({ todo, toggleTodo }) => (
  <TouchableOpacity onPress={() => toggleTodo(todo.id)}>
    <View style={styles.item}>
      <Text style={[styles.text, todo.completed && styles.completed]}>
        {todo.title}
      </Text>
    </View>
  </TouchableOpacity>
);

export default TodoItem;

const styles = StyleSheet.create({
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  text: {
    fontSize: 18,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: 'grey',
  },
});
