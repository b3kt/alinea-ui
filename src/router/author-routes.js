import { secureStorage } from "boot/app";
const currentRole = secureStorage.getItem("current_role");
const isAuthor = currentRole !== undefined && currentRole !== null && currentRole === 'author';

const authorRouteFunction = () => {
  if (isAuthor) {
    return {
      meta: { requiresAuth: false },
      name: "author",
      path: "/author",
      component: () => import("layouts/AuthorLayout.vue"),
      children: [
        {
          meta: { requiresAuth: true },
          path: "stories",
          component: () => import("pages/DashboardStories.vue"),
        },
        {
          meta: { requiresAuth: true },
          path: "story/:story_uid?",
          component: () => import("pages/DashboardStory.vue"),
        },
        {
          meta: { requiresAuth: true },
          path: "chapter/:chapter_uid?",
          component: () => import("pages/DashboardChapter.vue"),
        },
        {
          meta: { requiresAuth: true },
          path: "account/info",
          component: () => import("pages/DashboardProfile.vue"),
        },
      ],
    };
  } else {
    return {};
  }
};

const authorRoutes = authorRouteFunction();

export default authorRoutes;
