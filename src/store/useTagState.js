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
  addNewTag: async (newTagObj) => {
    console.log(newTagObj);
    if (!newTagObj.tagName) {
      alert('Add a tag name');
      return;
    }

    const res = await fetch('http://localhost:5000/tags', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(newTagObj),
    });

    const data = await res.json();
    state.allTags = [...state.allTags, data];
  },
  
  deleteTag: async (id) => {
    
    const res = await fetch(`http://localhost:5000/tags/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
    });

    state.allTags = await getters.getAllTags();
    
  }

};

export default { state: readonly(state), ...getters, ...actions };