import { reactive, readonly } from 'vue';

const state = reactive({
  allCategories: [],
  currentCategory: {}
});

const getters = {
  getAllCategories: async () => {
    const res = await fetch('http://localhost:5000/category');
    const data = await res.json();
    state.allCategories = data;
    
    return data;
  },

};

const actions = {

};

export default { state: readonly(state), ...getters, ...actions };