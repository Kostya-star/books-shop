import { Directive, DirectiveBinding } from 'vue';

export const VFocus: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    if (binding.value) {
      el.focus();
    } else {
      el.blur();
    }
  },
};
