import { apolloClientInstance } from "boot/apollo";
import { secureStorage, getContextHeaders } from "boot/app";
import { fetchMenusQuery } from "../../apollo/query/role_menus";
import { fetchSelfProfileQuery } from "../../apollo/query/author_profile";
import { fetchUserAddressQuery, fetchUserBankQuery, fetchUserLibraryQuery } from "../../apollo/query/users";
import {
  fetchStoriesPublicQuery,
  fetchMyStoriesQuery,
  findStoryByUidQuery,
  fetchTopStoriesQuery,
  fetchNewStoriesQuery,
  fetchSaleStoriesQuery,
} from "../../apollo/query/stories";
import {
  createStoryMutation,
  updateStoryMutation,
  createChapterMutation,
  deleteImageMutation
} from "../../apollo/mutation/save_story";
import {
  updateProfileMutation,
  deleteAddressMutation
} from "../../apollo/mutation/users";



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
              childrole: current_role.toUpperCase(),
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
            secureStorage.setItem("menus", response.data.menus);
          }
        });
    }
  } else {
    context.commit("setMenus", menus);
  }
}

export function fetchProfile(context) {
  // const profile = secureStorage.getItem("profile");
  // if (profile === null || profile === undefined) {
    const contextHeaders = getContextHeaders();
    if (contextHeaders !== undefined && contextHeaders !== null) {
      apolloClientInstance.localState.cache.reset();
      return apolloClientInstance
        .query(fetchSelfProfileQuery(contextHeaders))
        .then((response) => {
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
  // } else {
  //   context.commit("setProfile", profile);
  // }
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
        if (
          response.data.insert_stories !== undefined &&
          response.data.insert_stories !== null
        ) {
          console.log(response.data.insert_stories);
        }
      });
  }
}

export function createChapter(context, data) {
  const current_role = secureStorage.getItem("current_role");
  const contextHeaders = getContextHeaders();
  if (
    contextHeaders !== undefined &&
    contextHeaders !== null &&
    current_role === "author"
  ) {
    return apolloClientInstance
      .mutate(createChapterMutation(data, contextHeaders))
      .then((response) => {
        if (
          response.data.insert_chapters !== undefined &&
          response.data.insert_chapters !== null
        ) {
          console.log(response.data.insert_chapters);
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
    const mutateStory = apolloClientInstance
      .mutate(updateStoryMutation(data, contextHeaders));
    return mutateStory.then((response) => {
        if (response.data.update_stories !== undefined &&
          response.data.update_stories !== null) {
          console.log(data);
        }
      });
  }
}

export function updateProfile(context, data) {
  const contextHeaders = getContextHeaders();
  if (
    contextHeaders !== undefined &&
    contextHeaders !== null
  ) {
    const mutateProfile = apolloClientInstance
      .mutate(updateProfileMutation(data, contextHeaders));
    return mutateProfile.then((response) => {
        if (response.data.update_user_profiles !== undefined &&
          response.data.update_user_profiles !== null) {
          console.log(data);
        }
      });
  }
}

export function fetchStories(context) {
  const stories = secureStorage.getItem("stories");
  if (stories === null || stories === undefined) {
    return apolloClientInstance
      .query(fetchStoriesPublicQuery())
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
      .query(fetchMyStoriesQuery(getContextHeaders()))
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
  apolloClientInstance.localState.cache.reset();
  return apolloClientInstance
    .query(
      findStoryByUidQuery(
        {
          uid: uid,
        },
        getContextHeaders()
      )
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

export function fetchStoriesByCriteria(context, criteria) {
  let criteriaQry = null;
  if (criteria === "newStories") {
    criteriaQry = fetchNewStoriesQuery();
  } else if (criteria === "topStories") {
    criteriaQry = fetchTopStoriesQuery();
  } else if (criteria === "saleStories") {
    criteriaQry = fetchSaleStoriesQuery();
  }

  if (criteriaQry !== null) {
    return apolloClientInstance.query(criteriaQry).then((response) => {
      if (
        response.data.stories !== undefined &&
        response.data.stories !== null
      ) {
        context.commit("setFeedsObject", {
          name: criteria,
          value: response.data.stories,
        });
      }
    });
  }
}

export function fetchUserAddress(context) {
  const contextHeaders = getContextHeaders();
  if (contextHeaders !== undefined && contextHeaders !== null) {
    return apolloClientInstance
      .query(fetchUserAddressQuery(contextHeaders))
      .then((response) => {
        console.log(response)
        if (
          response.data.user_address !== undefined &&
          response.data.user_address !== null
        ) {
          context.commit("setAddress", response.data.user_address);
        }
      });
  }
}

export function fetchUserBank(context) {
  const contextHeaders = getContextHeaders();
  if (contextHeaders !== undefined && contextHeaders !== null) {
    return apolloClientInstance
      .query(fetchUserBankQuery(contextHeaders))
      .then((response) => {
        if (
          response.data.user_banks !== undefined &&
          response.data.user_banks !== null
        ) {
          context.commit("setBanks", response.data.user_banks);
        }
      });
  }
}

export function fetchUserLibrary(context) {
  const contextHeaders = getContextHeaders();
  if (contextHeaders !== undefined && contextHeaders !== null) {
    return apolloClientInstance
      .query(fetchUserLibraryQuery(contextHeaders))
      .then((response) => {
        if (
          response.data.user_libraries !== undefined &&
          response.data.user_libraries !== null
        ) {
          context.commit("setLibraries", response.data.user_libraries);
        }
      });
  }
}

export function deleteImage(context, data) {
  const current_role = secureStorage.getItem("current_role");
  const contextHeaders = getContextHeaders();
  if (
    contextHeaders !== undefined &&
    contextHeaders !== null &&
    current_role === "author"
  ) {
    const mutateStory = apolloClientInstance
      .mutate(deleteImageMutation(data, contextHeaders));
    return mutateStory.then((response) => {
        if (response.data.update_stories !== undefined &&
          response.data.update_stories !== null) {
          console.log(data);
        }
      });
  }
}

export function deleteAddress(context, data) {
  const contextHeaders = getContextHeaders();
  if (
    contextHeaders !== undefined &&
    contextHeaders !== null
  ) {
    const mutateStory = apolloClientInstance
      .mutate(deleteAddressMutation(data, contextHeaders));
    return mutateStory.then((response) => {
        if (response.data.delete_user_address_by_pk !== undefined &&
          response.data.delete_user_address_by_pk !== null) {
          console.log(data);
        }
      });
  }
}
