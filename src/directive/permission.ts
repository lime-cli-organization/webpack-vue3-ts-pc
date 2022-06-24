import { getCookie } from "@/utils/cookieUtil";
import type { App, DirectiveBinding, ObjectDirective } from "vue";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";

const checkPermission = (el: Element, binding:DirectiveBinding) => {
	const { value, arg } = binding;
	// 当前用户角色
	// const roles: any[] = ['admin', 'editor']
	const token = jwt.decode(getCookie('token')) as JwtPayload;
	const roles:string[] = token['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'].split(',')
	// #TODO 权限修饰符
	// v-permission:auth 用户页面权限
	// v-permission:btn 操作按钮权限 
	// if (arg === 'auth') {}else if (arg === 'btn') {}
	if (value && value instanceof Array) {
		const permissionRoles = value;
		const hasPermission = roles.some(role => {
			return permissionRoles.includes(role);
		})
		if (!hasPermission) {
			el.parentNode && el.parentNode.removeChild(el);
		}
	} else {
		throw new Error(`need roles! like v-permission="['admin']"`);
	}
}

const permission: ObjectDirective = {
	mounted(el, binding) {
		checkPermission(el, binding);
	},
	updated(el, binding) {
		checkPermission(el, binding);
	}
}

export function setupPermissionDirective(app:App) {
  app.directive('permission', permission);
}

export default permission

