import { reactive, readonly } from 'vue';

const state = reactive({
  allTags: []
});

const getters = {
  getAllTags: async () => {
    const res = await fetch('http://localhost:5000/tags');
    const data = await res.json();
    state.allTags = await data;
    return data;
  }
};

const actions = {

};

export default { state: readonly(state), ...getters, ...actions };