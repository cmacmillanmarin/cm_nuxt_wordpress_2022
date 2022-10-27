import useStore from '~/store/useStore'

function loader() {
  return new Promise(resolve => {
    setTimeout(resolve, 100) // loading time
  })
}

export default defineNuxtPlugin(async nuxtApp => {
  const store = useStore()
  console.log('Load App bitch!')
  await loader()
  console.log('App Loaded bitch!')
  store.updateLoaded(true)
})
