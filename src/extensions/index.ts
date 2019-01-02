import { Settings } from "../core";
import { FrameworkUninitializedError } from "../errors";

export class Extension {
    name: string;

    constructor(name: string) {
        this.name = name;
        let e = Settings.instance.app_element;
        if(!e)
            throw new FrameworkUninitializedError;
        e.addEventListener('wakeup', this.onWakeup);
        e.addEventListener('load', this.onLoad);
        e.addEventListener('prepareload', this.onPrepareLoad);
        e.addEventListener('destroy', this.onDestroy);
        e.addEventListener('tick', this.onTick);
        e.addEventListener('latetick', this.onLateTick);
    }

    /**
     * This function will be invoked when load event is occurred.
     */
    onLoad() {}

    /**
     * This function will be invoked when wakeup event is occurred.
     */
    onWakeup() {}

    /**
     * This function will be invoked when prepareload event is occurred.
     */
    onPrepareLoad() {}

    /**
     * This function will be invoked when destroy event is occurred.
     */
    onDestroy() {}

    /**
     * This function will be invoked when tick event is occurred.
     */
    onTick() {}

    /**
     * This function will be invoked when latetick event is occurred.
     */
    onLateTick() {}
}