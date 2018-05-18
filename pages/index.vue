<template>
  <div>
    <h4>{{$store.state.todos.test}}</h4>
    <ul>
      <li v-for="(todo, index) in todos" :key="todo.text">
        <input type="checkbox" :checked="todo.done" @change="toggle(todo)">
        <input
          :id="`edit-text-${index}`"
          type="text"
          v-show="selected === index"
          v-model="editText"
          @keyup.enter="doneEdit(todo)"
          @blur="doneEdit(todo)"
          @keyup.esc="cancelEdit(todo)">
        <span
          v-show="selected !== index"
          :class="{ done: todo.done }"
          @click.prevent="focus(index, todo)">{{ todo.text }}</span>
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
  mounted() {
    this.$store.dispatch('todos/getList');
  },
  computed: {
    todos () { return this.$store.state.todos.list }
  },
  methods: {
    addTodo (e) {
      this.$store.dispatch('todos/add', e.target.value);
      e.target.value = ''
    },
    focus(index, todo) {
      this.selected = index;
      this.editText = todo.text;
      this.$nextTick(() => {
        document.getElementById(`edit-text-${this.selected}`).focus();
      });
    },
    cancelEdit(todo) {
      this.selected = -1;
    },
    doneEdit(todo) {
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
