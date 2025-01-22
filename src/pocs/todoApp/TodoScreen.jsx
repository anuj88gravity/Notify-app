// src/pocs/todoApp/TodoScreen.js
import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button } from 'react-native';
import TodoList from './TodoList';

const TodoScreen = () => {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState('');

  const addTodo = () => {
    setTodos([...todos, { id: Date.now(), title: todoText, completed: false }]);
    setTodoText('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Add a new todo"
        value={todoText}
        onChangeText={setTodoText}
      />
      <Button title="Add Todo" onPress={addTodo} />
      <TodoList todos={todos} toggleTodo={toggleTodo} />
    </View>
  );
};

export default TodoScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  input: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
  },
});
