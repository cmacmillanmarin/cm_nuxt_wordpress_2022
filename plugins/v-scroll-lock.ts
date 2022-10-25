/**
 * How to use?
 *
 * Toggle a predefined animation:
 * - v-intersect:animate.fadeOut
 *
 * Toggle a custom class
 * - v-intersect:class.asdf
 *
 * With options
 * - ="{ delay: '100ms', duration: '100ms' }"
 */
export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.directive('scroll-lock', {
    created(el: HTMLElement, binding) {
      let _dir, _startingY, _preventScroll
      _preventScroll = e => {
        preventScroll(e)
      }
      window.addEventListener('wheel', _preventScroll, { passive: false })
      window.addEventListener('mousewheel', _preventScroll, { passive: false })
      el.addEventListener('wheel', preventScroll, { passive: false })
      el.addEventListener('mousewheel', preventScroll, { passive: false })
      el.addEventListener('touchstart', preventTouch, { passive: false })
      el.addEventListener('touchmove', preventTouch, { passive: false })
      // el.addEventListener("scroll", updateScroll, {passive: false});

      function preventScroll(e) {
        const { wheelDelta, wheelDeltaY, deltaY } = e
        _dir = (wheelDelta || wheelDeltaY || deltaY) < 0 ? 1 : -1
        prevent(e)
      }

      function preventTouch(e) {
        const { type, touches } = e
        const { screenY } = touches[0]
        if (type === 'touchstart') _startingY = screenY
        if (type === 'touchmove') {
          _dir = screenY < _startingY ? 1 : -1
          prevent(e)
        }
      }

      function prevent(e) {
        const h = window.innerHeight
        const { scrollTop, scrollHeight } = el
        const atTop = scrollTop === 0
        const atBottom = scrollTop === scrollHeight - h
        if ((_dir === 1 && atBottom) || (_dir === -1 && atTop)) {
          e.preventDefault()
          e.stopPropagation()
        }
      }
    },
  })
})
