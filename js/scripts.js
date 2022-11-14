"use strict";

document.addEventListener("DOMContentLoaded", () => {

    //tabs

    const tabsContent = document.querySelectorAll(".tabcontent"),
        tabHeaderItemsWrapper = document.querySelector(".tabheader__items"),
        tabHeaderItems = tabHeaderItemsWrapper.querySelectorAll(".tabheader__item");


    hideTabContent();
    showTabContent();



    tabHeaderItemsWrapper.addEventListener("click", (event) => {
        event.preventDefault();
        const target = event.target;
        if (target && target.classList.contains("tabheader__item")) {
            let i = [...tabHeaderItems].findIndex((value => value.innerText === target.innerText));
            hideTabContent();
            showTabContent(i);
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
    function showTabContent(i = 0) {
        tabsContent[i].classList.remove("hide");
        tabsContent[i].classList.add("show");
        tabsContent[i].classList.add("fade");
        tabHeaderItems[i].classList.add("tabheader__item_active");
    }

    //timer

    const deadLine = ("2022-11-19");
    getCountdownTimer(deadLine);

    function getCountdownTimer() {
        const timeToEnd = Date.parse(deadLine) - Date.parse(new Date()),
            days = Math.floor((timeToEnd) / (1000 * 60 * 60 * 24)),
            hours = Math.floor((timeToEnd) / (1000 * 60 * 60) % 24),
            minutes = Math.floor((timeToEnd) / (1000 * 60) % 60),
            seconds = Math.floor((timeToEnd) / (1000) % 60);

        return {
            "days": days,
            "hours": hours,
            "minutes": minutes,
            "seconds": seconds
        };


        console.log(`${days}:${hours}:${minutes}:${seconds}`);

    }

    function showTimer(selector, timeToEndObject) {
        const days = selector.querySelector("#days"),
            hours = selector.querySelector("#hours"),
            minutes = selector.querySelector("#minutes"),
            seconds = selector.querySelector("#seconds");

        days.innerHTML = timeToEndObject.days;
        hours.innerHTML = timeToEndObject.hours;
        minutes.innerHTML = timeToEndObject.minutes;
        seconds.innerHTML = timeToEndObject.seconds;


    }

});