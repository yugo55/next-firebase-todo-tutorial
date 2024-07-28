'use client';

import { useEffect, useState } from 'react';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');

  useEffect(() => {
    const fetchTodos = async () => {
      const querySnapshot = await getDocs(collection(db, 'todos'));
      const todosArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Todo[];
      setTodos(todosArray);
    };

    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (newTodo.trim() === '') return;
    await addDoc(collection(db, 'todos'), { text: newTodo, completed: false });
    setNewTodo('');
    const querySnapshot = await getDocs(collection(db, 'todos'));
    const todosArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Todo[];
    setTodos(todosArray);
  };

  const updateTodo = async (id: string, completed: boolean) => {
    const todoDoc = doc(db, 'todos', id);
    await updateDoc(todoDoc, { completed });
    const querySnapshot = await getDocs(collection(db, 'todos'));
    const todosArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Todo[];
    setTodos(todosArray);
  };

  const deleteTodo = async (id: string) => {
    const todoDoc = doc(db, 'todos', id);
    await deleteDoc(todoDoc);
    const querySnapshot = await getDocs(collection(db, 'todos'));
    const todosArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Todo[];
    setTodos(todosArray);
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <button onClick={() => updateTodo(todo.id, !todo.completed)}>
              {todo.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => deleteTodo(todo.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}