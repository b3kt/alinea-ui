export function setMenus(state, menus) {
  state.menus = menus;
}

export function setProfile(state, profile) {
  state.profile = profile;
}

export function setStories (state, stories) {
  state.feeds.stories = stories;
}
export function setStory (state, story) {
  state.detail.story = story;
}
