
interface ISystemState { 
	isPageLoading: boolean,
}

const state:ISystemState = {
	isPageLoading: false,
}

export default {
	namespace:true,
  state,
	mutations: {
		setPageLoading(state: ISystemState, isPageLoading:boolean) {
			state.isPageLoading = isPageLoading
		},
	},
  actions: {},
  modules: {},
};
