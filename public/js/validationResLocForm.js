function validateForm() {

    const somsiadInput = document.getElementById('somsiad');
    const odInput = document.getElementById('od');
    const doInput = document.getElementById('do');
    const mieszkanieInput = document.getElementById('mieszkanie');

    const errorSomsiad = document.getElementById("errorSomsiad");
    const errorOd = document.getElementById("errorOd");
    const errorDo = document.getElementById("errorDo");
    const errorMieszkanie = document.getElementById("errorMieszkanie");
    const errorsSummary = document.getElementById("errorsSummary");

    let nowDate = new Date(),
        month = '' + (nowDate.getMonth() + 1),
        day = '' + nowDate.getDate(),
        year = nowDate.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    const nowString = [year, month, day].join('-');

    // tu idzie funkcja resetująca
    resetErrors([somsiadInput, odInput, doInput, mieszkanieInput], [errorSomsiad, errorOd, errorDo, errorMieszkanie], errorsSummary);

    let valid = true;

    if (checkIfDefault(somsiadInput.value)) {
        valid = false;
        somsiadInput.classList.add("error-input");
        errorSomsiad.innerText = "Nie wybrałeś somsiada";
    }

    if (!checkRequired(odInput.value)) {
        valid = false;
        odInput.classList.add("error-input");
        errorOd.innerText = "Pole jest wymagane";
    } else if (!checkDate(odInput.value)) {
        valid = false;
        odInput.classList.add("error-input");
        errorOd.innerText = "Pole powinno zawierać datę w formacie yyy-MM-dd";
    } else if (!checkDateIfAfter(odInput.value, nowString)) {
        valid = false;
        odInput.classList.add("error-input");
        errorOd.innerText = "Data nie może być z przyszłości";
    } else if (checkRequired(doInput.value) && checkDate(doInput.value) && (!checkDateIfAfter(doInput.value, odInput.value))) {
        valid = false;
        doInput.classList.add("error-input");
        errorDo.innerText = "Data do nie może być wcześniejsza niż od";
    }

    if (!checkRequired(doInput.value)) {
    } else if (!checkDate(doInput.value)) {
        valid = false;
        doInput.classList.add("error-input");
        errorDo.innerText = "Pole powinno zawierać datę w formacie yyy-MM-dd";
    } else if (!checkDateIfAfter(doInput.value, nowString)) {
        valid = false;
        doInput.classList.add("error-input");
        errorDo.innerText = "Data nie może być z przyszłości";
    }

    if (checkIfDefault(mieszkanieInput.value)) {
        valid = false;
        mieszkanieInput.classList.add("error-input");
        errorMieszkanie.innerText = "Nie wybrałeś mieszkania";
    }


    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;
}