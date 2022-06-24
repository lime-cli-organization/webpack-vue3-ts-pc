import  {Interceptors}  from '@/axios/https'
import { ICustomResponse } from '@/axios/IHttp';

const server = new Interceptors({ baseURL: 'http://121.43.163.227:8002/api' }).getInterceptors();

export const GetAdminInsideSchool:(params: any)=> Promise<ICustomResponse> = (params) => {
	return server.get(`/Admin/Collect/Exam/ExamList`, {
		params
	})
}
