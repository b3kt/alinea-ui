import gql from "graphql-tag";

export function createStoryMutation(vars, contextHeaders) {
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

export function updateStoryMutation(vars, contextHeaders) {
  return {
    mutation: gql`
      mutation updateStory($uid: uuid!, $title: String, $desc: String) {
        update_stories(where: {story_uid: {_eq: $uid}}, _set: {title: $title, description: $desc}) {
          affected_rows
        }
      }
    `,
    variables: vars,
    context: contextHeaders,
  };
}
