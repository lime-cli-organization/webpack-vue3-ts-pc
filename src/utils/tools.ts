
// 对象转params字符串
export const translateParams: (obj: Record<string, any>) => string = (obj) => {
	const arr = [];
	for (const key in obj) {
		arr.push(key + "=" + obj[key]);
	}
	return arr.join("&");
};

// 是否为空值
export const isEmpty: (data: any) => boolean = (data) => {
	if (data === null || data === undefined || data === '' || data === 'undefined' || data === 'null') {
		return true;
	}
	if (typeof data === 'object' && (JSON.stringify(data) === '{}' || JSON.stringify(data) === '[]')) {
		return true
	}
	return false;
}

// 合并对象
export const merge: (origin: Record<string, any>, external: Record<string, any>) => any  = (origin, external) => {
	for (const key in external) {
		if (Reflect.has(external, key)) {
			if (origin[key] && typeof origin[key] === 'object') {
				origin[key] = merge(origin[key], external[key])
			} else {
				origin[key] = origin[key] = external[key];
			}
		}
	}
	return origin;
}	

export const arrUnique = (arr: any[], id: string | number) => { 
	const obj: Record<string,any> = {}
	const arrays = arr.reduce((setArr, item) => {
		obj[item[id]] ? '' : (obj[item[id]] = true && setArr.push(item))
		return setArr
	}, [])
	return arrays;
}

/**
 * 路由权限映射
 * @param data 扁平路由数据
 * @param userRoles 当前用户拥有的权限
 * @returns 数结构化的路由数据
 */
export const arr2Tree: (data: Array<Record<string, any>>, userRoles: Array<string>) => any = (data, userRoles) => { 
	const map = new Map();
	data.forEach(item => {
		item.children = [];
		map.set(item.id, item);
	})
	const result = data.filter(item => {
		return !isEmpty(arrHas(item.meta.roles,userRoles)) && item.parentId === 0
	});
	data.forEach(item => {
		if (item.parentId !== 0) {
			const parent = map.get(item.parentId);
			!isEmpty(arrHas(item.meta.roles,userRoles)) && parent.children.push(item);
			item.parent = parent;
		};
		
	});
	return result;
}

// 两个数组取交集
export const arrHas = (arr1:any[], arr2:any[]):Array<any> => {
	const set1 = new Set(arr1);
	const set2 = new Set(arr2);
	const filteredArr = Array.from(new Set([...set1].filter((v: any) => set2.has(v))))
	return filteredArr;
}

/**
 * 根据子节点id找全路径path
 * @param data 树结构数组 源数据
 * @param id 需要寻找的子节点id
 * @param ret 返回的全路径 找到返回路径，没找到返回false
 * @returns 找到返回全路径，没找到返回false
 */
export const findParentPath = (data: any[], id: number, ret: number[]): number[] | boolean => { 
	const arr = Array.from(ret);
	for (let index = 0; index < data.length; index++) {
    const element = data[index];
    arr.push(element.id);
    if (element.id === id) {
      return arr;
    }
    const children = element.children;
    if (children && children.length) {
      const result = findParentPath(children, id, arr);
      if (result) return result;
    }
    arr.pop();
  }
  return false;
}


// icon 图标映射
import { DataBoard, Collection } from "@element-plus/icons";
export const menuIconObj = {
	DataBoard,
	Collection
}

// 路由映射

