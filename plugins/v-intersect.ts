/**
 *
 * - Animations: v-intersect:animate.[NAME]
 *      Available animations (./assets/css/intersect.scss):
 *         · fade
 *         · translate
 *
 * - Callback: v-intersect:callback="[CALLBACK]"
 *
 */

function createIntersectionObserver(
  el: Element,
  onIntersect: (el: Element) => void
): IntersectionObserver {
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        observer.unobserve(entry.target)
        onIntersect(el)
      })
    },
    {
      rootMargin: '0px',
      threshold: 0.25,
    }
  )

  observer.unobserve(el)
  observer.observe(el)
  return observer
}

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.directive('intersect', {
    created(el: HTMLElement, binding): void {
      switch (binding.arg) {
        case 'animate':
          Object.keys(binding.modifiers).forEach(anim => {
            nextTick(() => {
              createIntersectionObserver(el, () => {
                el.classList.add(anim)
              })
            })
          })
          break
        case 'callback':
          createIntersectionObserver(el, binding.value)
          break
        default:
          console.warn(`v-intersect :: undefined directive "${binding.arg}"`, el)
      }
    },
  })
})
