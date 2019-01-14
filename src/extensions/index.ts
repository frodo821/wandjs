import { FrameworkUninitializedError } from "../errors";

export class Extension {
    name: string;

    constructor(name: string) {
        this.name = name;
        let e = (window as any).wand.Settings.instance.app_element as Element;
        if(!e)
            throw new FrameworkUninitializedError;
        console.log(JSON.stringify(this));
        e.addEventListener('wakeup', this.onWakeup.bind(this));
        e.addEventListener('load', this.onLoad.bind(this));
        e.addEventListener('prepareload', this.onPrepareLoad.bind(this));
        e.addEventListener('destroy', this.onDestroy.bind(this));
        e.addEventListener('tick', this.onTick.bind(this));
        e.addEventListener('latetick', this.onLateTick.bind(this));
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