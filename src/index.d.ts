import {AppMode} from './core';
import {EventArg} from './utils/event';

declare global {
    interface Window {
        wand: Wand;
    }

    interface WandSPAModule {
        load_page(url: string, force?: boolean): void;
        load_page_async(url: string, force?: boolean): Promise<void>;
        parseHTML(src: string, raw?:boolean): Element | null;
        purge(): void;
    }

    module WandErrorModule {
        class WandError{}
        class FrameworkUninitializedError extends WandError{}
        class PageLoadError extends WandError{}
    }

    interface WandNavigationModule {
        register_navigator(): void;
    }

    module WandCoreModule {
        class Settings {
            instance: {
                app_element: Element,
                app_selector: string
            }
        }
    }

    module WandExtensionModule {
        class Extension {}
    }

    interface WandEventModule {
        trigger(elem: Element, option: EventArg | string): void;
    }

    interface WandFunctionModule {
        getSelector(elem: Element): string
    }

    interface Wand {
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
}