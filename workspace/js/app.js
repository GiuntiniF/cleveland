document.addEventListener('DOMContentLoaded', function() {
    initSidebarPopover();
    initWeatherMenu();
})

function initSidebarPopover() {
    let myPopoverContent = document.createElement("div");
    let ul = document.createElement("ul");
    myPopoverContent.classList.add("popover-list-menu");
    ul.classList.add("list-group", "list-unstyled");
    let myitems = [];
    for(let i=0;i<=5; i++) {
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.classList.add("list-group-item", "list-group-item-action", "item-submenu");
        let mytext = document.createTextNode("Link " + i);
        a.appendChild(mytext);
        li.appendChild(a);
        myitems.push(li);
    }
    myitems.forEach(function(item) {
        ul.appendChild(item);
    });
    myPopoverContent.appendChild(ul);
    let popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
    popoverTriggerList.map(function (popoverTriggerEl) {
        let myPopover = new bootstrap.Popover(popoverTriggerEl, {
            container: document.getElementById('list-menu-id'),
            content: myPopoverContent,
            sanitize: false,
            trigger: 'manual',
            html: true,
            isShown: false
        });
        popoverTriggerEl.addEventListener('mouseenter', function () {
            if(myPopover._config.isShown===false) {
                myPopover._config.isShown = true;
                popoverTriggerEl.classList.add("popover-shown");
                bootstrap.Popover.getInstance(this).show();
            }
        });
        popoverTriggerEl.addEventListener('mouseleave', function (e) {
            if(e.toElement.classList.contains("item-submenu")===false) {
                bootstrap.Popover.getInstance(this).hide();
                popoverTriggerEl.classList.remove("popover-shown");
                myPopover._config.isShown = false;
            }
        });
        popoverTriggerEl.addEventListener('shown.bs.popover', function () {
            const popoverEl = bootstrap.Popover.getInstance(this);
            popoverEl.tip?.addEventListener('mouseleave', function(e) {
                if(e.toElement?.isSameNode(popoverTriggerEl)===false) {
                    popoverEl.hide();
                    popoverTriggerEl.classList.remove("popover-shown");
                    myPopover._config.isShown = false;
                }
            });
        });
        popoverTriggerEl.addEventListener('touchend', function (e) {
            e.preventDefault();
            bootstrap.Popover.getInstance(this).toggle();
        });
        popoverTriggerEl.addEventListener('click', function (e) {
            e.stopPropagation();
        });
        document.getElementById('list-menu-toggler-id').addEventListener('hidden.bs.dropdown', function () {
            bootstrap.Popover.getInstance(popoverTriggerEl).hide();
        });
        return myPopover;
    })
}

function initWeatherMenu() {
    let toggler_mobile = document.getElementById('weather-mobile-toggler-id');
    window.weather_toggler = document.getElementById('weather-toggler-id');
    let weather_menu_close = document.getElementById('weather-menu-close');
    toggler_mobile.addEventListener('click', function() {
        bootstrap.Dropdown.getOrCreateInstance(weather_toggler).show();
    });
    weather_menu_close.addEventListener('click', function() {
        bootstrap.Dropdown.getOrCreateInstance(weather_toggler).hide();
    });
    window.isDropdownShown = false;
    weather_toggler.addEventListener('shown.bs.dropdown', function () {
        document.addEventListener('click', hideDropdown);
        isDropdownShown = true;
    });
    weather_toggler.addEventListener('hidden.bs.dropdown', function () {
        isDropdownShown = false;
        document.removeEventListener('click', hideDropdown);
    });
}

function hideDropdown(e) {
    if(
        e.target.id!=="weather-menu-id" &&
        e.target.id!=="weather-mobile-toggler-id" &&
        e.target.id!=="weather-toggler-id" &&
        e.target.id!=="weather-location-id" &&
        e.target.id!=="weather-submit-id" &&
        isDropdownShown===true
    ) {
        bootstrap.Dropdown.getOrCreateInstance(weather_toggler).hide();
    }
}