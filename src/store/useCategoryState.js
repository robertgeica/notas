import { reactive, readonly, computed } from 'vue';

const state = reactive({
  allCategories: [],
  currentCategory: {},
});

const getters = {
  getAllCategories: async () => {
    const res = await fetch('http://localhost:5000/category');
    const data = await res.json();
    state.allCategories = await data;
    return data;
  },
  getCurrentCategory: async (id) => {
    const res = await fetch(`http://localhost:5000/category/${id}`);
    const data = await res.json();
    state.currentCategory = await data;
    return data;
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
};

export default { state: readonly(state), ...getters, ...actions };
