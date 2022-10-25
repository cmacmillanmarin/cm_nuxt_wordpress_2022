const _intersectionObserverOptions: IntersectionObserverInit = {
  rootMargin: '60px',
  threshold: 0,
}
function createIntersectionObserver(
  el: Element,
  onIntersect: (el: Element) => void,
  options: Partial<IntersectionObserver> = {}
) {
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        observer.unobserve(entry.target)
        onIntersect(el)
      })
    },
    { ..._intersectionObserverOptions, ...options }
  )

  observer.unobserve(el)
  observer.observe(el)
  return observer
}

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
  nuxtApp.vueApp.directive('intersect', {
    created(el: HTMLElement, binding) {
      const duration: string = binding.value?.duration || ''
      const delay: string = binding.value?.delay || ''
      const intersectionOptions: Partial<IntersectionObserverInit> = {
        rootMargin: binding.value?.offset || _intersectionObserverOptions.rootMargin,
      }
      if (duration) el.style.setProperty('--v-intersect-duration', duration)
      if (delay) el.style.setProperty('--v-intersect-delay', delay)

      switch (binding.arg) {
        // animate and class doing the same thing right now, but separated them for future improvements
        case 'animate':
        case 'class':
          Object.keys(binding.modifiers).forEach(anim => {
            nextTick(() => {
              el.classList.add(`${anim}-init`)
              console.log(`Add ${anim}-init`)
              createIntersectionObserver(
                el,
                () => {
                  console.log(`Add ${anim}`)
                  //   el.classList.add(anim)
                },
                intersectionOptions
              )
            })
          })
          break
        case 'callback':
          createIntersectionObserver(el, binding.value, intersectionOptions)
          break
        default:
          console.warn(
            `v-intersect directive did not recognize the given argument "${binding.arg}"`,
            el
          )
      }
    },
  })
})
