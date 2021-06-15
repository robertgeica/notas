import { reactive, readonly } from 'vue';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@vue/apollo-composable';
import apolloClient from '../apollo-server';

const state = reactive({
  allTags: [],
});

const getters = {
  getAllTags: async () => {
    const query = gql`
      query {
        tags {
          id
          tagName
          tagColor
        }
      }
    `;

    const r = await apolloClient.query({
      query,
    });

    state.allTags = r.data.tags;

  },
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
  },
};

export default { state: readonly(state), ...getters, ...actions };
