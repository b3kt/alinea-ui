const routes = [
  {
    meta: { requiresAuth: false },
    name: "root",
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
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
        meta: { requiresAuth: false },
        path: "login",
        component: () => import("pages/Login.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
