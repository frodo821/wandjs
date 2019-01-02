export type EventArg = {
    name: string,
    canBuble: boolean,
    cancelable: boolean,
    prop: any
}

const isString = (opt: EventArg | string): opt is string => typeof opt === "string";

/**
 * Triggers event to an element.
 * @param elem 
 * @param option 
 */
export function trigger(elem: Element, option: EventArg | string) {
    let opt: EventArg;

    if(isString(option)) {
        opt = {
            name: option,
            canBuble: true,
            cancelable: true,
            prop: undefined
        };
    } else {
        opt = option;
    }

    let evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(opt.name, opt.canBuble, opt.cancelable, opt.prop);
    elem.dispatchEvent(evt);
}
