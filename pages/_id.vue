<template>
  <div>
    <h4>Todo</h4>
    <div>id: {{$store.state.todos.todo.id}}</div>
    <div>text: {{$store.state.todos.todo.text}}</div>
    <div>done: {{$store.state.todos.todo.done}}</div>
    <div>createdAt: {{$store.state.todos.todo.createdAt}}</div>
    <div>updatedAt: {{$store.state.todos.todo.updatedAt}}</div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  validate ({ params }) {
    // Must be a number
    return /^\d+$/.test(params.id)
  },
  fetch ({ store, params }) {
    console.log("fetch:", params)
    return axios.get(`http://localhost:3000/api/todos/${params.id}`)
      .then((res) => {
        store.commit('todos/setTodo', res.data.todo)
      })
  },
  asyncData(context) {
    return {
      req: context.req,
      res: context.res,
      isClient: context.isClient
    };
  }
};
</script>
<style>
</style>
