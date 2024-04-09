export function debounce(func: (...args: any[]) => void, delay: number = 300) {
  let timeoutId: NodeJS.Timeout | null = null;

  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}
