import {Settings} from "./core";
import {PageLoadError, FrameworkUninitializedError} from "./errors";
import {trigger} from "./utils/event";

export type LoadOption = {
    force?: boolean,
    onpopstate?: boolean
}

var cache: {[key: string]: Element} = {};

/**
 * Load page, but don't wait page loading.
 * @param url Destination url
 * @param option page load options
 */
export function load_page(url: string, option?: LoadOption) {
    load_page_async(url, option).then(_=>{})
}

/**
 * Load a page asynchronously.
 * @param url Destination url
 * @param option page load options
 * @returns Returns `true` if page loading was succeeded, otherwise returns `false`.
 */
export async function load_page_async(url: string, option?: LoadOption): Promise<void> {
    if(!Settings.instance.app_element) {
        throw new FrameworkUninitializedError;
    }

    option = option || {force: false, onpopstate: false};

    trigger(Settings.instance.app_element, 'prepareload');

    try {
        var dom = await _getcontent(url, option.force || false);
    } catch(error) {
        trigger(Settings.instance.app_element, {
            name: 'loadfailed',
            canBuble: true,
            cancelable: true,
            prop: error
        });
        return;
    }

    if(!option.onpopstate)
        history.pushState(null, '', url);

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

/**
 * Purge all cached pages.
 */
export function purge() {
    Object.keys(cache).forEach(name => {
        delete cache[name];
    });
}

async function _getcontent(url: string, force: boolean): Promise<Element> {
    if(force && cache.hasOwnProperty(url)) {
        return cache[url];
    }

    let res = await fetch(url, {
        credentials: 'include',
        redirect: 'follow',
        cache: "no-store"
    });

    if(res.status != 200) {
        throw new PageLoadError(`Download failed with the status ${res.status}`, location.pathname, url);
    }

    let dom = parseHTML(await res.text());

    if(!dom) {
        throw new PageLoadError("Downloaded page doesn't have a structure same as this page.", location.pathname, url);
    }

    cache[url] = dom;
    return dom;
}
