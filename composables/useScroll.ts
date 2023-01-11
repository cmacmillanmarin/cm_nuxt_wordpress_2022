//
// requires:
// ~/composables/useResize
// ~/composables/useDevice
//

import { toPx } from '~/utils/index'

export default function scroll() {
  const { vw, vh, onResize } = useResize()
  const { touch, safari } = useDevice()

  let _debug: boolean = true

  let _el: HTMLElement
  let _mounted: boolean = false
  let _disabled: boolean = false
  let _target: number = 0
  let _velocity: number = 1
  let _bounding: number = 0

  let _support = {
    hasWheelEvent: false,
    hasMouseWheelEvent: false,
  }

  interface Child {
    el: HTMLElement
    bounding: { top: number; left: number; width: number; height: number }
  }
  let _children: Array<Child> = []

  type Type = 'smooth' | 'native'
  const type = ref<Type>('smooth')

  const position = ref<number>(0)
  const direction = ref<'up' | 'down'>('down')

  const isSmooth = computed<boolean>(() => type.value === 'smooth')
  const isNative = computed<boolean>(() => type.value === 'native')

  watch(onResize, _updateSize)

  interface createObject {
    el?: HTMLElement
  }
  function create(obj: createObject): void {
    const { el } = obj
    if (!el) _log('element not defined')
    else {
      _el = el
      type.value = touch.value ? 'native' : 'smooth'
      _getChildren({ reset: true })
      _updateSize()
      _addEventListeners()
      _start()
    }
  }

  function _start() {
    isSmooth && _startSmooth()
    isNative && _startNative()
    _mounted = true
  }

  function _startSmooth(): void {
    if (!_el.parentElement) {
      _log('element without parent')
      return
    }
    _el.parentElement.style.overflow = safari.value ? 'hidden' : 'clip'
    _el.parentElement.style.height = toPx(vh.value)
  }
  function _destroySmooth(): void {}
  function _startNative(): void {}
  function _destroyNative(): void {}

  function update() {
    _log('update')
  }

  function destroy() {
    _log('destroyyyy')
  }

  interface getChildrenParams {
    reset: boolean
  }
  function _getChildren(params: getChildrenParams) {
    const { reset } = params
    const elements: NodeListOf<HTMLElement> = _el.querySelectorAll('[data-scroll]')
    if (reset) _children = []
    for (const el of elements) {
      delete el.dataset.scroll
      _children.push({
        el: el,
        bounding: el.getBoundingClientRect(),
      })
    }
    console.log(_children)
  }

  function _updateSize(): void {
    _bounding = _el.getBoundingClientRect().height - vh.value
    console.log(`_updateSize: ${_bounding}`)
  }

  function onScroll(): void {
    _log('onScroll')
  }

  function onWheel(e: WheelEvent): void {
    _log('onWheel')
    if (isNative.value || _disabled) return
    e.preventDefault()
    const { deltaY, type } = e
    const y = deltaY * _velocity
    _log(`${deltaY}`)
    _target = Math.max(Math.min(_bounding, _target + y), 0)
    _startRaf()
  }

  function onMouseWheel(e: MouseEvent): void {}

  function _startRaf() {
    _log(`start raf: ${_target}`)
    _el.style.transform = `translate3d(0, -${_target}px, 0)`
  }

  function _addEventListeners(): void {
    const disablePassive = { passive: false }
    window.addEventListener('scroll', onScroll)
    window.addEventListener('wheel', onWheel, disablePassive)
  }
  function _removeEventListeners(): void {}

  function _log(msg: string) {
    _debug && console.log(`useScroll ~ ${msg}`)
  }

  return {
    create,
    update,
    destroy,
    position,
    direction,
  }
}
