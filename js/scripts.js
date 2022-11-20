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

    const deadLine = ("2022-11-17");
    setTimer(".timer", deadLine);


    function getTimeRemaining(deadLine) {
        const total = Date.parse(deadLine) - Date.parse(new Date()),
            days = Math.floor((total) / (1000 * 60 * 60 * 24)),
            hours = Math.floor((total) / (1000 * 60 * 60) % 24),
            minutes = Math.floor((total) / (1000 * 60) % 60),
            seconds = Math.floor((total) / (1000) % 60);

        if (total < 0) {
            return {
                "total": 0,
                "days": 0,
                "hours": 0,
                "minutes": 0,
                "seconds": 0
            };
        } else {
            return {
                "total": total,
                "days": days > 9 ? days : `0${days}`,
                "hours": hours > 9 ? hours : `0${hours}`,
                "minutes": minutes > 9 ? minutes : `0${minutes}`,
                "seconds": seconds > 9 ? seconds : `0${seconds}`,
            };
        }
    }

    function setTimer(cssClass, deadLine) {
        const selector = document.querySelector(cssClass);
        const days = selector.querySelector("#days"),
            hours = selector.querySelector("#hours"),
            minutes = selector.querySelector("#minutes"),
            seconds = selector.querySelector("#seconds"),
            timeInterval = setInterval(updateTimer, 1000);
        updateTimer();

        function updateTimer() {
            const total = getTimeRemaining(deadLine);
            days.innerHTML = total.days;
            hours.innerHTML = total.hours;
            minutes.innerHTML = total.minutes;
            seconds.innerHTML = total.seconds;

            if (total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    //modal

    const modalTrigger = document.querySelectorAll("[data-modal]"),
        modal = document.querySelector(".modal"),
        modalClose = modal.querySelector(".modal__close");

    const modalTimer = setTimeout(showModal, 10000);
    showAndHideModal(modalTrigger, modal, modalClose);

    function showAndHideModal(modalTrigger, modal, modalClose) {
        modalTrigger.forEach(button => {
            button.addEventListener("click", (event) => {
                event.preventDefault();
                showModal(modalTrigger);
            });
        });
        modal.addEventListener("click", closeModalEvent);
        modalClose.addEventListener("click", closeModalEvent);
        document.addEventListener("keydown", closeModalEvent);
    }

    function closeModalEvent(event = true) {
        if (event.target === modal ||
            event.target === modalClose ||
            (event.code === "Escape" && modal.classList.contains("show"))) {
            event.preventDefault();
            closeModal();
        }
    }
    function closeModal() {
        modal.classList.add("hide");
        modal.classList.remove("show");
        document.body.style.overflow = "";
    }

    function showModal() {
        modal.classList.add("show");
        modal.classList.remove("hide");
        document.body.style.overflow = "hidden";
        clearInterval(modalTimer);
    }

    //form

    const forms = document.querySelectorAll("form");

    forms.forEach(form => { postDataByJSON(form); });

    const message = {
        load: "img/form/spinner.svg",
        success: "Спасибо. Мы скоро свяжемся с вами.",
        failure: "УПС... Ошибка"
    };

    function postDataByXML(form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const messageElement = document.createElement("div");
            messageElement.innerHTML = message.load;
            form.append(messageElement);
            const response = new XMLHttpRequest();
            response.open("POST", "server.php");
            const formData = new FormData(form);

            response.send(formData);

            response.addEventListener("load", () => {
                if (response.status === 200) {
                    messageElement.innerHTML = message.success;
                    console.log("success");
                } else {
                    messageElement.innerHTML = message.failure;
                }
            });
        });
    }

    function postDataByJSON(form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const messageElement = document.createElement("img");
            messageElement.src = message.load;
            messageElement.style.cssText = `display:block; margin:0 auto`;
            // form.append(messageElement);
            form.insertAdjacentElement("afterend", messageElement);

            const request = new XMLHttpRequest();
            request.open("POST", "server.php");
            request.setRequestHeader("Content-Type", "application/json");

            const formData = new FormData(form);
            const obj = {};

            formData.forEach(function (value, key) {
                obj[key] = value;
            });

            const json = JSON.stringify(obj);
            request.send(json);
            request.addEventListener("load", () => {
                if (request.status === 200) {
                    showThanksModal(message.success);
                    form.reset();
                    console.log(request.response);
                    messageElement.remove();
                } else {
                    showThanksModal(message.failure);
                    messageElement.remove();
                }
            });
        });
    }

    function showThanksModal(message) {
        console.log(message);
        const prevModal = document.querySelector(".modal__dialog");
        console.log(prevModal);

        prevModal.classList.remove("show");
        prevModal.classList.add("hide");
        showModal();

        const thanksModal = document.createElement("div");
        thanksModal.classList.add("modal__dialog");
        thanksModal.innerHTML = `
        <div class="modal__content">
        <div class="modal__close>x</div>
        <div class="modal__title">${message}</div>
        </div>
        `;
        document.querySelector(".modal").append(thanksModal);

        // thanksModal.classList.add("modal__dialog");
        // document.querySelector(".modal").append(thanksModal);
        setTimeout(() => {
            prevModal.classList.add("show");
            prevModal.classList.remove("hide");
            thanksModal.remove();
            closeModal();
        }, 4000);
    }
});
