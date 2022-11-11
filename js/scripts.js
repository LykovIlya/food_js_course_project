"use strict";

document.addEventListener("DOMContentLoaded", () => {

    const tabContent = document.querySelectorAll(".tabcontent"),
        tabHeaderItems = document.querySelector(".tabheader__items"),
        tabHeaderItem = tabHeaderItems.querySelectorAll(".tabheader__item");
    hideTabContent();

    tabHeaderItem.forEach((tab) => {
        tab.classList.remove("tabheader__item_active");
    });
    tabHeaderItems.addEventListener("click", (event) => {
        event.preventDefault();
        if (event.target && event.target.classList.contains("tabheader__item")) {
            showTabContent(returnIndexOfTabHeaderItem(event.target));
            event.target.classList.toggle("tabheader__item_active");
        }
    });

    function showTabContent(i = 0) {
        console.log("show");
        tabContent[i].classList.remove("hide");
        tabContent[i].classList.add("show");
    }
    function hideTabContent() {
        tabContent.forEach((tab) => {
            tab.classList.add("hide");
        });
    }
    function returnIndexOfTabHeaderItem(item) {
        tabHeaderItem.forEach((tab, index) => {
            if (item === tab) {
                console.log(item === tab);
                return index;
            }
        });
    }
});