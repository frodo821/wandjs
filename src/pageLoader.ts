import {Settings} from "./core";
import {PageLoadError, FrameworkUninitializedError} from "./errors";
import {trigger} from "./utils/event";

export function load_page(url: string) {
    let ret = {a: false};
    load_page_async(url).then(_=>{});
    return ret.a;
}

/**
 * Load a page asynchronously.
 * @param url Destination url
 * @returns Returns `true` if page loading was succeeded, otherwise returns `false`.
 */
export async function load_page_async(url: string): Promise<void> {
    if(!Settings.instance.app_element) {
        throw new FrameworkUninitializedError;
    }

    trigger(Settings.instance.app_element, 'prepareload');

    let res = await fetch(url, {
        credentials: 'include',
        redirect: 'follow',
        cache: "no-store"
    });

    if(res.status != 200) {
        let error = new PageLoadError(`Download failed with the status ${res.status}`, location.pathname, url);
        trigger(Settings.instance.app_element, {
            name: 'loadfailed',
            canBuble: true,
            cancelable: true,
            prop: error
        });
        throw error;
    }

    let dom = parseHTML(await res.text());
    if(!dom){
        let error = new PageLoadError("Downloaded page doesn't have a structure same as this page.", location.pathname, url);
        trigger(Settings.instance.app_element, {
            name: 'loadfailed',
            canBuble: true,
            cancelable: true,
            prop: error
        });
        throw error;
    };

    trigger(Settings.instance.app_element, 'destroy');
    Settings.instance.app_element.innerHTML = dom.innerHTML;
    trigger(Settings.instance.app_element, 'load');
    trigger(Settings.instance.app_element, 'wakeup');
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
