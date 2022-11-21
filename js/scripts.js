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
        //open modal by button
        modalTrigger.forEach(button => {
            button.addEventListener("click", (event) => {
                event.preventDefault();
                showModal(modalTrigger);
            });
        });
        window.addEventListener("scroll", showModalByScroll);//open modal by window scroll end event
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

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.body.scrollHeight - 1) {
            showModal();
            window.removeEventListener("scroll", showModalByScroll);
        }
    }

    //menu cards
    const menuWrapper = document.querySelector(".menu__field"),
        menuWrapperContainer = menuWrapper.querySelector(".container"),
        menuWrapperItems = menuWrapper.querySelectorAll(".menu__item");

    menuWrapperContainer.style.flexWrap = "wrap";
    // console.log(menuWrapperContainer.innerHTML);
    menuWrapperItems.forEach(item => {
        console.log(item);
    });
    class MenuItem {
        constructor(containerSelector, imgSrc, imgAlt, subtitle, descr, totalPrice, ...classes) {
            this.containerElement = document.querySelector(containerSelector);
            this.imgSrc = imgSrc;
            this.imgAlt = imgAlt;
            this.subtitle = subtitle;
            this.descr = descr;
            this.totalPrice = totalPrice;
            this.classes = classes.length < 1 ? ["menu__item"] : classes;
            this.transfer = 27;
            this.changeToUAH();
            this.render();
        }
        render() {
            const element = document.createElement('div');
            this.classes.forEach(className => element.classList.add(className));
            element.innerHTML = (`
                <img src=${this.imgSrc} alt=${this.imgAlt} />
                <h3 class="menu__item-subtitle">${this.subtitle}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.totalPrice}</span> грн/день</div>
                </div>
            `);
            this.containerElement.append(element);
        }

        changeToUAH() {
            this.totalPrice = this.transfer * this.totalPrice;
        }
    }
    const itemFitnes = new MenuItem(
        ".menu .container",
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        (`Меню "Фитнес" - это новый подход к приготовлению блюд: больше
        свежих овощей и фруктов.Продукт активных и здоровых людей.Это
        абсолютно новый продукт с оптимальной ценой и высоким качеством!`),
        229,
    );

    const itemPremium = new MenuItem(
        ".menu .container",
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        (`В меню “Премиум” мы используем не только красивый дизайн упаковки,
        но и качественное исполнение блюд. Красная рыба, морепродукты,
        фрукты - ресторанное меню без похода в ресторан!`),
        550,
    );

    const itemPost = new MenuItem(
        ".menu .container",
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        (`Меню “Постное” - это тщательный подбор ингредиентов: полное
        отсутствие продуктов животного происхождения, молоко из миндаля,
        овса, кокоса или гречки, правильное количество белков за счет тофу
        и импортных вегетарианских стейков.`),
        430);


    //form

    const forms = document.querySelectorAll("form");

    forms.forEach(form => { postDataByJSONByEventListener(form); });

    const message = {
        load: "img/form/spinner.svg",
        success: "Спасибо. Мы скоро свяжемся с вами.",
        failure: "УПС... Ошибка"
    };

    function postDataByXMLByEventListener(form) {
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

    function postDataByJSONByEventListener(form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const messageElement = document.createElement("img");
            messageElement.src = message.load;
            messageElement.style.cssText = `display:block; margin:0 auto`;
            // form.append(messageElement);
            form.insertAdjacentElement("afterend", messageElement);


            // const request = new XMLHttpRequest();
            // request.open("POST", "server.php");
            // request.setRequestHeader("Content-Type", "application/json");

            const formData = new FormData(form);
            const obj = {};

            formData.forEach(function (value, key) {
                obj[key] = value;
            });

            // const json = JSON.stringify(obj);


            fetch("server.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)
            })
                .then(data => data.text())
                .then(data => {
                    showThanksModal(message.success);
                    form.reset();
                    console.log(data);
                    messageElement.remove();
                })
                .catch(() => {
                    showThanksModal(message.failure);
                })
                .finally(() => {
                    form.reset();
                    messageElement.remove();
                });

            // request.send(json);

            // request.addEventListener("load", () => {
            //     if (request.status === 200) {
            // showThanksModal(message.success);
            // form.reset();
            // console.log(data);
            // messageElement.remove();
            //     } else {
            //         showThanksModal(message.failure);
            //     }
            // });
        });
    }
    function postDataByXMLByFetchAPI(form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const messageElement = document.createElement("img");
            messageElement.src = message.load;
            messageElement.style.cssText = `display:block; margin:0 auto`;
            form.insertAdjacentElement("afterend", messageElement);
            const formData = new FormData(form);

            fetch("server.php", {
                method: "POST",
                body: formData
            })
                .then(data => data.text())
                .then(data => {
                    showThanksModal(message.success);
                    console.log(data);
                    messageElement.remove();
                })
                .catch(() => { showThanksModal(message.failure); })
                .finally(() => {
                    form.reset();
                    messageElement.remove();
                });
        });
    }

    function postDataByJSONByFetchAPI(form) {

    }



    function showThanksModal(message) {
        const prevModal = document.querySelector(".modal__dialog");

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


        setTimeout(() => {
            prevModal.classList.add("show");
            prevModal.classList.remove("hide");
            thanksModal.remove();
            closeModal();
        }, 4000);
    }
});
