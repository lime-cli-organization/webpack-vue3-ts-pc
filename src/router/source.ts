import { RouteRecordRaw } from "vue-router";

import Login from "@/views/System/Login.vue";
import Home from "@/views/Home.vue";
import { ISubMenu } from "@/api/types/IMenu";

export const defaultRoutes: Array<RouteRecordRaw> = [
  {
    path: "/",
		redirect: '/login'
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
];

export const originData:Array<ISubMenu> = [

]

export const asyncRouterMap: Array<RouteRecordRaw> = [
	{
    path: "/dashboard/dashboard",
		name: "Dashboard",
		component: () => import('@/views/Dashboard/Dashboard.vue'),
	},
	{
    path: "/permission/admin/admin",
		name: "Admin",
		component: () => import('@/views/PermissionDemo/Admin/Admin.vue'),
	},
	{
    path: "/permission/editor/editor",
		name: "Editor",
	
		component: () => import('@/views/PermissionDemo/Editor/Editor.vue'),
	},
	{
    path: "/permission/common/common",
		name: "Common",
	
		component: () => import('@/views/PermissionDemo/Common/Common.vue'),
	},
	{
    path: "/menu/single",
		name: "Single",
		component: () => import('@/views/MenuDemo/Single.vue'),
	},
	{
    path: "/menu/level/first",
		name: "LevelFirst",
		component: () => import('@/views/MenuDemo/Level/First.vue'),
	},
	{
    path: "/menu/level/second",
		name: "LevelSecond",
		component: () => import('@/views/MenuDemo/Level/Second.vue'),
	},
]

