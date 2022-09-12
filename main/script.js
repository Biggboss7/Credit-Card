const cardNumber = document.getElementById("cardNum");
const cardHolder = document.getElementById("cardHolder");
const cardExpiry = document.getElementById("cardExpiry");
const cardCVC = document.getElementById("cardCVC");
const form = document.getElementById("confirmationForm");
const submitBtn = document.getElementById("submitBtn");
const userInputs = document.querySelectorAll("input");
const inputCardNumber = document.getElementById("in-cardNumber");
const inputMonthExpiry = document.getElementById("in-cardExpiryMonth");
const inputYearExpiry = document.getElementById("in-cardExpiryYear");
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

