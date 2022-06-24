import { EButtonRole, EUserRole } from '@/enums/permissionEnum';
import { Component } from 'vue';

export interface IMenuItem {
	id: number; 
	path?: string;
	title: string;
	buttonRole?:Array<EButtonRole>,
	userRole: Array<EUserRole>,
	children?: Array<IMenuItem>;
}
export interface ISubMenu {
	id: number;
	icon?: Component;
	children?: Array<IMenuItem>;
	title: string;
	userRole: Array<EUserRole>,
	// 单个路由设置
	path?: string,
	buttonRole?:Array<EButtonRole>,
}
