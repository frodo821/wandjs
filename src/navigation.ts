import {load_page_async} from './pageLoader';

export function register_navigator() {
    document.querySelectorAll('a:not([href^="http"]):not([href^="//"]):not([data-no-rewrite])')
            .forEach(elem => {
                elem.addEventListener(
                    'click',
                    function(ev) {
                        ev.preventDefault();
                        navigate(elem.getAttribute('href') || '');
                    });
            });
}

function navigate(url: string) {
    load_page_async(url);
}