import authorRoutes from "./author-routes"

const childrenRoutes = [
  {
    meta: { requiresAuth: false },
    path: "",
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
  {
    meta: { requiresAuth: false },
    name: "author",
    path: "/author",
    component: () => import("layouts/AuthorLayout.vue"),
    children: authorRoutes()
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
