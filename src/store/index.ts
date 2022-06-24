import { createStore } from "vuex";
import user from "./modules/user";
import system from "./modules/system";
import menu from "./modules/menu";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
		user,
		system,
		menu
  },
});
