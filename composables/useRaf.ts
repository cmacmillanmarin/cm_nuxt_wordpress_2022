export default function useRaf() {
  function addTicker(callback: Function): void {
    gsap && gsap.ticker.add(callback)
  }

  function killTicker(callback: Function): void {
    gsap && gsap.ticker.remove(callback)
  }

  return { addTicker, killTicker }
}
