
// import { GetMyInfo } from "@/api/user";
// import { GetImage } from "@/api/testDemo";
// import { GetImage as GetImage1  } from "@/api/authorization";
import { GetImage  } from "@/api/user";
import { ActionContext } from "vuex";

interface IUser {
	name: string,
}

export default {
  state: {
    userInfo: {
      name: "",
      role: "",
    },
  },
	mutations: {
		setUserInfo(state: any, payload: any) {
			const mergeUserInfo = { ...state.userInfo, ...payload };
			state.userInfo = mergeUserInfo;
		}
	},
	actions: {
		async setUserInfo(context:ActionContext<IUser,any>) { 
			const { commit } = context;
			return new Promise(() => {
				// GetImage(); 
			})
			// const  data = await server.get('/Common/User/MyInfo')
			// console.log(data)
			// commit('setUserInfo', data)
		}
	},
  modules: {},
};
