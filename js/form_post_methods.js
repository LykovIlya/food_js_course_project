//============================================================================

const forms = document.querySelectorAll("form");

const message = {
    loading: "Загрузка",
    success: "Спасибо! Скоро мы с вами свяжемся",
    failure: "Что-то пошло не так"
};

forms.forEach(form => {
    postData(form);
});

function postData(form) {
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const statusMessage = document.createElement("div");
        statusMessage.classList.add("status");
        statusMessage.textContent = message.loading;
        form.append(statusMessage);
        const request = new XMLHttpRequest();
        request.open("POST", "server.php");

        // request.setRequestHeader("Content-Type", "multipart");
        const formData = new FormData(form);

        request.send(formData);

        request.addEventListener("load", () => {
            if (request.status === 200) {
                console.log(request.response);
                statusMessage.textContent = message.success;
                form.reset();
            } else {
                statusMessage.textContent = message.failure;
            }
            setTimeout(() => { statusMessage.textContent = ""; }, 1000);
        });
    });
}
function postData(form) {
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const statusMessage = document.createElement("div");
        statusMessage.classList.add("status");
        statusMessage.textContent = message.loading;
        form.append(statusMessage);
        const request = new XMLHttpRequest();
        request.open("POST", "server.php");

        request.setRequestHeader("Content-Type", "application/json");

        const formData = new FormData(form);
        // console.log(formData);

        const object = {};

        formData.forEach(function (value, key) {
            // console.log(key, value);
            object[key] = value;
        });

        const json = JSON.stringify(object);

        request.send(json);

        request.addEventListener("load", () => {
            if (request.status === 200) {
                console.log(request.response);
                statusMessage.textContent = message.success;
                form.reset();
            } else {
                statusMessage.textContent = message.failure;
            }
            setTimeout(() => { statusMessage.textContent = ""; }, 1000);
        });
    });
}

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
