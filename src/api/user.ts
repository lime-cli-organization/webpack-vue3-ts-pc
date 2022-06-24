import   {Interceptors}  from '@/axios/https'
import { ICustomResponse } from '@/axios/IHttp';
const server = new Interceptors({ baseURL: 'http://114.55.115.86:8001/api' }, false).getInterceptors();

export const GetImage: () => Promise<ICustomResponse> = () => {
	return server.get('/Authorize/GetImage')
}
