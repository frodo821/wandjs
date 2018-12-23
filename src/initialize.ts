import {Settings, AppMode} from "./core";
import {trigger} from "./utils/event";

export function setup(app: string | Element, mode: AppMode) {
    if(typeof app === "string") {
        Settings.instance.app_selector = app;
    } else {
        Settings.instance.app_element = app;
    }
    Settings.instance.app_mode = mode;

    if(Settings.instance.app_element)
        trigger(Settings.instance.app_element, 'wakeup');
}