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
    //create class to cards
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
        }
        //render method to show in the page
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
        //this methon transfer to UAH from dollars. future-proof method.
        //i want to connect to API to get USD exchange rate
        changeToUAH() {
            this.totalPrice = this.transfer * this.totalPrice;
        }
    }

    const getResource = async (url) => {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Ошибка мля. ${url} ${res.status}`);
        }
        return await res.json();
    };

    // getResource("http://localhost:3000/menu").then(data => {
    //     data.forEach(({ img, alt, title, descr, price }) => {
    //         new MenuItem(".menu .container", img, alt, title, descr, price).render();
    //     });
    // });

    axios.get("http://localhost:3000/menu")
        .then(data => {
            data.data.forEach(({ img, alt, title, descr, price }) => {
                new MenuItem(".menu .container", img, alt, title, descr, price).render();
            });
        });
    // getResource("http://localhost:3000/menu")
    //     .then(data => createCard(data));

    // function createCard(data) {
    //     data.forEach(({ img, alt, title, descr, price }) => {
    //         const element = document.createElement("div");
    //         element.classList.add("menu__item");

    //         element.innerHTML = (
    //             `<img src=${img} alt=${alt} />
    //             <h3 class="menu__item-subtitle">${title}</h3>
    //             <div class="menu__item-descr">${descr}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //             </div>`);

    //         document.querySelector(".menu .container").append(element);
    //     });
    // }
    //form

    const forms = document.querySelectorAll("form");

    //  POST sending via different methods; its study project. other methods should be removed

    forms.forEach(form => { postDataByJSONByFetchAPI(form); });
    // forms.forEach(form => { postDataByXMLByFetchAPI(form); });
    // forms.forEach(form => { postDataByJSONByEventListener(form); });
    // forms.forEach(form => { postDataByXMLByEventListener(form); });

    const message = {
        load: "img/form/spinner.svg",
        success: "Спасибо. Мы скоро свяжемся с вами.",
        failure: "УПС... Ошибка"
    };

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: data
        });

        return await res.json();
    };

    function postDataByXMLByEventListener(form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const messageElement = document.createElement("img");
            messageElement.src = message.load;
            form.insertAdjacentElement("afterend", messageElement);

            const request = new XMLHttpRequest();
            request.open("POST", "serverXML.php");
            const formData = new FormData(form);

            request.send(formData);

            request.addEventListener("load", () => {
                if (request.status === 200) {
                    showThanksModal(message.success);
                    console.log(request.response);
                } else {
                    showThanksModal(message.failure);
                }
                form.reset();
                messageElement.remove();
            });
        });
    }

    function postDataByJSONByEventListener(form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            //push in modal after submit event svg img 
            const messageElement = document.createElement("img");
            messageElement.src = message.load;
            messageElement.style.cssText = `display:block; margin:0 auto`;
            form.insertAdjacentElement("afterend", messageElement);

            const request = new XMLHttpRequest();
            request.open("POST", "serverJSON.php");
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
                }
            });
        });
    }


    function postDataByXMLByFetchAPI(form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            //push in modal after submit event svg img 
            const messageElement = document.createElement('img');
            messageElement.src = message.load;
            messageElement.style.cssText = `display:block; margin:0 auto`;
            form.insertAdjacentElement("afterend", messageElement);

            const formData = new FormData(form);

            fetch("serverXML.php", {
                method: 'POST',
                body: formData
            })
                .then(data => data.text())
                .then(data => {
                    showThanksModal(message.success);
                    console.log(data);
                })
                .catch(err => {
                    showThanksModal(message.failure);
                })
                .finally(() => {
                    form.reset();
                    messageElement.remove();
                });

        });
    }

    function postDataByJSONByFetchAPI(form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const messageElement = document.createElement("img");
            messageElement.src = message.load;
            messageElement.style.cssText = `display:block; margin:0 auto`;
            form.insertAdjacentElement("afterend", messageElement);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData("http://localhost:3000/requests", json)
                .then(data => {
                    showThanksModal(message.success);
                    console.log(data);
                })
                .catch(err => {
                    showThanksModal(message.failure);
                })
                .finally(() => {
                    form.reset();
                    messageElement.remove();
                });
        });
    }

    //this function works to show the "thank you" modal window 
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

        //this timer removes the modal window after the time has elapsed
        setTimeout(() => {
            prevModal.classList.add("show");
            prevModal.classList.remove("hide");
            thanksModal.remove();
            closeModal();
        }, 4000);
    }

    fetch("http://localhost:3000/menu")
        .then(data => data.json())
        .then(res => console.log(res));

    // slider

    const sliderWrapper = document.querySelector(".offer__slider"),
        sliderWrapperCounter = document.querySelector(".offer__slider-counter"),
        currentNumberSlide = sliderWrapper.querySelector("#current"),
        slide = sliderWrapperCounter.querySelector(".offer__slide img");

    const sliderArr = [
        "img/slider/food-12.jpg",
        "img/slider/olive-oil.jpg",
        "img/slider/paprika.jpg",
        "img/slider/pepper.jpg"
    ];

    sliderWrapperCounter.addEventListener("click", (event) => {
        event.preventDefault();
        // console.dir(event.target);
        switch (event.target.className || event.target.parentElement.className) {
            case "offer__slider-prev": {
                console.log("Click", currentNumberSlide.innerHTML);
            }
                break;
            case "offer__slider-next": {
                console.log("Click", currentNumberSlide.innerHTML);
            }
                break;
        }
    });



});
