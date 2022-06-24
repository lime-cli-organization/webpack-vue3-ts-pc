export const verifyUsername = (rule:any,value: string, callback: any) => {
	if (!value) {
		return callback(new Error('请填写用户名'))
	}
	const rules = /^[a-zA-Z\u4e00-\u9fa5]+$/
	if ( !rules.test(value)) {
		return callback(new Error('请填写符合格式规范的用户名'))
	}
	return callback()
}
export const verifyPassword = (rule:any,value: string, callback: any) => {
	if (!value) {
		return callback(new Error('请填写密码'))
	}
	if (value.length < 6) {
		return callback(new Error('密码长度必须大于6位'))
	}
	return callback()
}
