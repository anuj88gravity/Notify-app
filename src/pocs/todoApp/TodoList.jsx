// src/pocs/todoApp/TodoList.js
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import TodoItem from './TodoItem';

const TodoList = ({ todos, toggleTodo }) => (
  <FlatList
    data={todos}
    keyExtractor={item => item.id.toString()}
    renderItem={({ item }) => <TodoItem todo={item} toggleTodo={toggleTodo} />}
  />
);

export default TodoList;

const styles = StyleSheet.create({
  list: {
    marginVertical: 20,
  },
});
