export default function useKeyboard() {
  const onEnter = ref<boolean>(false)

  onMounted(() => {
    window.addEventListener('keypress', onKeyPress)
  })
  onUnmounted(() => {
    window.removeEventListener('keypress', onKeyPress)
  })

  function onKeyPress(e: KeyboardEvent): void {
    if (e.key === 'Enter') onEnter.value = !onEnter.value
  }

  return { onEnter }
}
