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

    const deadLine = ("2022-12-5");
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

    const getResourse = async (url) => {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error("Could not fetch ${url}, status: ${res.status}");
        }
        return await res.json();
    };

    getResourse("http://localhost:3000/menu")
        .then(data => {
            data.forEach(({ img, alt, title, descr, price }) => {
                new MenuItem(".menu .container", img, alt, title, descr, price).render();
            });
        });

    //form

    const forms = document.querySelectorAll("form");

    //  POST sending via different methods; its study project. other methods should be removed

    forms.forEach(form => { postDataByJSONByFetchAPI(form); });

    const message = {
        load: "img/form/spinner.svg",
        success: "Спасибо. Мы скоро свяжемся с вами.",
        failure: "УПС... Ошибка"
    };

    function postDataByJSONByFetchAPI(form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const messageElement = document.createElement("img");
            messageElement.src = message.load;
            messageElement.style.cssText = `display:block; margin:0 auto`;
            form.insertAdjacentElement("afterend", messageElement);

            const formData = new FormData(form);
            const obj = {};
            formData.forEach((value, key) => {
                obj[key] = value;
            });
            fetch("serverJSON.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)
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

    //slider

    const slidesSection = document.querySelector(".offer__slider"),
        sliderWrapperCounter = document.querySelector(".offer__slider-counter"),
        currentNumberSlide = slidesSection.querySelector("#current"),
        totalNumberSlide = slidesSection.querySelector("#total"),
        slides = slidesSection.querySelectorAll(".offer__slide"),
        slidesWrapper = document.querySelector(".offer__slider-wrapper"),
        slidesField = document.querySelector(".offer__slider-inner"),
        widthField = window.getComputedStyle(slidesWrapper).width;


    let sliderIndex = 1;
    let offset = 0;

    slidesField.style.width = 100 * slides.length + "%";
    slidesField.style.display = "flex";
    slidesField.style.transition = "0.5s all";
    slidesWrapper.style.overflow = "hidden";
    slides.forEach(slide => {
        slide.style.width = widthField;
    });

    currentNumberSlide.innerHTML = sliderIndex < 10 ? `0${sliderIndex}` : sliderIndex;
    totalNumberSlide.innerHTML = slides.length > 10 ? slides.length : `0${slides.length}`;

    sliderWrapperCounter.addEventListener("click", (event) => {
        event.preventDefault();
        switch (event.target.className || event.target.parentElement.className) {
            case "offer__slider-prev": {
                if (offset == 0) {
                    offset = Number.parseInt(widthField) * (slides.length - 1);
                } else {
                    offset -= Number.parseInt(widthField);
                }
                sliderIndex = changeCurrentNumber(sliderIndex, false, slides);
                slidesField.style.transform = `translateX(-${offset}px)`;
            }
                break;
            case "offer__slider-next": {
                if (offset == Number.parseInt(widthField) * (slides.length - 1)) {
                    offset = 0;
                } else {
                    offset += Number.parseInt(widthField);
                }
                sliderIndex = changeCurrentNumber(sliderIndex, true, slides);
                slidesField.style.transform = `translateX(-${offset}px)`;
            }
                break;
        }
        currentNumberSlide.innerHTML = sliderIndex;
    });

    function changeCurrentNumber(index, iteration, slidesArr) {
        let num = iteration ? Number.parseInt(index) + 1 : Number.parseInt(index) - 1;
        const totalSlides = Number.parseInt(slidesArr.length);
        if (num > totalSlides) {
            return "01";
        } else if (num < 1) {
            return totalSlides < 10 ? `0${totalSlides}` : totalSlides;
        } else {
            return num < 10 ? `0${num}` : num;
        }
    }
});
