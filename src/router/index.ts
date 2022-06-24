import { createRouter, createWebHistory, RouteRecordRaw,  } from "vue-router";
import type { RouteLocationNormalized } from 'vue-router';

import { arr2Tree } from '@/utils/tools'
import NotFound from '@/views/System/404.vue'
import { defaultRoutes, asyncRouterMap } from './source';
import store from "@/store";

// const ownerRoute = arr2Tree(asyncRouterMap, ['admin', 'editor']);
const ownerRoute = asyncRouterMap;
const routes: Array<RouteRecordRaw> = [...defaultRoutes,...ownerRoute ];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
	routes: [
		...defaultRoutes,
		{
			path: '/home',
			redirect:'/dashboard/dashboard',
			name: 'Home',
			component: () => import('@/views/Home.vue'),
			children: [
				...asyncRouterMap
			]
		},
		{	
			path: "/*",
			name: "404",
			component: NotFound,
			meta: {
				title: '页面不存在！'
			}
		}
	],
});

router.beforeEach((to, from) => {
	store.commit('setMenuActivePath', to.path);
})


export default router;
