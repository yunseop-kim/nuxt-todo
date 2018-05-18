<template>
  <div>
    <h4>{{$store.state.todos.test}}</h4>
    <ul>
      <li v-for="(todo, index) in todos" :key="todo.text">
        <input type="checkbox" :checked="todo.done" @change="toggle(todo)">
        <input v-if="selected === index" type="text" v-model="editText" @keyup.enter="edit(todo)">
        <span v-else :class="{ done: todo.done }" @click="focus(index, todo)">{{ todo.text }}</span>
        <button @click="remove(todo)">delete</button>
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
    focus(index, todo) {
      console.log("focus");
      this.selected = index;
      this.editText = todo.text;
    },
    // doneEdit, cancelEdit, @blur="doneEdit(todo)"
    edit(todo) {
      // todo.text = this.editText
      this.$store.commit('todos/edit', {todo, editText: this.editText})
      this.selected = -1
    },
    remove(todo) {
      this.$store.commit('todos/remove', todo)
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
