import {Settings, AppMode} from "./core";
import * as errors from './errors';
import {setup} from './initialize';
import * as navigation from './navigation';
import * as spa from './pageLoader';
import * as events from './utils/event';
import * as functions from './utils/functions';
import * as extensions from './extensions';

interface Wand {}

function __wand(app: string | Element, mode?: AppMode): void {
    setup(app, mode);
}

export const wand = Object.assign(__wand, {
    Settings: Settings,
    Extension: extensions.Extension,
    errors: errors,
    setup: setup,
    register_navigator: navigation.register_navigator,
    spa: spa,
    events: events,
    functions: functions
}) as Wand;
