<template>
  <b-container fluid>
    <b-row>
      <b-form inline>
        <b-form-input :type="'text'" placeholder="할일..." v-model="context"></b-form-input>
        <b-button :size="'sm'" @click="add">추가</b-button>
      </b-form>
    </b-row>
    <b-row>
      <b-list-group>
        <b-list-group-item v-for="todo in todoList" :key="todo.key">
          <b-form-input v-if="editIndex === todo.idx" v-model="editContext"></b-form-input>
          <span v-else>{{todo.content}}</span>
          <b-button-group>
            <b-button :variant="'outline-warning'" :size="'sm'" @click="edit(todo.idx, todo.content)">✏️</b-button>
            <b-button :variant="'outline-danger'" :size="'sm'" @click="remove(todo.idx)">❌</b-button>
            <b-button :variant=" todo.isFinished ? 'primary' : 'outline-primary'" :size="'sm'" @click="checkTodo(todo.idx)">✔️</b-button>
          </b-button-group>
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
      console.log(e);
      const idx = this.todoList.slice(-1)[0];
      console.log(idx);
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
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}
.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}
.links {
  padding-top: 15px;
}
</style>
