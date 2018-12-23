import {Settings, PageLoadError} from "./core";
import {trigger} from "./utils/event";

export function load_page(url: string) {
    let ret = {a: false};
    load_page_async(url).then(s=>ret.a=s);
    return ret.a;
}

/**
 * Load a page asynchronously.
 * @param url Destination url
 * @param option page load option
 * @returns Returns `true` if page loading was succeeded, otherwise returns `false`.
 */
export async function load_page_async(url: string): Promise<boolean> {
    if(!Settings.instance.app_element) {
        console.error('Framework never have initialized.');
        return false;
    }

    let res = await fetch(url, {
        credentials: 'include',
        redirect: 'follow',
        cache: "no-store"
    });

    if(res.status != 200) {
        trigger(Settings.instance.app_element, {
            name: 'loadfailed',
            canBuble: true,
            cancelable: true,
            prop: new PageLoadError('Framework is not initialized.')
        });
        return false;
    }

    let dom = parseHTML(await res.text());
    if(!dom){
        trigger(Settings.instance.app_element, {
            name: 'loadfailed',
            canBuble: true,
            cancelable: true,
            prop: new PageLoadError("Downloaded page doesn't have a structure same as this page.", location.pathname, url)
        });
        return false
    };

    trigger(Settings.instance.app_element, 'destroy');
    Settings.instance.app_element.innerHTML = dom.innerHTML;
    trigger(Settings.instance.app_element, 'load');
    trigger(Settings.instance.app_element, 'wakeup');
    return true;
}

/**
 * Parse HTML source text and return dom.
 * @param src Parse target
 * @param raw This flag is true, returns all contents. Otherwise returns the result of `dom.querySelector(Settings.instance.app_selector)`.
 */
export function parseHTML(src: string, raw: boolean = false): Element | null {
    var h = document.createElement('html');
    h.innerHTML = src;
    if(raw)
        return h;
    return h.querySelector(Settings.instance.app_selector);
}
