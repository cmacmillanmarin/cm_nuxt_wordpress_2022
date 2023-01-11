export default function useKeyboard() {
  const onEnter = ref<boolean>(false)

  onMounted(() => {
    window.addEventListener('keypress', _onKeyPress)
  })
  onUnmounted(() => {
    window.removeEventListener('keypress', _onKeyPress)
  })

  function _onKeyPress(e: KeyboardEvent): void {
    if (e.key === 'Enter') onEnter.value = !onEnter.value
  }

  return { onEnter }
}
