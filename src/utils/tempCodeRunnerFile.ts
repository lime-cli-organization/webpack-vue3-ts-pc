const asyncRouter = [
	{
		parentId:0,
		id: 1,
		isMenu: true, // 是否是左侧边栏
		path: '/permission/admin/admin',
		name: 'Admin', // 和文件名一致
		icon: '',
		title: '管理员',
		keepAlive: true,
		roles:['admin']
	},
	{
		parentId:0,
		id: 2,
		isMenu: true,
		path: '/permission/common',
		name: 'Common', 
		icon: '',
		title: '公共',
		keepAlive: true,
		roles:['admin','editor']
	},
	{
		parentId:0,
		id: 3,
		isMenu: true,
		path: '/permission/editor',
		name: 'Editor', 
		icon: '',
		title: '其他用户',
		keepAlive: true,
		roles:['editor']
	},
	// 内页
	{
		parentId:0,
		id: 4,
		isMenu: false,
		path: '/permission/admin/info',
		name: 'AdminInfo',
		title: '内页-管理员',
		keepAlive: false, 
		roles:['admin']
	},
	{
		parentId:0,
		id: 5,
		isMenu: false,
		path: '/permission/common/info',
		name: 'CommonInfo', 
		title: '内页-公共',
		keepAlive: false, 
		roles:['admin','editor']
	}
]



const menuReflect = (data:Array<any>) => { 
	const menuList = data.filter(item => item.isMenu);
	
	return {
		menuList,
	}
}

console.log(menuReflect(asyncRouter))
