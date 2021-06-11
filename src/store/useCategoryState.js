import { reactive, readonly, watch, ref } from 'vue';
import gql from 'graphql-tag';
import { useQuery } from '@vue/apollo-composable';

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
            noteTitle,
            noteBody,
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
  addNewCategory: async (newCategoryName) => {
    if (!newCategoryName) {
      alert('Add a name');
      return;
    }
    const newCategory = {
      categoryName: newCategoryName,
      notes: [],
    };

    const res = await fetch('http://localhost:5000/category', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(newCategory),
    });

    const data = await res.json();

    state.allCategories = [...state.allCategories, data];
  },

  deleteCategory: async (id) => {
    const res = await fetch(`http://localhost:5000/category/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
    });

    state.currentCategory = {};
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
