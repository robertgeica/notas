import gql from 'graphql-tag';
import { useQuery, useMutation } from '@vue/apollo-composable';

export default function useEditCategoryMutation(id, newCategoryName) {
  const { mutate } = useMutation(
    gql`
      mutation updateCategory($id: ID!, $categoryName: String!) {
        updateCategory(id: $id, categoryName: $categoryName) {
          categoryName
        }
      }
    `,
    () => ({
      variables: {
        id: id,
        categoryName: newCategoryName,
      },
    })
  );

  
  return { editCategory: (id, newCategoryName) => mutate(id, newCategoryName) };

}
