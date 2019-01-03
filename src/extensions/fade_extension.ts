import { Extension } from ".";
import { waitForAnimationFrame } from "../utils/functions";

/**
 * An extension for fadein fadeout when loading/unloading page.
 */
export class FadeExtension extends Extension {
    fadein: boolean;
    fadeout: boolean;
    private f_elem: HTMLDivElement;
    private state: number;

    constructor(
            fadein: boolean = true,
            fadeout: boolean = true,
            fadestyle: string = 'background: white') {
        super('fade');
        this.fadein = fadein;
        this.fadeout = fadeout
        this.f_elem = document.createElement('div');
        document.body.appendChild(this.f_elem);
        this.f_elem.setAttribute('style', fadestyle);
        this.state = 0;
    }

    onPrepareLoad() {
        if(!this.fadeout) return;
        (async ()=>{
            this.state = 1;
            this.f_elem.style.opacity = '0';
            let time = 0;
            let opacity = 0;
            while(time < 500) {
                if(this.state !== 1) throw new Error;
                let start = new Date().valueOf();
                await waitForAnimationFrame();
                let delta = new Date().valueOf() - start;
                opacity += delta/500;
                this.f_elem.style.opacity = opacity.toString();
                time += delta;
            }
            this.state = 0;
        })().catch(_=>{});
    }

    onLoad() {
        if(!this.fadein) return;
        (async ()=>{
            this.state = 2;
            this.f_elem.style.opacity = '0';
            let time = 0;
            let opacity = 0;
            while(time < 500) {
                if(this.state !== 2) throw new Error;
                let start = new Date().valueOf();
                await waitForAnimationFrame();
                let delta = new Date().valueOf() - start;
                opacity += delta/500;
                this.f_elem.style.opacity = opacity.toString();
                time += delta;
            }
            this.state = 0;
        })().catch(_=>{});
    }
}