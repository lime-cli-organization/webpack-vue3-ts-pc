import axios from 'axios'
import { removePending } from "./cancelTokenUtil";
import {  IPendingType } from "./IHttp";

// 取消重复请求
const pendings: Array<IPendingType> = [];
const CancelToken = axios.CancelToken;
// axios 实例
const instance = axios.create({
	timeout: 30000,
	responseType: 'json'
})
// 
instance.interceptors.request.use(
	request => {
		removePending(pendings, request);
		request.cancelToken = new CancelToken((c) => {
			pendings.push({
				url: request.url,
				method: request.method,
				params: request.params,
				data: request.data,
				cancel:c
			})
		})
		return request;
	},
	error => {
		return Promise.reject(error)
	}
)
instance.interceptors.response.use(
	response => {
		removePending(pendings, response);
		// #TODO 根据后端返回的code对业务做异常处理 
		// do something....
		return response;
	},
	error => {
		const response = error.response;
		// #TODO 根据返回http状态码做不同的处理
		// do something....
		// #TODO 加载错误 自动重新加载
		// const config = error.config;
		// 全局的请求次数,请求的间隙
		// const [RETRY_COUNT, RETRY_DELAY] = [3, 1000];
		// if (config && RETRY_COUNT) {
		// 	config.__retryCount = config.__retryCount || 0;
		// }
		return Promise.reject(error)
	}
)

export default instance;
