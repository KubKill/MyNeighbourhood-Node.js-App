function confirmDelete(path) {
    if (confirm("Czy na pewno chcesz usunąć rekord?")) {
        window.location = path;
        // window.opener.location.replace(path);
        window.close();
    };
}


function resetErrors(inputs, errorTexts, errorInfo) {
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].classList.remove("error-input");
    }
    for (let i = 0; i < errorTexts.length; i++) {
        errorTexts[i].innerText = "";
    }
    errorInfo.innerText = "";
}

function checkRequired(value) { //!null to true
    if (!value) { // to sprawdza czy jest brak
        return false;
    }
    value = value.toString().replace(/\s/g, ''); // to usówa spacje
    if (value === "") { // to sprawdza czy są takie same, nie zmienia typów
        return false;
    }
    return true;
}

function checkTextLengthRange(value, min, max) {
    if (!value) {
        return false;
    }
    value.toString().replace(/\s/g, '');
    const length = value.length;
    if (length > max) {
        return false;
    }
    if (length < min) {
        return false;
    }

    return true;
}

function checkEmail(value) {
    if (!value) {
        return false;
    }
    value = value.toString().replace(/\s/g, '');
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(value);
}

function checkPhoneNumber(value) {
    if (!value) {
        return false;
    }
    value = value.toString().replace(/\s/g, '')
    const re = /^\d+$/;
    return re.test(value);
}

function checkNoNumber(value) {
    if (!value) {
        return false;
    }
    const re = /^([^0-9]*)$/;
    return re.test(value);
}

function checkIfDefault(value) {
    if (value == '...') {
        return true;
    }
    return false
}

function checkDate(value) {
    if (!value) {
        return false;
    }
    const pattern = /(\d{4})-(\d{2})-(\d{2})/;
    return pattern.test(value);
}

function checkDateIfAfter(value, compareTo) {
    if (!value) {
        return false;
    }
    if (!compareTo) {
        return false;
    }
    const pattern = /(\d{4})-(\d{2})-(\d{2})/;
    if (!pattern.test(value)) {
        return false;
    }
    if (!pattern.test(compareTo)) {
        return false;
    }
    const valueDate = new Date(value);
    const compareToDate = new Date(compareTo);
    if (valueDate.getTime() > compareToDate.getTime()) {
        return false;
    }
    return true;

}