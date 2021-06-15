import gql from 'graphql-tag';
import { useQuery, useMutation } from '@vue/apollo-composable';
import useTagState from '../store/useTagState';

export default function useAddTagMutation(tagName, tagColor) {
  console.log(tagName, tagColor);
  const query = gql`
    query {
      tags {
        id
        tagName
        tagColor
      }
    }
  `;

  const { mutate: addTag } = useMutation(
    gql`
      mutation addTag($tagName: String!, $tagColor: String!) {
        addTag(tagName: $tagName, tagColor: $tagColor) {
          tagName
          tagColor
        }
      }
    `,
    () => ({
      variables: {
        tagName: tagName,
        tagColor: tagColor,
      },
      update: (store, { data: { addTag } }) => {
        let data = store.readQuery({ query: query });
        data.tags.push(addTag);
        store.writeQuery({ query: query, data });

        console.log(data);

        useTagState.getAllTags();
      },
    })
  );

  return { addNewTag: (newTagObj) => addTag(newTagObj) };
}
