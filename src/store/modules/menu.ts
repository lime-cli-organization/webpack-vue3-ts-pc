
interface IMenuState { 
	isCollapse: boolean,
	menuActiveIndex: string
}

const state:IMenuState = {
	isCollapse: false,
	menuActiveIndex:'4',
}

export default {
	namespace:true,
  state,
	mutations: {
		setCollapse(state: IMenuState, isCollapse: boolean) {
			state.isCollapse = isCollapse
		},
		setMenuActivePath(state: IMenuState, menuActiveIndex: string) {
			state.menuActiveIndex = menuActiveIndex;
		}
	},
  actions: {},
  modules: {},
};
