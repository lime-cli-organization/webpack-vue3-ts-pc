
import { RouteRecordRaw } from "vue-router";
import  { ActionContext } from "vuex";

interface IBreadcrumb {
	breadcrumbList:RouteRecordRaw
}

export default {
	state: {
		breadcrumbList:[],
  },
	mutations: {
		setBreadcrumb(state: IBreadcrumb, payload: RouteRecordRaw) {
			state.breadcrumbList = payload;
		}
	},
	actions: {
		
	},
  modules: {},
};
