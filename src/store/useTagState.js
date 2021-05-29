import { reactive, readonly } from 'vue';

const state = reactive({
  allTags: []
});

const getters = {

};

const actions = {

};

export default { state: readonly(state), ...getters, ...actions };