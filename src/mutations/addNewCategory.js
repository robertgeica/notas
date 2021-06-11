import gql from 'graphql-tag';
import { useQuery, useMutation } from '@vue/apollo-composable';

export default function useAddCategoryMutation(newCategoryName) {
  const { mutate } = useMutation(
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
    })
  );
  
  return { addNewCategory: (newCategoryName) => mutate(newCategoryName) };
}
