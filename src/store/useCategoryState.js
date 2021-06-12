import { reactive, readonly, watch, ref } from 'vue';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@vue/apollo-composable';

const state = reactive({
  allCategories: [],
  currentCategory: {},
});

const getters = {
  getAllCategories: () => {
    const { result } = useQuery(gql`
      query {
        categories {
          id
          categoryName
          notes {
            noteTitle
            noteBody
          }
        }
      }
    `);
    watch(() => {
      if (result.value !== undefined) {
        state.allCategories = result.value.categories;
      }
    });
  },
  getCurrentCategory: (currentCategory) => {
    state.currentCategory = currentCategory;
  },
};

const actions = {
  clearCurrentCategory: () => {
    state.currentCategory = {};
  },
 
};

export default { state: readonly(state), ...getters, ...actions };
