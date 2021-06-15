import gql from 'graphql-tag';
import { useQuery, useMutation } from '@vue/apollo-composable';
import useCategoryState from '../store/useCategoryState';

export default function useAddCategoryMutation(newCategoryName) {
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

  const { mutate: addCategory } = useMutation(
    gql`
      mutation addCategory($categoryName: String!) {
        addCategory(categoryName: $categoryName) {
          categoryName
        }
      }
    `,
    () => ({
      variables: {
        categoryName: newCategoryName,
      },
      update: (store, { data: { addCategory } }) => {
        let data = store.readQuery({ query: query });
        data.categories.push(addCategory);
        store.writeQuery({ query: query, data });

        useCategoryState.getAllCategories();
      },
    })
  );

  return { addNewCategory: (newCategoryName) => addCategory(newCategoryName) };
}
