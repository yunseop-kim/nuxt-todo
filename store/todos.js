export const state = () => ({
  list: [],
  test: null
})

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
  setTest(state, data) {
    state.test = data
  }
}
