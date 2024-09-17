/**
 * Scroll to bottom of an element.
 *
 * Works in all browsers - just that in Safari, the smooth scrolling doesn't work.
 * @param el The bottom of which element you want to scroll down to
 */
export const smoothScrollToBottom = (el: HTMLElement, smooth = true) => {
  if (el == null) return;
  el.scrollTo({ top: el.scrollHeight, behavior: smooth ? 'smooth' : 'auto' });
};
