/**
 * The most basis of all framework error classes.
 */
export class WandError extends Error {
    constructor(message: any) {
        super(`WandError:${message}`)
    }
}

/**
 * This error will be thrown when you try to use any framework function without proper framework initialization.
 */
export class FrameworkUninitializedError extends WandError {
    constructor() {
        super("Framework never initialized.");
    }
}

/**
 * This error will be thrown when framework fails to load a page.
 * @property {string} reason Why page loading failed?
 * @property {string} frompage Where does the framework navigate from?
 * @property {string} topage Where does the framework navigate to?
 * @see WandError
 */
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
