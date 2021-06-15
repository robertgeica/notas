import gql from 'graphql-tag';
import { useQuery, useMutation } from '@vue/apollo-composable';
import useCategoryState from '../store/useCategoryState';

export default function useDeleteTagMutation(id) {
  const query = gql`
    query {
      tags {
        id
        tagName
        tagColor
      }
    }
  `;

  const { mutate: deleteTag } = useMutation(
    gql`
      mutation deleteTag($id: ID!) {
        deleteTag(id: $id) {
          id
        }
      }
    `
  );

  return { deleteTag: (id) => deleteTag(id) };
}
