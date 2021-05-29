import { reactive, readonly } from 'vue';

const state = reactive({
  allCategories: [],
  currentCategory: {}
});

const getters = {

};

const actions = {

};

export default { state: readonly(state), ...getters, ...actions };