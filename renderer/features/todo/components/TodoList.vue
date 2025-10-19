<template>
  <div>
    <input v-model="newTodo" placeholder="New Todo" @keyup.enter="addTodo" />
    <button @click="addTodo">Add</button>

    <ul>
      <TodoItem v-for="todo in todos" :key="todo.id" :todo="todo" @remove="removeTodo" />
    </ul>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import TodoItem from './TodoItem.vue';
import { useTodoStore } from '../model/todoStore';

const store = useTodoStore();
const newTodo = ref('');

const addTodo = () => {
  if (newTodo.value.trim()) {
    store.addTodo(newTodo.value.trim());
    newTodo.value = '';
  }
};

const removeTodo = (id) => store.removeTodo(id);

const todos = store.todos;
</script>
