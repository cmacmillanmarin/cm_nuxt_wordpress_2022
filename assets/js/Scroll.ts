interface Options {
  html: HTMLElement
  body: HTMLElement
  section: HTMLElement
  events: any
  utils: any
}
export default class Scroll {
  debug: boolean

  isSmooth: boolean
  isNative: boolean
  inReset: boolean

  disabled: boolean

  options: any
  events: any
  utils: any

  vars: {
    target: number
    current: number
    previous: number
    direction: number
    elasticity: number
    velocity: number
    bounding: number
    horizontal: number
    horizontalGaps: []
    transitions: number
    height: number
    width: number
    size: { w: number; h: number }
    mobileTemplate: boolean
  }

  section: HTMLElement

  _html: HTMLElement
  _body: HTMLElement

  children: Array<{}>

  _support: {
    hasWheelEvent: boolean
    hasMouseWheelEvent: boolean
    isFirefox: boolean
  }

  _void: string
  _raf: Function

  constructor(opt: Options) {
    this.debug = false

    this.isSmooth = false
    this.isNative = true
    this.inReset = true

    this.disabled = false

    this.options = opt

    this.events = opt.events

    this.utils = opt.utils

    this.vars = {
      target: 0,
      current: 0,
      previous: 0,
      direction: 1,
      elasticity: 0.1,
      velocity: 0.5,
      bounding: 0,
      horizontal: 0,
      horizontalGaps: [],
      transitions: 0,
      height: window.innerHeight,
      width: window.innerWidth,
      size: { w: 0, h: 0 },
      mobileTemplate: false,
    }

    this._html = opt.html
    this._body = opt.body
    this.section = opt.section

    this.children = []

    this._void = 'VOID'

    this._raf = this.raf.bind(this)

    this._support = {
      hasWheelEvent: 'onwheel' in document,
      hasMouseWheelEvent: 'onmousewheel' in document,
      isFirefox: navigator.userAgent.indexOf('Firefox') > -1,
    }

    this.init()
  }

  init() {
    this.addEvents()
  }

  set(type) {
    this.isSmooth = type === 'smooth'
    this.isNative = type === 'native'
    this.isSmooth && this.destroyNative() && this.setSmooth()
    this.isNative && this.destroySmooth() && this.setNative()
    this.log('Tracker type', { isSmooth: this.isSmooth, isNative: this.isNative })
  }

  setSmooth() {
    this.log('setSmooth')
    if (!this.section) this.section = document.querySelector('main')
    const page = this.section.querySelector('.page')
    page?.classList.add('o-hidden')
    gsap.set(page, { height: this.utils.toPx(window.innerHeight) })
    this.onResize()
  }

  destroySmooth() {
    this.log('destroySmooth')
    this.stopRaf()
    const page = this.section.querySelector('.page')
    page?.classList.remove('o-hidden')
    gsap.set(page, { height: 'auto' })
    this.scrollTo(0)
    for (const child of this.children) {
      if (child.horizontalScroll && child.horizontalEl) {
        child.horizontalEl.style.transform = null
        child.xProgress = 0
      }
      if (!child.scroll) continue
      child.el.style.transform = null
    }
    this.vars.horizontal = 0
    this.vars.horizontalGaps = []
    return true
  }

  setNative() {
    this.log('setNative')
    this.onResize()
  }

  destroyNative() {
    this.scrollTo(0)
    this.log('destroyNative')
    return true
  }

  getScrollPos() {
    return window.pageYOffset || document.documentElement.scrollTop
  }

  getScrollProgress() {
    return this.getScrollPos() / this.vars.bounding
  }

  getScrollPosition() {
    return this.vars.current
  }

  onScroll() {
    if (this.isSmooth) return
    this.vars.current = this.getScrollPos()
    this.run({ animations: true })
  }

  onWheel(e) {
    if (this.isNative || this.disabled) return
    e.preventDefault()
    const { wheelDelta, wheelDeltaY, deltaY, type } = e
    const s = type === 'wheel' ? 1 : -1
    const y = (wheelDelta || wheelDeltaY || deltaY) * s * this.vars.velocity
    this.vars.target = Math.max(Math.min(this.vars.bounding, this.vars.target - y), 0)
    this.startRaf()
  }

  run({ animations, scroll }) {
    if (this.vars.current > this.vars.previous) {
      this.vars.direction = 1
    } else {
      this.vars.direction = -1
    }

    if ((!this.inReset && this.vars.direction === 1) || this.vars.current < this.vars.height)
      this.hideHeader({ translate: true })
    else if (!this.inReset && this.vars.current > this.headerHeight) this.showHeader()

    const { inGap, from, to, el, id } = this.inHorizontalGap()
    this.vars.horizontal = this.getHorizontalGap()
    if (!inGap) {
      for (const child of this.children) {
        if (animations) {
          if (child.el === this._void) continue
          child.inView = this.childInView(child)
          child.inOffset = child.inView && child.in ? this.childInOffset(child) : false
          if (this.needsTransition(child)) {
            this.in(child)
          } else if (this.needsReset(child)) {
            this.resetTransition(child)
          }
        }
        if (scroll) {
          if (!child.scroll) continue
          let y = 0
          if (child.sticky) y = parseInt(this.stickyPositionOf(child))
          else if (this.childInScroll(child)) y = parseInt(this.vars.current - this.vars.horizontal)
          else if (this.vars.current > child.bounding.top + this.vars.horizontal)
            y = child.bounding.top + child.bounding.height + child.scrollOffset
          child.el.style.transform = `translate3D(0, -${y}px, 0)`
          child.yProgress = Math.min(
            Math.max(
              0,
              (y - (child.bounding.top - this.vars.size.screenH)) /
                (child.bounding.height + this.vars.size.screenH)
            ),
            1
          )
          if (child.horizontalScroll) {
            if (this.vars.current < child.horizontalFrom) {
              child.xProgress = 0
              child.horizontalEl.style.transform = 'translate3D(0, 0, 0)'
            } else {
              child.xProgress = 1
              child.horizontalEl.style.transform = `translate3D(-${
                child.horizontalTo - child.horizontalFrom
              }px, 0, 0)`
            }
          }
        }
      }
    } else {
      const child = this.getChildBy(id)
      const x = parseInt(this.vars.current - from)
      for (const child of this.children) {
        if (!child.scroll) continue
        child.el.style.transform = `translate3D(0, -${parseInt(from - this.vars.horizontal)}px, 0)`
      }
      if (child) {
        const bounding = to - from
        const xProgress = x / bounding
        child.xProgress = xProgress
      }
      el.style.transform = `translate3D(-${x}px, 0, 0)`
    }

    this.dispatch()
    this.vars.previous = this.vars.current
  }

  stickyPositionOf(child) {
    const { top, bottom, height } = child.stickyBounding
    if (this.vars.current < top) return this.vars.current
    if (this.vars.current < bottom - height) return top
    return top + (this.vars.current - (bottom - height))
  }

  showHeader() {
    if (this.headerVisible) return
    if (!this.header) {
      this.setHeader()
      if (!this.header) return
    }
    this.headerVisible = true
    gsap.killTweensOf(this.header)
    gsap.set(this.header, { opacity: 1 })
    gsap.to(this.header, { y: '0%', duration: 0.2, ease: 'power1.out' })
    for (const child of this.children) {
      if (!child.sticky || this.vars.width <= 768) continue
      gsap.to(child.el.querySelector('.p-r'), {
        y: this.headerHeight,
        duration: 0.2,
        ease: 'power1.out',
      })
    }
    // gsap.to(this.header, {opacity: 1, duration: .2, ease: "power1.in"});
  }

  hideHeader({ translate, reset }) {
    if (!this.headerVisible) return
    if (!this.header) {
      this.setHeader()
      if (!this.header) return
    }
    this.inReset = !!reset
    this.headerVisible = false
    gsap.killTweensOf(this.header)
    reset &&
      gsap.fromTo(
        this.topHeader,
        { opacity: 0 },
        { opacity: 1, duration: 0.2, delay: 0.5, ease: 'power1.in' }
      )
    // gsap.to(this.header, {opacity: 0, duration: .2, ease: "power1.out"});
    translate &&
      gsap.to(this.header, {
        y: '-100%',
        duration: 0.2,
        ease: 'power1.out',
        onComplete: () => {
          !translate && gsap.set(this.header, { y: -this.headerHeight })
        },
      })
    for (const child of this.children) {
      if (!child.sticky || this.vars.width <= 768) continue
      gsap.to(child.el.querySelector('.p-r'), { y: 0, duration: 0.2, ease: 'power1.out' })
    }
  }

  getHeaderHeight() {
    return this.headerHeight
  }

  getHorizontalGap() {
    let horizontalGap = 0
    for (const { from, to } of this.vars.horizontalGaps) {
      if (this.vars.current > to) horizontalGap += to - from
    }
    return horizontalGap
  }

  inHorizontalGap() {
    for (const { from, to, el, id } of this.vars.horizontalGaps) {
      if (this.vars.current >= from && this.vars.current <= to)
        return { inGap: true, from, to, el, id }
    }
    return { inGap: false }
  }

  raf() {
    this.inRaf = true
    this.vars.current += (this.vars.target - this.vars.current) * this.vars.elasticity
    this.run({ animations: true, scroll: true })
    this.inTarget() && this.stopRaf()
  }

  startRaf() {
    !this.inRaf && !this.inTarget() && gsap.ticker.add(this._raf)
  }

  stopRaf() {
    gsap.ticker.remove(this._raf)
    this.vars.current = this.vars.target
    this.inRaf = false
  }

  inTarget() {
    return Math.abs(this.vars.current - this.vars.target) < 0.1
  }

  needsTracking(child) {
    return child.tracking && !child.tracked
  }

  track(child) {
    // Do Analytics Tracking
    child.tracked = true
    this.log(`Tracker - Track Analitics for '${child.id}'`)
  }

  needsTransition(child) {
    return child.in && !child.transitioned && child.inOffset
  }

  needsReset(child) {
    const scrollPoint = this.vars.current
    return (
      child.in &&
      child.loop &&
      child.transitioned &&
      child.bounding.top > scrollPoint &&
      !child.inView
    )
  }

  dispatch() {
    this.events.dispatchEvent(this.events.SCROLLING, {
      params: {
        pos: this.vars.current,
        dir: this.vars.direction,
        elasticity: this.vars.elasticity,
        size: this.vars.size,
      },
    })
  }

  scrollToEl(id) {
    const el = this.section.querySelector(`#${id}`)
    if (!el) return
    const backup = window.getComputedStyle(el).transform
    el.style.transform = 'none'
    const { top } = el.getBoundingClientRect()
    el.style.transform = backup
    // const gap = 56 * this.vars.size.screenW / 1440;
    const target = top + (this.isNative ? this.vars.current : 0)
    this.scrollTo(target, true)
  }

  scrollTo(val, animated, promise) {
    return new Promise(async resolve => {
      if (this.isNative) {
        if (animated) {
          await this.utils.loadScript(
            `${process.env.BASE_URL}/js/gsap/ScrollToPlugin.min.js`,
            'ScrollToPlugin'
          )
          gsap.to(window, { duration: 1, scrollTo: val })
        } else {
          document.documentElement.scrollTop = document.body.scrollTop = val
          this.vars.current = val
        }
      }
      if (this.isSmooth) {
        this.vars.target = val
        if (!animated) this.vars.current = this.vars.target
        this.startRaf()
      }
      if (promise && Math.abs(this.vars.current - val) > 1) {
        const it = setInterval(() => {
          if (Math.abs(this.vars.current - val) < 1) {
            resolve()
            clearInterval(it)
          }
        }, 100)
      } else resolve()
    })
  }

  childInView(child) {
    const initPos = Math.ceil(child.bounding.top + this.vars.horizontal)
    const lastPos = Math.ceil(initPos + child.bounding.height)
    const windowSize = this.vars.height
    const scrollPoint = this.vars.current
    return scrollPoint + windowSize > initPos && scrollPoint < lastPos
  }

  childInScroll(child) {
    const initPos = Math.ceil(child.bounding.top + this.vars.horizontal)
    const lastPos = Math.ceil(initPos + child.bounding.height)
    const windowSize = this.vars.height
    const scrollPoint = this.vars.current
    return (
      scrollPoint + windowSize > initPos - child.scrollOffset &&
      scrollPoint < lastPos + child.scrollOffset
    )
  }

  childInOffset(child) {
    if (!child.offset) {
      return child.inView
    }
    const { height } = child.bounding
    const offset = (child.offset / 100) * height
    const initPos = Math.ceil(child.bounding.top + this.vars.horizontal + offset)
    const lastPos = Math.ceil(initPos + child.bounding.height)
    const windowSize = this.vars.height
    const scrollPoint = this.vars.current
    return scrollPoint + windowSize > initPos && scrollPoint < lastPos
  }

  transitionIn() {
    return new Promise(resolve => {
      // const preload = this.section.querySelectorAll("[data-preload]");
      // for (const img of preload) {
      //     this.log("preload", img.src);
      //     await this.utils.preloadImg(img);
      // }
      const children = []
      for (const child of this.children) {
        if (this.needsTransition(child)) {
          children.push(child)
        }
      }
      if (!children.length) {
        resolve()
      } else {
        children.sort((a, b) => {
          return a.duration - b.duration
        })
        for (const i in children) {
          const last = parseInt(i) === children.length - 1
          last ? this.in(children[i], resolve) : this.in(children[i])
        }
      }
    })
  }

  transitionOut() {
    return new Promise(resolve => {
      const children = []
      for (const child of this.children) {
        if (child.out && child.transitioned && child.inView) {
          children.push(child)
        }
      }
      if (!children.length) {
        gsap.to(this.section.querySelector('.page > div'), {
          opacity: 0,
          duration: 0.2,
          ease: 'power1.out',
          onComplete: resolve,
        })
      } else {
        children.sort((a, b) => {
          return a.duration - b.duration
        })
        for (const i in children) {
          const last = parseInt(i) === children.length - 1
          last ? this.out(children[i], resolve) : this.out(children[i])
        }
      }
    })
  }

  customOut() {
    return new Promise(resolve => {
      const children = []
      for (const child of this.children) {
        if (child.customOut && child.transitioned) {
          children.push(child)
        }
      }
      if (!children.length) {
        resolve()
      } else {
        children.sort((a, b) => {
          return a.duration - b.duration
        })
        for (const i in children) {
          const last = parseInt(i) === children.length - 1
          last ? this.out(children[i], resolve, true) : this.out(children[i], () => {}, true)
        }
      }
    })
  }

  in(child, resolve = () => {}) {}

  out(child, resolve = () => {}, custom = false) {}

  resetTransition(child) {}

  getChildBy(id) {
    return this.children.find(child => child.id === id)
  }

  isDefined(n) {
    return n !== undefined && !isNaN(n)
  }

  add(data) {
    this.children.push({
      id: `void-${this.children.length}`,
      el: this._void,
      in: this._void,
      out: this._void,
      inView: true,
      inOffset: true,
      tracked: false,
      transitioned: false,
      ...data,
    })
  }

  getChildren() {
    if (!this.section) this.section = document.querySelector('main')
    const children = this.section.querySelectorAll('[data-track],[data-scroll]')
    this.vars.horizontalGaps = []
    for (const child of children) {
      const {
        tracking,
        transitionIn,
        transitionOut,
        transitionAuto,
        transitionCustomOut,
        transitionLoop,
        scroll,
        scrollSticky,
        scrollStickyParent,
        scrollStickyContent,
        scrollOffset,
        scrollHorizontal,
        transitionDuration,
        transitionDurationIn,
        transitionDurationOut,
        transitionDelay,
        transitionOffset,
        transitionForceUpdate,
      } = child.dataset
      const _scroll = scroll === ''
      const _sticky = scrollSticky === ''
      const _stickyParent = this.section.querySelector(`#${scrollStickyParent}`)
      const _stickyContent = this.section.querySelector(`#${scrollStickyContent}`)
      const _horizontalScroll = scrollHorizontal === ''
      if (_scroll) child.classList.add('wc-t')
      const auto = transitionAuto === undefined || transitionAuto === 'true'
      this.children.push({
        id: child.id,
        el: child,
        scroll: _scroll,
        sticky: _sticky,
        stickyParent: _stickyParent,
        stickyContent: _stickyContent,
        stickyBounding: { top: 0, bottom: 0, height: 0 },
        scrollOffset: parseFloat(scrollOffset) || 50,
        horizontalScroll: _horizontalScroll,
        horizontalEl: null,
        horizontalFrom: 0,
        horizontalTo: 0,
        xProgress: 0,
        yProgress: 0,
        bounding: { top: 0, height: 0 },
        inView: false,
        inOffset: false,
        forceUpdate: transitionForceUpdate,
        auto,
        in: transitionIn,
        out: transitionOut,
        customOut: transitionCustomOut,
        loop: transitionLoop,
        delay: transitionDelay,
        duration: parseFloat(transitionDuration || 0),
        durationIn: parseFloat(transitionDurationIn || 0),
        durationOut: parseFloat(transitionDurationOut || 0),
        offset: parseFloat(transitionOffset) || 0,
        transitioned: false,
        tracking,
        tracked: false,
        backup: '',
      })
      if (this.isSmooth && child.horizontalScroll)
        this.addHorizontalGap(child, bounding, this.children[this.children.length - 1])
    }
    this.log('Tracker - getChildren', this.children)
  }

  setTransitioned(id) {
    const child = this.children.find(child => child.id === id)
    child.auto = true
    child.transitioned = true
  }

  async update({ transition, scroll }) {
    this.updateSize()
    this.vars.horizontalGaps = []
    this.isSmooth && this.cleanTransforms()
    for (const child of this.children) {
      if (child.el === this._void) continue
      const { top: _top, height } = child.el.getBoundingClientRect()
      let top = _top
      if (this.isNative) top += this.vars.current
      const bounding = { top: Math.ceil(top), height: Math.ceil(height) }
      child.bounding = bounding
      child.inView = height !== 0 && this.childInView(child)
      child.inOffset = child.inView && child.in ? this.childInOffset(child) : false
      if (child.sticky) {
        const { top, bottom } = child.stickyParent.getBoundingClientRect()
        const { height } = child.stickyContent.getBoundingClientRect()
        child.stickyBounding = { top, bottom, height }
      }
      if (transition) {
        if (child.loop && child.transitioned && !child.inView) {
          this.resetTransition(child)
        }
        if (child.forceUpdate) {
          child.transitioned = false
        }
      }
      if (this.isSmooth && child.horizontalScroll)
        this.addHorizontalGap(child.el, child.bounding, child)
      this.log(child.el.id || child.el?.classList[0], bounding.top)
    }
    this.isSmooth && this.applyTransforms()
    if (this.isSmooth) {
      for (const { from, to } of this.vars.horizontalGaps) {
        this.vars.bounding += to - from
      }
      this.run({ animations: transition, scroll })
    } else {
      transition && (await this.transitionIn())
    }
    this.log('Tracker - update', this.children)
  }

  cleanTransforms() {
    for (const i in this.children) {
      const child = this.children[i]
      if (child.scroll) {
        child.backup = window.getComputedStyle(child.el).transform
        child.el.style.transform = 'none'
      }
    }
  }

  applyTransforms() {
    for (const i in this.children) {
      const child = this.children[i]
      if (child.scroll) child.el.style.transform = child.backup
    }
  }

  addHorizontalGap(parent, bounding, object) {
    const el = parent.querySelector('.h-scroll')
    el.classList.add('wc-t')
    const { width } = el.getBoundingClientRect()
    let prevGap = 0
    for (const { from, to } of this.vars.horizontalGaps) prevGap += to - from
    const from = prevGap + bounding.top + bounding.height * 0.5 - this.vars.height * 0.5
    const to = from + width - this.vars.width
    object.horizontalFrom = from
    object.horizontalTo = to
    object.horizontalEl = el
    this.vars.horizontalGaps.push({ id: parent.id, el, from, to })
  }

  isInView(id) {
    if (id === 'sticky-header') return this.headerVisible
    this.log(`Search ${id} if its in view or not`)
  }

  reset() {
    this.vars.transitions++
    this.scrollTo(0)
    this.vars.direction = 1
    this.children = []
  }

  start() {
    this.isSmooth && this.setSmooth()
    this.getChildren()
    this.onResize()
    this.inReset = false
  }

  enableScroll() {
    this.disabled = false
  }

  disableScroll() {
    this.disabled = true
  }

  updateSize() {
    const sh = this.section.querySelector('.sh') || this.section.querySelector('.page')
    this.vars.height = window.innerHeight
    this.vars.width = window.innerWidth
    const bounding = sh?.getBoundingClientRect() || { height: 0, width: 0 }
    this.vars.bounding = bounding.height - this.vars.height
    this.vars.size = {
      w: Math.floor(bounding.width),
      h: Math.floor(bounding.height),
      screenW: this.vars.width,
      screenH: this.vars.height,
    }
    this.log('updateSize', this.vars.size)
  }

  onResize() {
    if (!this.section) return
    if (this.isSmooth) {
      this.scrollTo(0)
      for (const child of this.children) {
        if (child.horizontalScroll && child.horizontalEl) {
          child.horizontalEl.style.transform = null
          child.xProgress = 0
        }
        if (!child.scroll) continue
        child.el.style.transform = null
      }
    } else if (window.innerWidth !== this.vars.width) this.scrollTo(0)
    this.updateSize()
    if (this.isSmooth) {
      const page = this.section.querySelector('.page')
      gsap.set(page, { height: this.utils.toPx(this.vars.height) })
    }
    this.vars.mobileTemplate = this.vars.size.screenW <= 768
    this.vars.current = this.getScrollPos()
    this.update({ transition: false, scroll: false })
    this.dispatch()
    this.headerHeight = this.header?.getBoundingClientRect().height || 0
  }

  addEvents() {
    this._onWheel = this.onWheel.bind(this)
    this._onScroll = this.onScroll.bind(this)
    this._onResize = this.onResize.bind(this)
    window.addEventListener('scroll', this._onScroll, { passive: true })
    window.addEventListener('resize', this._onResize, { passive: true })
    this._support.hasWheelEvent &&
      window.addEventListener('wheel', this._onWheel, { passive: false })
    this._support.hasMouseWheelEvent &&
      window.addEventListener('mousewheel', this._onWheel, { passive: false })
  }

  removeEvents() {
    window.removeEventListener('wheel', this._onWheel)
    window.removeEventListener('mousewheel', this._onWheel)
    window.removeEventListener('scroll', this._onScroll)
    window.removeEventListener('resize', this._onResize)
    this.stopRaf()
  }

  destroy() {
    this.scrollTo(0)
    this.removeEvents()
  }

  log(msg, data) {
    this.debug && data && console.log(msg, data)
    this.debug && !data && console.log(msg)
  }
}
