import {AppMode} from './core';
import {EventArg} from './utils/event';

declare interface WandSPAModule {
    load_page(url: string, force?: boolean): void;
    load_page_async(url: string, force?: boolean): Promise<void>;
    parseHTML(src: string, raw?:boolean): Element | null;
    purge(): void;
}

declare module WandErrorModule {
    class WandError{}
    class FrameworkUninitializedError extends WandError{}
    class PageLoadError extends WandError{}
}

declare interface WandNavigationModule {
    register_navigator(): void;
}

declare module WandCoreModule {
    class Settings {}
}

declare module WandExtensionModule {
    class Extension {}
}

declare interface WandEventModule {
    trigger(elem: Element, option: EventArg | string): void;
}

declare interface WandFunctionModule {
    getSelector(elem: Element): string
}

declare interface Wand {
    setup(app: string | Element, mode: AppMode): void;
    register_navigator(): void;
    spa: WandSPAModule;
    Settings: WandCoreModule.Settings;
    Extension: WandExtensionModule.Extension;
    errors: any;
    events: WandEventModule;
    functions: WandFunctionModule;
    (app: string | Element, mode: AppMode): void;
}