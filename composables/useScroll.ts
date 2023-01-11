//
// requires:
// ~/composables/useResize
// ~/composables/useDevice
// ~/composables/useRaf
//

import { toPx } from '~/utils/index'

export default function scroll() {
  const { vw, vh, onResize } = useResize()
  const { touch, safari } = useDevice()
  const { addTicker, killTicker } = useRaf()

  let _debug: boolean = true

  let _el: HTMLElement
  let _mounted: boolean = false
  let _disabled: boolean = false
  let _inRaf: boolean = false
  let _target: number = 0
  let _previous: number = 0
  let _current: number = 0
  let _elasticity: number = 0.1
  let _velocity: number = 1
  let _bounding: number = 0

  let _support = {
    hasWheelEvent: false,
    hasMouseWheelEvent: false,
  }

  type Bounding = { top: number; left: number; width: number; height: number }
  interface Child {
    el: HTMLElement
    bounding: Bounding
    inView: boolean
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
      console.log(type.value, isSmooth, isNative)
      _getChildren({ reset: true })
      _updateSize()
      _addEventListeners()
      _start()
    }
  }

  function _start() {
    isSmooth.value && _startSmooth()
    isNative.value && _startNative()
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
  function _destroySmooth(): void {
    if (!_el.parentElement) {
      _log('element without parent')
      return
    }
    _el.parentElement.style.overflow = 'visible'
    _el.parentElement.style.height = 'auto'
  }
  function _startNative(): void {}
  function _destroyNative(): void {}

  function update() {
    _log('update')
  }

  function destroy() {
    _log('destroyyyy')
  }

  function _inTarget(): boolean {
    return Math.abs(_current - _target) < 0.1
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
      const bounding: Bounding = el.getBoundingClientRect()
      _children.push({
        el: el,
        bounding: bounding,
        inView: _inView(bounding),
      })
    }
  }

  function _inView(bounding: Bounding): boolean {
    const initPos = Math.ceil(bounding.top)
    const lastPos = Math.ceil(initPos + bounding.height)
    const windowSize = vh.value
    const scrollPoint = _current
    return scrollPoint + windowSize > initPos && scrollPoint < lastPos
  }

  function _updateSize(): void {
    _bounding = _el.getBoundingClientRect().height - vh.value
    _log(`_updateSize: ${_bounding}`)
  }

  function _onScroll(): void {
    _log('onScroll')
  }

  function _onWheel(e: WheelEvent): void {
    if (isNative.value || _disabled) return
    e.preventDefault()
    const { deltaY, type } = e
    const y = deltaY * _velocity
    _target = Math.max(Math.min(_bounding, _target + y), 0)
    _startRaf()
  }

  function _onMouseWheel(e: MouseEvent): void {}

  function _startRaf(): void {
    if (!_inRaf && !_inTarget()) {
      _log(`addTicker()`)
      addTicker(_raf)
    }
  }

  function _stopRaf(): void {
    _log(`killTicker()`)
    _inRaf = false
    _current = _target
    killTicker(_raf)
  }

  function _raf(): void {
    _inRaf = true
    _current += (_target - _current) * _elasticity
    _run()
    _inTarget() && _stopRaf()
  }

  function _run(): void {
    direction.value = _current > _previous ? 'up' : 'down'

    for (const child of _children) {
      let y = 0
      const { bounding } = child
      // if (child.sticky) y = parseInt(this.stickyPositionOf(child))
      if (child.inView) y = Math.ceil(_current)
      else if (_current > bounding.top) y = Math.ceil(bounding.top + bounding.height)
      child.el.style.transform = `translate3D(0, -${y}px, 0)`
      child.inView = _inView(child.bounding)
    }

    _previous = _current
  }

  function _addEventListeners(): void {
    const disablePassive = { passive: false }
    window.addEventListener('scroll', _onScroll)
    window.addEventListener('wheel', _onWheel, disablePassive)
  }

  function _removeEventListeners(): void {
    window.removeEventListener('scroll', _onScroll)
    window.removeEventListener('wheel', _onWheel)
    killTicker(_raf)
  }

  function _log(msg: string): void {
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
