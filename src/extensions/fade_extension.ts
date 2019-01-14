import { Extension } from ".";

/**
 * An extension for fadein fadeout when loading/unloading page.
 */
export class FadeExtension extends Extension {
    private f_elem: HTMLDivElement;

    constructor(fadestyle: string = 'background: white') {
        super('fade');
        this.f_elem = document.createElement('div');
        document.body.appendChild(this.f_elem);
        this.f_elem.id = `fadeout_${Math.round(Math.random() * 10000)}`
        this.f_elem.innerHTML = `
<style>
#${this.f_elem.id} {
    position: fixed;
    margin: 0;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1000;
    transition: 200ms;
    background: transparent;
    pointer-events: none;
}
#${this.f_elem.id}.trans {
    ${fadestyle}
}
</style>
`;
    }

    onPrepareLoad() {
        this.f_elem.classList.add('trans');
    }

    onLoad() {
        this.f_elem.classList.remove('trans');
    }
}
