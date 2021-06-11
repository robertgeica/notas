import gql from 'graphql-tag';
import { useQuery, useMutation } from '@vue/apollo-composable';

export default function useDeleteCategoryMutation(id) {
  const { mutate } = useMutation(
    gql`
      mutation deleteCategory($id: ID!) {
        deleteCategory(id: $id) {
          id
        }
      }
    `,
    () => ({
      variables: {
        id
      },
    })
  );
  
  return { deleteCategory: (id) => mutate(id) };
}
