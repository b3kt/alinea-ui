export function setMenus(state, menus) {
  state.menus = menus;
}
export function setProfile(state, profile) {
  state.user.profile = profile;
}

export function setStories (state, stories) {
  state.feeds.stories = stories;
}
export function setFeedsObject (state, params) {
  state.feeds[params.name] = params.value;
}
export function setStory (state, story) {
  state.detail.story = story;
}
export function setChapter (state, chapter) {
  state.detail.chapter = chapter;
}

export function setAddress (state, address) {
  state.user.address = address;
}
export function setBanks (state, banks) {
  state.user.banks = banks;
}

export function setLibraries (state, libraries) {
  state.user.libraries = libraries;
}
