// @ts-ignore: Unreachable code error
type CustomEvent = MouseEvent | TouchEvent | WheelEvent | mousewheel

let _dir: number
let _startingY: number
let _el: HTMLElement

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.directive('scroll-lock', {
    created(el: HTMLElement): void {
      _el = el

      window.addEventListener('wheel', _preventScroll, { passive: false })
      window.addEventListener('mousewheel', _preventScroll, { passive: false })
      el.addEventListener('wheel', preventScroll, { passive: false })
      el.addEventListener('mousewheel', preventScroll, { passive: false })
      el.addEventListener('touchstart', preventTouch, { passive: false })
      el.addEventListener('touchmove', preventTouch, { passive: false })
    },
    beforeUnmount(el: HTMLElement): void {
      window.removeEventListener('wheel', _preventScroll)
      window.removeEventListener('mousewheel', _preventScroll)
      el.removeEventListener('wheel', preventScroll)
      el.removeEventListener('mousewheel', preventScroll)
      el.removeEventListener('touchstart', preventTouch)
      el.removeEventListener('touchmove', preventTouch)
    },
  })
})

function _preventScroll(e: CustomEvent): void {
  preventScroll(e, _el)
}

function preventScroll(e: CustomEvent, el?: HTMLElement): void {
  const { wheelDelta, wheelDeltaY, deltaY } = e
  _dir = (wheelDelta || wheelDeltaY || deltaY) < 0 ? 1 : -1
  prevent(e, el)
}

function preventTouch(e: CustomEvent): void {
  const { type, touches } = e
  const { screenY } = touches[0]
  if (type === 'touchstart') _startingY = screenY
  if (type === 'touchmove') {
    _dir = screenY < _startingY ? 1 : -1
    prevent(e)
  }
}

function prevent(e: CustomEvent, el?: HTMLElement): void {
  const h = window.innerHeight
  const { scrollTop, scrollHeight } = el || e.target
  const atTop = scrollTop === 0
  const atBottom = scrollTop === scrollHeight - h
  if ((_dir === 1 && atBottom) || (_dir === -1 && atTop)) {
    e.preventDefault()
    e.stopPropagation()
  }
}
