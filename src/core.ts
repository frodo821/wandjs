/**
 * Core module.
 * 
 * @since 0.0.1
 * @author Frodo
 * @copyright 2018 Frodo
 */

import {getSelector} from './utils/functions';

export type AppMode = "development" | "product" | undefined;

 /**
  * This class is a singleton which holds all your app settings.
  * * DO NOT TRY TO INSTANTIATE YOUR SELF!!
  * * Use `Settings.instance` instead of `new Settings`.
  */
export class Settings {
    private static _instance: Settings | null = null;
    private _app_element: Element | null = null;
    private _app_selector: string | null = null;

    /**
     * Application execution mode
     */
    app_mode: AppMode;

    /**
     * Get the instance of Settings class.
     * @returns The instance of the class.
     */
    public static get instance() : Settings {
        if(!Settings._instance) {
            Settings._instance = new Settings;
        }
        return Settings._instance;
    }

    /**
     * The root element of your application.
     */
    public get app_element() : Element | null {
        return this._app_element;
    }

    public set app_element(v : Element | null) {
        this._app_element = v;
        if(v)
            this._app_selector = getSelector(v);
    }

    public set app_selector(v : string) {
        this._app_element = document.querySelector(v);
        this._app_selector = v;

        if(!this._app_element) {
            throw new TypeError(`There is no element matching the selector: ${v}`);
        }
    }
    
    public get app_selector(): string {
        return this._app_selector || '';
    }
}

export class WandError extends Error {
    constructor(message: any) {
        super(`WandError:${message}`)
    }
}

export class PageLoadError extends WandError {
    reason: string | null;
    frompage: string | null;
    topage: string | null;

    constructor(
            reason: string | null = null,
            frompage: string | null = null,
            topage: string | null = null) {
        super(`Page loading failed(${frompage}, ${topage}):${reason}`)
        this.reason = reason;
        this.frompage = frompage;
        this.topage = topage;
    }
}