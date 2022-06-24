import type { App,DirectiveBinding, ObjectDirective } from "vue";

const debounceFunc = (el: Element, binding: DirectiveBinding) => {
	const { value } = binding;
	let timer: number;
	el.addEventListener('keyup', () => { 
		if (timer) {
			window.clearTimeout(timer);
		}
		timer = window.setTimeout(() => {
			value();
		}, 500);
	})
} 

const debounce: ObjectDirective = {
	mounted(el, binding) {
		debounceFunc(el, binding);
	}
}

export function setupDebounceDirective(app:App) {
  app.directive('debounce', debounce);
}

export default debounce;
