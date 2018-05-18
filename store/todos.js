import axios from 'axios';

export const state = () => ({
  list: [],
  todo: {}
})

export const actions = {
  async getList(context) {
    const {
      data
    } = await axios.get('http://localhost:3000/api/todos')
    context.commit('setList', data.todos);
  },
  async add(context, text) {
    console.log("add", text)
    const res = await axios.post('http://localhost:3000/api/todos', {
      text
    });
    if (res.status === 201) {
      context.dispatch('getList');
    }
  },
  async remove(context, todo) {
    const res = await axios.delete(`http://localhost:3000/api/todos/${todo.id}`);
    if (res.status === 204) {
      context.dispatch('getList');
    }
  },
  async edit(context, todo) {
    const res = await axios.put(`http://localhost:3000/api/todos/${todo.id}`, {
      ...todo
    });
    if (res.status === 200) {
      context.dispatch('getList');
    }
  },
  async toggle(context, todo) {
    const res = await axios.put(`http://localhost:3000/api/todos/${todo.id}`, {
      text: todo.text,
      done: !todo.done
    });
    if (res.status === 200) {
      context.dispatch('getList');
    }
  }
}

export const mutations = {
  add(state, text) {
    state.list.push({
      text: text,
      done: false
    })
  },
  edit(state, context) {
    console.log("edit:", context)
    const {
      todo,
      editText
    } = context;
    const index = state.list.indexOf(todo);
    console.log("index:", index);
    todo.text = editText;
    state.list[index] = todo;
  },
  remove(state, {
    todo
  }) {
    state.list.splice(state.list.indexOf(todo), 1)
  },
  toggle(state, todo) {
    todo.done = !todo.done
  },
  setList(state, data) {
    state.list = data
  },
  setTodo(state, data) {
    state.todo = data
  }
}
