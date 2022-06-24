import store from "@/store";
import axios, { AxiosRequestConfig, AxiosInstance, AxiosError, AxiosResponse ,Method,Canceler, Axios,AxiosRequestHeaders} from "axios";
import { ElMessage } from "element-plus";
 

import {setCookie,getCookie} from '@/utils/cookieUtil'
import { ICustomResponse } from "./IHttp";
// 取消重复请求
interface IPendingType {
	url?: string;
	method?: Method;
	params?: any;
	data?: any;
	cancel: Canceler;
}
const pending: Array<IPendingType> = []; 
const CancelToken = axios.CancelToken;
// 请求队列 加载显示
const queue:Record<string, any>={}; 
// 后端返回
interface IBackData {
	readonly code?: boolean;
	readonly total?: number;
	readonly msg?: string;
	data?: any;
}
// extends Axios
export  class Interceptors extends Axios {
  private instance: AxiosInstance;
	constructor(config: AxiosRequestConfig,private isJwt = true) {
		super(config);
		this.instance = axios.create({
			baseURL: config.baseURL ? config.baseURL : 'http://121.43.163.227:8001/api',
			timeout: 1000 * 30,
			...config,
		});
		this.isJwt = isJwt;
		this.initInterceptors();
	}

  public getInterceptors(): AxiosInstance {
    return this.instance;
	}

	private initInterceptors() {
    this.instance.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    this.instance.interceptors.request.use(
			(config: AxiosRequestConfig) => {
				// this.removePending(config);
				config.cancelToken = new CancelToken((cancel) => {
					pending.push({
						url: config.url,
						method: config.method,
						params: config.params,
						data: config.data,
						cancel
					})
				})
        if (this.isJwt && config.headers) {
          const token = getCookie("token");
          if (token) {
            config.headers.Authorization = "Bearer  " + token;
          }
				}
				if (Object.keys(queue).length === 0) {
					store.commit('setPageLoading', true);
				}
				const { url } = config;
				url && (queue[url] = url);
        return config;
      },
      (error: AxiosError) => {
        console.log(error);
      },
    );

    this.instance.interceptors.response.use(
			(response:AxiosResponse) => {
				// this.removePending(response.config)
				response.config.url && delete queue[response.config.url];
				if (Object.keys(queue).length === 0) {
					store.commit('setPageLoading', false);
				}
        if (response.headers.authorization) {
          setCookie("token", response.headers.authorization);
        } else {
          if (response.data.token) {
            setCookie("token", response.data.token);
          }
        }
				if (response.status === 200) {
          return Promise.resolve(response.data as ICustomResponse);
        } else {
          this.errorHandle(response);
          return Promise.reject(response.data);
        }
      },
			(error: AxiosError) => {
				console.log(error)
        const { response } = error;
        if (response) {
          this.errorHandle(response);
          return Promise.reject(response.data);
        } else {
          ElMessage.error("网络连接异常");
        }
      },
    );
	}
	
	/**
	 * 响应错误码处理
	 * @param res 
	 */
  private errorHandle(res: AxiosResponse) {
    // 状态码判断
    switch (res.status) {
      case 401:
        ElMessage.warning("未授权");
        break;
      case 403:
        ElMessage.warning("授权码过期");
        break;
      case 404:
        ElMessage.warning("请求的资源不存在");
        break;
      default:
        ElMessage.warning("连接错误");
    }
	}

	/**
	 * 移除正在等待中的请求
	 * @param config axios 请求配置
	 */
	private removePending = (config: AxiosRequestConfig) => {
		for (const key in pending) {
			const item: number = +key;
			const list: IPendingType = pending[key];
			if (list.url === config.url && list.method === config.method && JSON.stringify(list.params) === JSON.stringify(config.params) && JSON.stringify(list.data) === JSON.stringify(config.data)) {
				list.cancel('操作频繁，请稍后再试');
				pending.splice(item, 1);
			}
		}
	}
}

