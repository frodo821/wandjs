import {Settings, AppMode} from "./core";
import {trigger} from "./utils/event";
import {WandError} from "./errors";
import { register_navigator } from "./navigation";

export function setup(app: string | Element, mode: AppMode) {
    if(typeof app === "string") {
        Settings.instance.app_selector = app;
    } else {
        Settings.instance.app_element = app;
    }
    Settings.instance.app_mode = mode;

    if(!Settings.instance.app_element)
        throw new WandError(`Initialization failed: ${app} is null or could not be found.`);

    Settings.instance.app_element.addEventListener('wakeup', _=>register_navigator());
    trigger(Settings.instance.app_element, 'wakeup');
}