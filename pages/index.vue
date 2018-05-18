<template>
  <div>
    <h4>{{$store.state.todos.test}}</h4>
    <ul>
      <li v-for="(todo, index) in todos" :key="todo.text">
        <input type="checkbox" :checked="todo.done" @change="toggle(todo)">
        <input v-if="selected === index" type="text" v-model="editText" @keyup.enter="edit">
        <span v-else :class="{ done: todo.done }" @click="selectToEdit(index, todo)">{{ todo.text }}</span>
        <button>delete</button>
      </li>
      <li><input placeholder="What needs to be done?" @keyup.enter="addTodo"></li>
    </ul>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import axios from 'axios';
export default {
  data () {
    return {
      selected: -1,
      editText: ""
    }
  },
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
    selectToEdit(index, todo) {
      console.log("selectToEdit");
      this.selected = index;
      this.editText = todo.text;
    },
    edit(e) {
      // this.$store.commit('todos/edit', e.target.value)
      this.selected = -1
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
