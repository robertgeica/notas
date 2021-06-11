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
  deleteCategory: async (id) => {
    const res = await fetch(`http://localhost:5000/category/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
    });

    state.allCategories = await getters.getAllCategories();
  },

  editCategory: async (newCategoryName, category) => {
    const updatedCategory = {
      ...category,
      categoryName: newCategoryName,
    };
    const res = await fetch(`http://localhost:5000/category/${category.id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updatedCategory),
    });
    state.allCategories = await getters.getAllCategories();
    state.currentCategory = updatedCategory;
  },
};

export default { state: readonly(state), ...getters, ...actions };
