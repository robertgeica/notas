import { reactive, readonly } from 'vue';

const state = reactive({
  allCategories: [],
  currentCategory: {}
});

const getters = {
  async getAllCategories() {
    const res = await fetch('http://localhost:5000/category');
    const data = await res.json();
    state.value.categories = data;

    return data;
  },

};

const actions = {

};

export default { state: readonly(state), ...getters, ...actions };