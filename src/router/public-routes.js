import authorRoutes from "./author-routes.js";
import userRoutes from "./user-routes.js";

const childrenRoutes = [
  {
    meta: { requiresAuth: false },
    path: "/:catchAll(.*)*",
    component: () => import("pages/Index.vue"),
  },
  {
    meta: { requiresAuth: false },
    path: "stories",
    component: () => import("pages/Stories.vue"),
  },
  {
    meta: { requiresAuth: false },
    path: "books",
    component: () => import("pages/Books.vue"),
  },
  {
    meta: { requiresAuth: true },
    path: "login",
    component: () => import("pages/Login.vue"),
  }
]

const routes = [
  {
    meta: { requiresAuth: false },
    name: "root",
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: childrenRoutes,
  },
  userRoutes,
  authorRoutes,
  // Always leave this as last one,
  // but you can also remove it
  // {
  //   path: "/:catchAll(.*)*",
  //   component: () => import("pages/Error404.vue"),
  // },
  {
    path: "/error",
    component: () => import("layouts/ErrorLayout.vue"),
  },  
];

export default routes;
