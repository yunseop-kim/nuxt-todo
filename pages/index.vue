<template>
  <b-container fluid>
    <h4>My Todo App</h4>
    <b-row>
      <b-col>
        <b-form-input :type="'text'" placeholder="할일..." v-model="context"></b-form-input>
      </b-col>
      <b-button :size="'sm'" @click="add">추가</b-button>
    </b-row>
    <b-row>
      <b-list-group class="w-100">
        <b-list-group-item v-for="todo in todoList" :key="todo.key">
          <b-row>
            <b-col>
              <b-form-input v-if="editIndex === todo.idx" v-model="editContext"></b-form-input>
              <span v-else :class="{'done-line': todo.isFinished}">{{todo.content}}</span>
            </b-col>
            <b-button-group>
              <b-button :variant=" todo.isFinished ? 'primary' : 'outline-primary'" :size="'sm'" @click="checkTodo(todo.idx)">✔️</b-button>
              <b-button :variant="'outline-warning'" :size="'sm'" @click="edit(todo.idx, todo.content)">✏️</b-button>
              <b-button :variant="'outline-danger'" :size="'sm'" @click="remove(todo.idx)">❌</b-button>
            </b-button-group>
          </b-row>
        </b-list-group-item>
      </b-list-group>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      editIndex: -1,
      context: "",
      editContext: "",
      todoList: [
        {
          idx: 1,
          isFinished: false,
          content: "nuxt 공부",
          key: this.makeid()
        }
      ]
    };
  },
  methods: {
    add(e) {
      if (this.context == "") return;
      const idx = this.todoList.slice(-1)[0];
      this.todoList.push({
        idx,
        isFinished: false,
        content: this.context,
        key: this.makeid()
      });
      this.context = "";
    },
    edit(idx, context) {
      if (this.editIndex === -1) {
        this.editIndex = idx;
        this.editContext = context;
      } else {
        const arrayIndex = this.findIndex(idx);
        this.todoList[arrayIndex].content = this.editContext;
        this.editIndex = -1;
      }
    },
    remove(idx) {
      const index = this.findIndex(idx);
      if (index > -1) this.todoList.splice(index, 1);
    },
    checkTodo(idx) {
      // const result = JSON.stringify(this.todoList);
      const arrayIndex = this.findIndex(idx);
      this.todoList[arrayIndex].isFinished = !this.todoList[arrayIndex]
        .isFinished;
    },
    findIndex(idx) {
      return this.todoList.map(e => e.idx).indexOf(idx);
    },
    makeid() {
      var text = "";
      var possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
    }
  }
};
</script>

<style>
.done-line {
  text-decoration: line-through;
}
</style>
