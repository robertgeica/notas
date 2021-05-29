import { reactive, readonly } from 'vue';

const state = reactive({
  currentNote: {}
});

const getters = {

};

const actions = {

};

export default { state: readonly(state), ...getters, ...actions };