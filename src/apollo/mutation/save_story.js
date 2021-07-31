import gql from "graphql-tag";

export function storeStory(vars, contextHeaders) {
  return {
    mutation: gql`
      mutation saveStory($title: String!, $intro: String!) {
        insert_stories(objects: { description: $intro, title: $title }) {
          affected_rows
        }
      }
    `,
    variables: vars,
    context: contextHeaders,
  };
}
