import { Random } from "mockjs";
const list: any = [];
for (let i = 0; i < 20; i++) {
  list.push({
    id: Random.id(),
    name: Random.cname(),
    code: Random.integer(10000000, 80000000),
    url: Random.url("http"),
    createTime: Random.datetime("y-MM-dd HH:mm"),
    updateTime: Random.datetime("y-MM-dd HH:mm"),
  });
}

import { HomeFilled } from '@element-plus/icons';
import { ISubMenu } from "@/api/types/IMenu";
import {IResponse} from '@/api/types'
import { EButtonRole, EUserRole } from "@/enums/permissionEnum";

export const menuList: Array<ISubMenu> = [
	{
		id: 1,
		title: '图表',
		icon: HomeFilled,
		userRole:[EUserRole.Admin],
		children: [{
			id:2,
			path: '/dashboard/dashboard',
			title: '图表看板',
			userRole:[EUserRole.Admin],
			buttonRole:[EButtonRole.Insert,EButtonRole.Update,EButtonRole.Select,EButtonRole.Delete],
		}]
	},
	{
		id: 3,
		title: '权限管理',
		icon:HomeFilled,
		userRole:[EUserRole.Admin],
		children: [
			{
				id:4,
				path: '/permission/admin/admin',
				title:'管理员',
				userRole:[EUserRole.Admin],
				buttonRole:[EButtonRole.Insert,EButtonRole.Select],
			},
			{
				id:5,
				path: '/permission/editor/editor',
				title: '编辑者',
				userRole:[EUserRole.Editor],
				buttonRole:[EButtonRole.Insert,EButtonRole.Update,EButtonRole.Select],
			},
			{
				id:6,
				path: '/permission/common/common',
				title: '公共',
				userRole:[EUserRole.Admin,EUserRole.Editor],
				buttonRole:[EButtonRole.Insert,EButtonRole.Update,EButtonRole.Select],
			}
		]
	},
	{
		id:7,
		path: '/menu/single',
		title: '单个导航',
		icon:HomeFilled,
		userRole:[EUserRole.Admin, EUserRole.Editor],
		buttonRole:[EButtonRole.Insert,EButtonRole.Update,EButtonRole.Select,EButtonRole.Delete],
	},
	{
		id: 8,
		title: '多级测试',
		icon: HomeFilled,
		userRole: [EUserRole.Admin, EUserRole.Editor],
		children: [
			{
				id: 9,
				title: '多级测试',
				userRole: [EUserRole.Admin, EUserRole.Editor],
				children: [
					{
						id: 10,
						title: 'Level1',
						path: '/menu/level/first',
						userRole: [EUserRole.Admin, EUserRole.Editor],
						buttonRole:[EButtonRole.Insert,EButtonRole.Update,EButtonRole.Select,EButtonRole.Delete],
					},
					{
						id: 11,
						title: 'Level2',
						path: '/menu/level/second',
						userRole: [EUserRole.Admin, EUserRole.Editor],
						buttonRole:[EButtonRole.Insert,EButtonRole.Update,EButtonRole.Select,EButtonRole.Delete],
					}
				]
			}
		]
	}
];

const testReturnData = [
	{
		id: 1,
		parentId: 0,
		isMenu: true, // 是否为左侧导航
		isRouter: true, // 是否是可点击路由， 可点击路由必须有path
		path: '',
		icon:'', // 图标
		title: '', 
		userRole: [], // 用户权限
		component: '',
		keepAlive: true,
		name: '',
		redirect:''
	}
]

export default {
  getMenuList():IResponse {
    return {
      code: 200,
      message: "操作成功",
      data: menuList,
    };
  },
};
