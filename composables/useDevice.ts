//
// requires:
// ~/composables/useResize
//

export default function useDevice() {
  const { onResize } = useResize()

  const touch = ref<boolean>(false)
  const safari = ref<boolean>(false)

  onMounted(_update)
  watch(onResize, _update)

  function _update(): void {
    // let breakpoint = window.getComputedStyle(document.body, "::before").getPropertyValue("content");
    //     this.state.device.breakpoint = breakpoint.replaceAll('"', "");
    //     this.state.device.isMobileTemplate = breakpoint.includes("mobile");
    //     this.state.device.isTabletTemplate = !this.state.device.isMobileTemplate && breakpoint.includes("tablet");
    //     this.state.device.isDesktopTemplate = !this.state.device.isMobileTemplate && !this.state.device.isTabletTemplate;
    touch.value = !!window.getComputedStyle(document.body, ':after').getPropertyValue('--touch')
    safari.value =
      navigator.userAgent.indexOf('Safari') > -1 && navigator.userAgent.indexOf('Chrome') <= -1

    // touch.value = true
  }

  return { touch, safari }
}
