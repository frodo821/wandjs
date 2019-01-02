import {load_page_async} from './pageLoader';

export function register_navigator() {
    document.querySelectorAll('a:not([href^="http"]):not([href^="//"]):not([data-no-rewrite])')
            .forEach(elem => {
                elem.addEventListener(
                    'click',
                    function(ev) {
                        ev.preventDefault();
                        ev.stopPropagation();
                        navigate(elem.getAttribute('href') || '');
                        return false;
                    });
            });
}

function navigate(url: string) {
    console.log('navigating');
    load_page_async(url);
}