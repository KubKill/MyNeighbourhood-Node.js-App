
function validateForm() {

    const nameInput = document.getElementById('firstName');
    const surnameInput = document.getElementById('lastName');
    const numberInput = document.getElementById('number');
    const emailInput = document.getElementById('email');


    const errorName = document.getElementById("errorImie");
    const errorSurname = document.getElementById("errorNazwisko");
    const errorNumber = document.getElementById("errorNumer");
    const errorEmail = document.getElementById("errorEmail");
    const errorsSummary = document.getElementById("errorsSummary");

    // tu idzie funkcja resetująca
    resetErrors([nameInput, surnameInput, numberInput, emailInput], [errorName, errorSurname, errorNumber, errorEmail], errorsSummary);

    let valid = true;

    if (!checkRequired(nameInput.value)) {
        valid = false;
        nameInput.classList.add("error-input");
        errorName.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(nameInput.value, 2, 60)) {
        valid = false;
        nameInput.classList.add("error-input");
        errorName.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    if (!checkRequired(surnameInput.value)) {
        valid = false;
        surnameInput.classList.add("error-input");
        errorSurname.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(surnameInput.value, 2, 60)) {
        valid = false;
        surnameInput.classList.add("error-input");
        errorSurname.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    if (!checkRequired(numberInput.value)) {
    } else if (!checkPhoneNumber(numberInput.value)) {
        valid = false;
        numberInput.classList.add("error-input");
        errorNumber.innerText = "Pole powinno zawierać tylko cyfry";
    } else if (!checkTextLengthRange(numberInput.value, 3, 15)) {
        valid = false;
        numberInput.classList.add("error-input");
        errorNumber.innerText = "Pole powinno zawierać od 3 do 15 cyfr";
    }

    if (!checkRequired(emailInput.value)) {
    } else if (!checkTextLengthRange(emailInput.value, 5, 60)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = "Pole powinno zawierać od 5 do 60 znaków";
    } else if (!checkEmail(emailInput.value)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = "Pole powinno zawierać prawidłowy adres email";
    }

    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }
    // } else {
    //     //usunięcie klasy errorSumary
    //     errorsSummary.classList.remove("errors-text");
    //     //dodanie klasy confirmationText
    //     errorsSummary.classList.add("confirmed-text");
    //     //podmiana textu na 'Rekord dodany'
    //     errorsSummary.innerText = "Rekord dodany";
    //     valid = false;
    // }

    /// Problem jeżeli metoda zwraca true, to formularz się resetuje, wtedy
    // komunikat o dodaniu rekoirdu widać przez sekundę. Można to zablokować
    // zmieniając wynik metody na false, ale wtedy dane zostają w form
    // lepiej przekierować do strony z info o dodaniu rekordu


    return valid;
}