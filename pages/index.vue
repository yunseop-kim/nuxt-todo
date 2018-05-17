<template>
  <div>
    <h4>{{$store.state.todos.test}}</h4>
    <ul>
      <li v-for="todo in todos" :key="todo.text">
        <input type="checkbox" :checked="todo.done" @change="toggle(todo)">
        <span :class="{ done: todo.done }">{{ todo.text }}</span>
      </li>
      <li><input placeholder="What needs to be done?" @keyup.enter="addTodo"></li>
    </ul>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import axios from 'axios';
export default {
  computed: {
    todos () { return this.$store.state.todos.list }
  },
  async fetch({ store, params }) {
    let { data } = await axios.get('http://localhost:3000/api/todo')
    store.commit('todos/setTest', data);
  },
  methods: {
    addTodo (e) {
      this.$store.commit('todos/add', e.target.value)
      e.target.value = ''
    },
    ...mapMutations({
      toggle: 'todos/toggle'
    })
  }
}
</script>

<style>
.done {
  text-decoration: line-through;
}
</style>
