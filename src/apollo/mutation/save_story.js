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
        update_stories(
          where: { story_uid: { _eq: $uid } }
          _set: { title: $title, description: $desc }
        ) {
          affected_rows
        }
      }
    `,
    variables: vars,
    context: contextHeaders,
  };
}

export function createChapterMutation(vars, contextHeaders) {
  return {
    mutation: gql`
      mutation createChapter($title: String!, $desc: String!, $uid: uuid!) {
        insert_chapters(
          objects: { title: $title, intro: $desc, story_uid: $uid }
        ) {
          affected_rows
        }
      }
    `,
    variables: vars,
    context: contextHeaders,
  };
}

export function updateChapterMutation(vars, contextHeaders) {
  return {
    mutation: gql`
      mutation createChapter($title: String!, $desc: String!, $content: String!, $uid: uuid!) {
        update_chapters(
          where: { chapter_uid: { _eq: $uid } }
          _set: { intro: $desc, title: $title, content_md: $content }
        ) {
          affected_rows
        }
      }
    `,
    variables: vars,
    context: contextHeaders,
  };
}

export function deleteImageMutation(vars, contextHeaders) {
  return {
    mutation: gql`
      mutation deleteFile($uuid: String!) {
        delete_system_files(where: { file_uuid: { _eq: $uuid } }) {
          affected_rows
        }
      }
    `,
    variables: vars,
    context: contextHeaders,
  };
}

export function deleteStoryMutation(vars, contextHeaders) {
  return {
    mutation: gql`
      mutation deleteStory($uid: uuid!) {
        delete_stories(where: { story_uid: { _eq: $uid } }) {
          affected_rows
        }
      }
    `,
    variables: vars,
    context: contextHeaders,
  };
}

export function publishStoryMutation(vars, contextHeaders) {
  return {
    mutation: gql`
      mutation publishStory($uid: uuid!, $status: Int!) {
        update_stories(
          where: { story_uid: { _eq: $uid } }
          _set: { status_id: $status }
        ) {
          affected_rows
        }
      }
    `,
    variables: vars,
    context: contextHeaders,
  };
}
