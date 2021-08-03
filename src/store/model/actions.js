import { apolloClientInstance } from "boot/apollo";
import { secureStorage, getContextHeaders } from "boot/app";
import { fetchMenusQuery } from "../../apollo/query/role_menus";
import { fetchSelfProfileQuery } from "../../apollo/query/author_profile";
import { fetchStoriesPublicQuery, fetchMyStoriesQuery, findStoryByUidQuery } from "../../apollo/query/stories";
import { createStoryMutation, updateStoryMutation } from "../../apollo/mutation/save_story";

const session = secureStorage.getItem("session");

export function fetchMenus(context) {
  const current_role = secureStorage.getItem("current_role");
  const menus = secureStorage.getItem("menus");
  if (menus === null || menus === undefined) {
    const contextHeaders = getContextHeaders();
    if (contextHeaders !== undefined && contextHeaders !== null) {
      return apolloClientInstance
        .query(
          fetchMenusQuery(
            {
              role: current_role,
            },
            contextHeaders
          )
        )
        .then((response) => {
          if (
            response.data.menus !== undefined &&
            response.data.menus !== null
          ) {
            context.commit("setMenus", response.data.menus);
          }
        });
    }
  } else {
    context.commit("setMenus", menus);
  }
}

export function fetchProfile(context) {
  const profile = secureStorage.getItem("profile");
  if (profile === null || profile === undefined) {
    const contextHeaders = getContextHeaders();
    if (contextHeaders !== undefined && contextHeaders !== null) {
      return apolloClientInstance
        .query(fetchSelfProfileQuery(contextHeaders))
        .then((response) => {
          console.log(response);
          if (
            response.data.user_profiles !== undefined &&
            response.data.user_profiles !== null &&
            response.data.user_profiles.length > 0
          ) {
            context.commit("setProfile", response.data.user_profiles[0]);
            secureStorage.setItem("profile", response.data.user_profiles[0]);
          }
        });
    }
  } else {
    context.commit("setProfile", profile);
  }
}

export function createStory(context, data) {
  const current_role = secureStorage.getItem("current_role");
  const contextHeaders = getContextHeaders();
  if (
    contextHeaders !== undefined &&
    contextHeaders !== null &&
    current_role === "author"
  ) {
    return apolloClientInstance
      .mutate(createStoryMutation(data, contextHeaders))
      .then((response) => {
        if (response.data.insert_stories !== undefined && response.data.insert_stories !== null) {
          console.log(response.data.insert_stories);
        }
      });
  }
}

export function updateStory(context, data) {
  const current_role = secureStorage.getItem("current_role");
  const contextHeaders = getContextHeaders();
  if (
    contextHeaders !== undefined &&
    contextHeaders !== null &&
    current_role === "author"
  ) {
    return apolloClientInstance
      .mutate(updateStoryMutation(data, contextHeaders))
      .then((response) => {
        if (response.data.update_stories !== undefined && response.data.update_stories !== null) {
          console.log(response.data.update_stories);
        }
      });
  }
}

export function fetchStories(context) {
  const stories = secureStorage.getItem("stories");
  if (stories === null || stories === undefined) {
    return apolloClientInstance
      .query(
        fetchStoriesPublicQuery()
      )
      .then((response) => {
        if (
          response.data.stories !== undefined &&
          response.data.stories !== null
        ) {
          context.commit("setStories", response.data.stories);
        }
      });
  } else {
    context.commit("setStories", stories);
  }
}

export function fetchAuthorStories(context) {
  const stories = secureStorage.getItem("my-stories");
  if (stories === null || stories === undefined) {
    return apolloClientInstance
      .query(
        fetchMyStoriesQuery(getContextHeaders())
      )
      .then((response) => {
        if (
          response.data.stories !== undefined &&
          response.data.stories !== null
        ) {
          context.commit("setStories", response.data.stories);
        }
      });
  } else {
    context.commit("setStories", stories);
  }
}

export function switchView(context, param) {
  return new Promise((resolve, reject) => {
    if (param !== undefined && param !== null) {
      console.log("switched to " + param.role);
      secureStorage.setItem("current_role", param.role);
      resolve(param.role);
    } else {
      reject("param is empty");
    }
  });
}

export function findStoryByUid(context, uid) {
  return apolloClientInstance
    .query(
      findStoryByUidQuery({
        uid: uid
      },
      getContextHeaders())
    )
    .then((response) => {
      if (
        response.data.stories !== undefined &&
        response.data.stories !== null &&
        response.data.stories.length > 0
      ) {
        context.commit("setStory", response.data.stories[0]);
      }
    });
  
}
