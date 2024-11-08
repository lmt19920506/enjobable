export const on = function(
    element: HTMLElement | Document | Window,
    event: string,
    handler: any, // EventListenerOrEventListenerObject
    useCapture = false,
  ): void {
    if (element && event && handler) {
      element.addEventListener(event, handler, useCapture)
    }
  }
  
  export const off = function(
    element: HTMLElement | Document | Window,
    event: string,
    handler: any, // EventListenerOrEventListenerObject
  ): void {
    if (element && event && handler) {
      element.removeEventListener(event, handler, false)
    }
  }

  export function hasClass(el: HTMLElement, cls: string): boolean {
    if (!el || !cls) return false
    if (cls.indexOf(' ') !== -1)
      throw new Error('className should not contain space.')
    if (el.classList) {
      return el.classList.contains(cls)
    } else {
      return (` ${el.className} `).indexOf(` ${cls} `) > -1
    }
  }

  export function addClass(el: HTMLElement, cls: string): void {
    if (!el) return
    let curClass = el.className
    const classes = (cls || '').split(' ')
  
    for (let i = 0, j = classes.length; i < j; i++) {
      const clsName = classes[i]
      if (!clsName) continue
  
      if (el.classList) {
        el.classList.add(clsName)
      } else if (!hasClass(el, clsName)) {
        curClass += ` ${clsName}`
      }
    }
    if (!el.classList) {
      el.className = curClass
    }
  }
