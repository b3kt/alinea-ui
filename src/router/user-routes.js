
const userRoutes = [
  {
    path: '/dashboard/stories',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
]

export default userRoutes
