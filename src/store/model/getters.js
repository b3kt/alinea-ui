export function getMenus (state) {
    return state.menus;
}
export function getProfile (state) {
    return state.user.profile;
}
export function getFeeds(state) {
    return state.feeds;
}
export function getStories (state) {
    return state.feeds.stories;
}
export function getStory (state) {
    return state.detail.story;
}
export function getAddress (state) {
    return state.user.address;
}
export function getBanks (state) {
    return state.user.banks;
}
export function getLibraries (state) {
    return state.user.libraries;
}

