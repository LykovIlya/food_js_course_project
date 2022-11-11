"use strict";

document.addEventListener("DOMContentLoaded", () => {

    const tabsContent = document.querySelectorAll(".tabcontent"),
        tabHeaderItemsWrapper = document.querySelector(".tabheader__items"),
        tabHeaderItems = tabHeaderItemsWrapper.querySelectorAll(".tabheader__item");

    let TABCONTENTINDEX = 0;

    hideTabContent();
    showTabContent(0);

    tabHeaderItemsWrapper.addEventListener("click", (event) => {
        event.preventDefault();
        if (event.target && event.target.classList.contains("tabheader__item")) {
            const target = event.target.innerText;
            let i;
            tabHeaderItems.forEach((item, index) => {
                if (item.innerText == target) {
                    console.log(item.innerText == target);
                    console.log("getter:" + index);
                    i = index;
                }
            });
            if (TABCONTENTINDEX != i) {
                hideTabContent();

                showTabContent(+i);
            }
        }
    });

    function hideTabContent() {
        tabHeaderItems.forEach((tab) => {
            tab.classList.remove("tabheader__item_active");
        });
        tabsContent.forEach(tab => {
            tab.classList.remove("fade");
            tab.classList.remove("show");
            tab.classList.add("hide");

        });
    }
    function showTabContent(i) {
        // console.log("show:" + i);
        // console.log(tabsContent[i]);
        // console.log(tabHeaderItems[i]);

        tabsContent[i].classList.remove("hide");
        tabsContent[i].classList.add("show");
        tabsContent[i].classList.add("fade");
        tabHeaderItems[i].classList.add("tabheader__item_active");
        TABCONTENTINDEX = i;
    }
});