import { secureStorage } from "boot/app";

const currentRole = secureStorage.getItem("current_role");
const isUser = currentRole !== undefined && currentRole !== null && currentRole === 'user';

const userRouteFunction = () => {
  if (isUser) {
    return {
      meta: { requiresAuth: false },
      name: "user",
      path: "/user",
      component: () => import("layouts/AuthorLayout.vue"),
      children: [
        {
          meta: { requiresAuth: true },
          path: "stories",
          component: () => import("pages/DashboardStories.vue"),
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

const userRoutes = userRouteFunction()
export default userRoutes;
