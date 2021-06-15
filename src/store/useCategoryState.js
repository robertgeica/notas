import { reactive, readonly, watch, ref } from 'vue';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@vue/apollo-composable';
import apolloClient from '../apollo-server';

const state = reactive({
  allCategories: [],
  currentCategory: {},
});

const getters = {
  getAllCategories: async () => {
    const query = gql`
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
    `;

    const r = await apolloClient.query({
      query,
    });

    state.allCategories =r.data.categories;
    console.log(state);
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
