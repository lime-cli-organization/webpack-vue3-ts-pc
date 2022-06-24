import type { App } from "vue";
import { setupPermissionDirective } from "./permission";
import { setupDebounceDirective } from "./debounce";

export function setupGlobDirectives(app: App) {
	setupPermissionDirective(app);
	setupDebounceDirective(app);
}
