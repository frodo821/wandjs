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