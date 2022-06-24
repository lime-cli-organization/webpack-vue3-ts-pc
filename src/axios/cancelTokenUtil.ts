import { AxiosRequestConfig } from "axios";
import { IPendingType } from "./IHttp";

export const removePending = (pendings: Array<IPendingType> ,config:AxiosRequestConfig) => {
	for (const key in pendings) {
		const item: number = + key;
		const list: IPendingType = pendings[key];
		if (list.url === config.url && list.method === config.method && JSON.stringify(list.params) === JSON.stringify(config.params) && JSON.stringify(list.data) === JSON.stringify(config.data)) {
			list.cancel('操作频繁，请稍后再试');
			if (pendings.length > 1) {
				pendings.slice(item, item)
			}
		}
	}
}
