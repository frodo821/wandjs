/**
 * Utility functions
 * 
 * @since 0.0.1
 * @author Frodo
 * @copyright 2018 Frodo
 */


 /**
  * Get a selector of an element.
  * @param elem An element to get css selector.
  * @returns CSS selector.
  */
export function getSelector(elem: Element): string {
    if(elem.id) return `#${elem.id}`;

    let p = elem;
    let pp = elem.parentElement;
    let s = [];
    while(pp) {
        let arr = ([] as Array<Element>).slice.call(pp.children);
        let tmp = `:nth-child(${arr.indexOf(p) + 1})`;
        s.push(p.nodeName+tmp);
        p = pp;
        pp = p.parentElement;
    }
    return s.reverse().join('>');
}

/**
 * Wait for an event.
 * @param element Target element
 * @param event Event type to wait
 */
export function waitForEvent(element: EventTarget, event: string): Promise<Event> {
    return new Promise((resolve, _) => {
        function hdr(evt: Event) {
            resolve(evt);
            element.removeEventListener(event, hdr);
        }
        element.addEventListener(event, hdr);
    });
}

/**
 * Wait specific time
 * @param msec wait time in millisecond
 */
export function sleep(msec: number): Promise<void> {
    return new Promise((resolve, _) => setTimeout(resolve, msec));
}