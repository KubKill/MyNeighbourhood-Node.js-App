function validateForm() {

    console.log("Działa metoda")

    const numerInput = document.getElementById('numer');
    const kodpInput = document.getElementById('kodp');
    const ulicaInput = document.getElementById('ulica');
    const nrbudInput = document.getElementById('nrBud');
    const miastoInput = document.getElementById('miasto');
    const rozMieszInput = document.getElementById('rozmMiesz');
    const pietroInput = document.getElementById('pietro');

    const errorNumer = document.getElementById("errorNumer");
    const errorKodp = document.getElementById("errorKodp");
    const errorUlica = document.getElementById("errorUlica");
    const errorNrBud = document.getElementById("errorNrBud");
    const errorMiasto = document.getElementById("errorMiasto");
    const errorRozmMiesz = document.getElementById("errorRozmMiesz");
    const errorPietro = document.getElementById("errorPietro");
    const errorsSummary = document.getElementById("errorsSummary");

    // tu idzie funkcja resetująca
    resetErrors([numerInput, kodpInput, ulicaInput, nrbudInput, miastoInput, rozMieszInput, pietroInput], [errorNumer, errorKodp, errorUlica, errorNrBud, errorMiasto, errorRozmMiesz, errorPietro], errorsSummary);

    let valid = true;

    if (!checkRequired(numerInput.value)) {
        valid = false;
        numerInput.classList.add("error-input");
        errorNumer.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(numerInput.value, 1, 6)) {
        valid = false;
        numerInput.classList.add("error-input");
        errorNumer.innerText = "Pole powinno zawierać od 1 do 6 znaków";
    }

    if (!checkRequired(kodpInput.value)) {
        valid = false;
        kodpInput.classList.add("error-input");
        errorKodp.innerText = "Pole jest wymagane";
    } else if (!checkPhoneNumber(kodpInput.value)) {
        valid = false;
        kodpInput.classList.add("error-input");
        errorKodp.innerText = "Pole powinno zawierać tylko cyfry";
    } else if (!checkTextLengthRange(kodpInput.value, 5, 5)) {
        valid = false;
        kodpInput.classList.add("error-input");
        errorKodp.innerText = "Pole powinno zawierać 5 znaków";
    }

    if (!checkRequired(ulicaInput.value)) {
    } else if (!checkNoNumber(ulicaInput.value, 2, 30)) {
        valid = false;
        ulicaInput.classList.add("error-input");
        errorUlica.innerText = "Pole nie powinno zawierać cyfr";
    } else if (!checkTextLengthRange(ulicaInput.value, 2, 30)) {
        valid = false;
        ulicaInput.classList.add("error-input");
        errorUlica.innerText = "Pole powinno zawierać od 2 do znaków";
    }

    if (!checkRequired(nrbudInput.value)) {
        // valid = false;
        // nrbudInput.classList.add("error-input");
        // errorNrBud.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(nrbudInput.value, 1, 5)) {
        valid = false;
        nrbudInput.classList.add("error-input");
        errorNrBud.innerText = "Pole powinno zawierać od 1 do 5 znaków";
    }

    if (!checkRequired(miastoInput.value)) {
        valid = false;
        miastoInput.classList.add("error-input");
        errorMiasto.innerText = "Pole jest wymagane";
    } else if (!checkNoNumber(miastoInput.value)) {
        valid = false;
        miastoInput.classList.add("error-input");
        errorMiasto.innerText = "Pole nie powinno zawierać cyfr";
    } else if (!checkTextLengthRange(miastoInput.value, 2, 30)) {
        valid = false;
        miastoInput.classList.add("error-input");
        errorMiasto.innerText = "Pole powinno zawierać od 2 do 30 znaków";
    }

    if (!checkRequired(rozMieszInput.value)) {
    } else if (!checkPhoneNumber(rozMieszInput.value)) {
        valid = false;
        rozMieszInput.classList.add("error-input");
        errorRozmMiesz.innerText = "Pole powinno zawierać tylko cyfry";
    } else if (!checkTextLengthRange(rozMieszInput.value, 1, 5)) {
        valid = false;
        rozMieszInput.classList.add("error-input");
        errorRozmMiesz.innerText = "Pole powinno zawierać od 1 do 5 cyfr";
    }

    if (!checkRequired(pietroInput.value)) {
    } else if (!checkPhoneNumber(pietroInput.value)) {
        valid = false;
        pietroInput.classList.add("error-input");
        errorPietro.innerText = "Pole powinno zawierać tylko cyfry";
    } else if (!checkTextLengthRange(pietroInput.value, 1, 3)) {
        valid = false;
        pietroInput.classList.add("error-input");
        errorPietro.innerText = "Pole powinno zawierać od 1 do 3 cyfr";
    }

    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;
}