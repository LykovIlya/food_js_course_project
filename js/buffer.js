
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