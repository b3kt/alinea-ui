import { secureStorage } from "boot/app";

const session = secureStorage.getItem("session");
const authorRoutes = () => {
  if(session!== undefined && session!== null && session.isAuthenticated !== undefined && session.isAuthenticated) {
    return [
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
    ]
  } else {
    return []
  }
};
export default authorRoutes;
