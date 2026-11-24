/* Shared animation setup. Every feature imports gsap from here so plugins load once. */
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Draggable } from 'gsap/Draggable'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger, Draggable)
gsap.defaults({ ease: 'power4.out', duration: 1 })

let lenis: Lenis | null = null

/** Smooth scroll (Lenis), created once on first use. */
export function getLenis(): Lenis {
  if (!lenis) {
    history.scrollRestoration = 'manual'
    scrollTo(0, 0)
    lenis = new Lenis({ lerp: 0.1 })
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((t) => lenis!.raf(t * 1000))
    gsap.ticker.lagSmoothing(0)
  }
  return lenis
}

export const goTo = (target: string) => getLenis().scrollTo(target, { offset: -30, duration: 1.4 })

/* "Page ready" signal. The Loader fires it when it finishes; with no Loader, Base fires it at once.
   Features that animate on entry (nav, hero) wait for it with onReady(). */
let ready = false
export function onReady(cb: () => void) {
  if (ready) cb()
  else addEventListener('site:ready', cb, { once: true })
}
export function markReady() {
  if (ready) return
  ready = true
  getLenis().start()
  ScrollTrigger.refresh()
  dispatchEvent(new Event('site:ready'))
}

export { gsap, ScrollTrigger, Draggable }
