import {load_page_async} from './pageLoader';

var initialized = false;

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
    if(!initialized) {
        window.addEventListener('popstate', ev=>{
            ev.stopPropagation();
            ev.preventDefault();
            navigate(location.pathname, true);
        });
        initialized = true;
    }
}

function navigate(url: string, onpopstate: boolean = false) {
    load_page_async(url, {onpopstate: onpopstate});
}