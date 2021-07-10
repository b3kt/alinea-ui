import { secureStorage } from "boot/app";

const session = secureStorage.getItem("session");
const authorRoutes = () => {
  if(session.isAuthenticated) {
    return [
      {
        meta: { requiresAuth: true },
        path: "stories",
        component: () => import("pages/DashboardStories.vue"),
      },
    ]
  } else {
    return []
  }
};

console.log(authorRoutes());
export default authorRoutes;
