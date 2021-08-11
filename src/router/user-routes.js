import { secureStorage } from "boot/app";

const currentRole = secureStorage.getItem("current_role");
const isUser = currentRole !== undefined && currentRole !== null && currentRole === 'user';

const userRouteFunction = () => {
  if (isUser) {
    return {
      meta: { requiresAuth: false },
      name: "user",
      path: "/user",
      component: () => import("layouts/UserLayout.vue"),
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
        {
          meta: { requiresAuth: true },
          path: "account/address",
          component: () => import("pages/DashboardAddress.vue"),
        },
        {
          meta: { requiresAuth: true },
          path: "account/bank",
          component: () => import("pages/DashboardBankAccount.vue"),
        },
        {
          meta: { requiresAuth: true },
          path: "account/security",
          component: () => import("pages/DashboardSecurity.vue"),
        },
        {
          meta: { requiresAuth: true },
          path: "dashboard/library",
          component: () => import("pages/DashboardLibrary.vue"),
        },
      ],
    };
  } else {
    return {};
  }
};

const userRoutes = userRouteFunction()
export default userRoutes;
