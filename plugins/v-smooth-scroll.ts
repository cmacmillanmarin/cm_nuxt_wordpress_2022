// @ts-ignore: Unreachable code error
type CustomEvent = MouseEvent | TouchEvent | WheelEvent | mousewheel

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.directive('smooth-scroll', {
    created(el: HTMLElement): void {
      console.log('created smooth scroll', el.querySelectorAll('[data-scroll-section]'))
      //   window.addEventListener('wheel', _preventScroll, { passive: false })
      //   window.addEventListener('mousewheel', _preventScroll, { passive: false })
      //   el.addEventListener('wheel', preventScroll, { passive: false })
      //   el.addEventListener('mousewheel', preventScroll, { passive: false })
      //   el.addEventListener('touchstart', preventTouch, { passive: false })
      //   el.addEventListener('touchmove', preventTouch, { passive: false })
    },
    beforeUnmount(el: HTMLElement) {
      console.log('remove smooth scroll', el)
      //   window.removeEventListener('wheel', _preventScroll)
      //   window.removeEventListener('mousewheel', _preventScroll)
      //   el.removeEventListener('wheel', preventScroll)
      //   el.removeEventListener('mousewheel', preventScroll)
      //   el.removeEventListener('touchstart', preventTouch)
      //   el.removeEventListener('touchmove', preventTouch)
    },
  })
})
