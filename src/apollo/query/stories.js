import gql from "graphql-tag";

export function fetchStoriesPublicQuery() {
  return {
    query: gql`
      query fetchStories {
        stories {
          description
          story_uid
          title
          author {
            name
            bio
          }
          cover_img {
            thumbnail_url
            url
          }
        }
      }
    `,
  };
}

export function fetchTopStoriesQuery() {
  return {
    query: gql`
      query fetchTopStories {
        stories: stories_top {
          description
          story_uid
          title
          author {
            name
            bio
          }
          cover_img {
            thumbnail_url
            url
          }
        }
      }
    `,
  };
}

export function fetchNewStoriesQuery() {
  return {
    query: gql`
      query fetchNewStories {
        stories: stories_new {
          description
          story_uid
          title
          author {
            name
            bio
          }
          cover_img {
            thumbnail_url
            url
          }
        }
      }
    `,
  };
}

export function fetchSaleStoriesQuery() {
  return {
    query: gql`
      query fetchSaleStories {
        stories: stories_sale {
          description
          story_uid
          title
          author {
            name
            bio
          }
          cover_img {
            thumbnail_url
            url
          }
        }
      }
    `,
  };
}

export function fetchMyStoriesQuery(contextHeaders) {
  return {
    query: gql`
      query fetchMyStories {
        stories {
          story_uid
          description
          title
          author {
            name
            bio
          }
          cover_img {
            thumbnail_url
            url
          }
          status {
            code
          }
        }
      }
    `,
    context: contextHeaders,
  };
}

export function findChapterByUidQuery(vars, contextHeaders) {
  return {
    query: gql`
      query findChapterByUid($uid: uuid!) {
        chapters(where: { chapter_uid: { _eq: $uid } }) {
          content_md
          created_by
          cover_img {
            thumbnail_url
            entity_field
          }
          created_date
          intro
          last_modified_date
          last_modified_by
          status {
            code
            name
          }
          story {
            title
          }
          title
        }
      }
    `,
    variables: vars,
    context: contextHeaders,
  };
}

export function findStoryByUidQuery(vars, contextHeaders) {
  return {
    query: gql`
      query findStoryByUid($uid: uuid!) {
        stories(where: { story_uid: { _eq: $uid } }) {
          description
          title
          story_uid
          status {
            code
          }
          author {
            name
            bio
            profile_img {
              entity_field
              url
              thumbnail_url
            }
          }
          cover_img {
            thumbnail_url
            url
            file_uuid
          }
          chapters {
            title
            intro
            chapter_uid
            cover_img {
              thumbnail_url
              url
            }
          }
        }
      }
    `,
    variables: vars,
    context: contextHeaders,
  };
}
