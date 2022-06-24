import type { App } from "vue";
import SvgIcon from "./basic/SvgIcon.vue";

import '@/icons'

export function setupGlobComponents(app: App) {
	app.component('SvgIcon',SvgIcon);
}
