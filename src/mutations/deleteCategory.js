import gql from 'graphql-tag';
import { useQuery, useMutation } from '@vue/apollo-composable';
import useCategoryState from '../store/useCategoryState';

export default function useDeleteCategoryMutation(id) {
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

  const { mutate: deleteCategory } = useMutation(
    gql`
      mutation deleteCategory($id: ID!) {
        deleteCategory(id: $id) {
          id
        }
      }
    `
  );

  return { deleteCategory: (id) => deleteCategory(id) };
}
