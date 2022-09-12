const cardNumber = document.getElementById("cardNum");
const cardHolder = document.getElementById("cardHolder");
const cardExpiryMonth = document.getElementById("cardExpiryMonth");
const cardExpiryYear = document.getElementById("cardExpiryYear");
const cardCVC = document.getElementById("cardCVC");
const form = document.getElementById("confirmationForm");
const submitBtn = document.getElementById("submitBtn");
const userInputs = document.querySelectorAll("input");
const inputCardHolder = document.getElementById("in-holderName");
const inputCardNumber = document.getElementById("in-cardNumber");
const inputMonthExpiry = document.getElementById("in-cardExpiryMonth");
const inputYearExpiry = document.getElementById("in-cardExpiryYear");
const inputCardCVC = document.getElementById("in-cardCVC");
const cardDigits = [];

const spaceFormat = function (event) {
    if (event.data === null) {
        cardDigits.pop();
    } else {
        let digit = event.data;
        if ((cardDigits.length + 1)%4 === 0 && (cardDigits.length + 1) < 16) digit += " ";
        cardDigits.push(digit);
    };
    inputCardNumber.value = cardDigits.reduce((acc, currentValue) => acc + currentValue, "");
};

const errorMessageHandler = function (target, message) {
    const parentEl = target.parentElement;
    const errorMessageContainer = parentEl.querySelector(".error-message");
    parentEl.classList.add("error");
    errorMessageContainer.innerHTML = message;
};

const successInput = function (target) {
    const parentEl = target.parentElement;
    parentEl.classList.remove("error");
};

const checkError = function (event) {
    const selectedElement = event.target;
    
    if (selectedElement.id === "in-holderName") {
        if (selectedElement.value.trim().length === 0) {
            errorMessageHandler(selectedElement, "Can't be blank");
        } else if (!(abjadPattern.test(selectedElement.value))) {
            errorMessageHandler(selectedElement, "Wrong format, abjad only");
        } else successInput(selectedElement);
    };

    if (selectedElement.id === "in-cardNumber" || selectedElement.id === "in-cardCVC") {
        if (selectedElement.value.trim().length < selectedElement.maxLength) {
            errorMessageHandler(selectedElement, "Incomplete Number Input");
        } else if (!(numberPattern.test(selectedElement.value))) {
            errorMessageHandler(selectedElement, "Wrong format, number only");
        } else successInput(selectedElement);
    };

    if (selectedElement.id === "in-cardExpiryMonth") {
        if (selectedElement.value.trim().length === 0) {
            errorMessageHandler(selectedElement, "Month can't be blank");
        } else if (!(numberPattern.test(selectedElement.value))) {
            errorMessageHandler(selectedElement, "Wrong format, number only");
        } else if (Number(selectedElement.value) <= 0 || Number(selectedElement.value) > 12) {
            errorMessageHandler(selectedElement, "Month must between 1-12");
        }
        else {
            if (inputYearExpiry.value.trim().length === 0) {
                errorMessageHandler(inputYearExpiry, "Year can't be blank");
            } else if (!(numberPattern.test(inputYearExpiry.value))) {
                errorMessageHandler(inputYearExpiry, "Wrong format, number only");
            } else {
                successInput(inputYearExpiry);
            };
        };
    };

    if (selectedElement.id === "in-cardExpiryYear") {
        if (selectedElement.value.trim().length === 0) {
            errorMessageHandler(selectedElement, "Year can't be blank");
        } else if (!(numberPattern.test(selectedElement.value))) {
            errorMessageHandler(selectedElement, "Wrong format, number only");
        } 
        else {
            if (inputMonthExpiry.value.trim().length === 0) {
                errorMessageHandler(inputMonthExpiry, "Month can't be blank");
            } else if (!(numberPattern.test(inputMonthExpiry.value))) {
                errorMessageHandler(inputMonthExpiry, "Wrong format, number only");
            } else if (Number(inputMonthExpiry.value) <= 0 || Number(inputMonthExpiry.value) > 12) {
                errorMessageHandler(inputMonthExpiry, "Month must between 1-12");
            } else successInput(inputMonthExpiry);
        };
    };
};

inputCardNumber.addEventListener("input", spaceFormat);
userInputs.forEach(input => input.addEventListener("blur", checkError));