import { Directive, DirectiveBinding } from 'vue';

type BackgroundColors = 'red' | 'green'

const backgroundColors: BackgroundColors[] = ['red', 'green'];

interface TooltipStyles {
  position: string;
  backgroundColor: BackgroundColors | string;
  borderRadius: string;
  padding: string;
  fontSize: string;
  color: string;
  marginTop: string;
  top: string;
  left: string;
  zIndex: string;
}


const getTooltipStyles = (rect: DOMRect, modifiers: DirectiveBinding['modifiers']): TooltipStyles => {
  const scrollY = window.scrollY || window.pageYOffset;

  return {
    position: 'absolute',
    backgroundColor: backgroundColors.find(bgColor => modifiers[bgColor]) ?? 'green',
    borderRadius: '5px',
    padding: '5px',
    fontSize: '14px',
    color: 'white',
    marginTop: '5px',
    top: `${rect.top + rect.height + scrollY}px`,
    left: `${rect.left}px`,
    zIndex: '1000'
  };
};

export const VTooltip: Directive<HTMLElement, string> = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    
    const tooltip = document.createElement('span');
    tooltip.textContent = binding.value;

    el.addEventListener('mouseover', () => {
      document.body.appendChild(tooltip);
      const rect = el.getBoundingClientRect();

      const styles = getTooltipStyles(rect, binding.modifiers);

      Object.keys(styles).forEach((key: keyof TooltipStyles) => {
        tooltip.style[key] = styles[key];
      });
    });

    el.addEventListener('mouseout', () => {
      document.body.removeChild(tooltip);
    });
  },
};
