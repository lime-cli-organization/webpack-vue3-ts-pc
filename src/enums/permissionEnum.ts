export enum EButtonRole {
  // 单用户页面按钮权限 general + 【insert,delete】
  generalInsert = 'insert',
  generalDelete = 'delete',
  // 多用户页面按钮权限 用户权限【admin, visitor】 + 【insert, delete】
  adminInsert = 'admin_insert',
  adminDelete = 'admin_delete',
  visitorInsert = 'visitor_insert',
  visitorDelete = 'visitor_delete'
}
export type ButtonTypes = keyof typeof EButtonRole;

export enum EButtonRole {
	Insert = "INSERT",
	Update = "UPDATE",
	Select = "SELECT",
	Delete = "DELETE",
}
export enum EUserRole {
	Admin = 'admin',
	Editor = 'EDITOR',
	Visitor = 'VISITOR'
}
