const countryList = {
    AUD: "AU",
    BGN: "BG",
    BRL: "BR",
    CAD: "CA",
    CHF: "CH",
    CNY: "CN",
    CZK: "CZ",
    DKK: "DK",
    GBP: "GB",
    HKD: "HK",
    HUF: "HU",
    IDR: "ID",
    ILS: "IL",
    INR: "IN",
    ISK: "IS",
    JPY: "JP",
    MXN: "MX",
    MYR: "MY",
    NOK: "KR",
    NZD: "NZ",
    PHP: "PH",
    PLN: "PL",
    RON: "RO",
    SEK: "SE",
    SGD: "SG",
    THB: "TH",
    TRY: "TR",
    USD: "US",
    ZAR: "ZA",
};

let Box = document.querySelector(".box");
let nameTag = document.createElement("h3");
nameTag.innerHTML = "<i>Made By Tanmay</i>";
nameTag.style.color = "red";
nameTag.style.marginBottom = "0px";
nameTag.style.textAlign = "end";
Box.append(nameTag);

for (element in countryList) {
    console.log(element, countryList[element]);
}

let select_elements = document.querySelectorAll(".selects")

for (const select of select_elements) {
    for (let code in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = code;
        newOption.value = code;

        if (select.id == "from" && code == "INR" || select.id == "to" && code == "USD") {
            newOption.selected = "selected";
        }

        select.append(newOption);
    }

    // addding eventListener to each option of select

    select.addEventListener("change", (evt) => {
        changeFlag(evt.target);
    })
}


function changeFlag(target) {
    let currencyCode = target.value;
    let countryCode = countryList[currencyCode];
    console.log(countryCode);
    let flagURL = `https://flagsapi.com/${countryCode}/flat/64.png`;
    if (target.id == "from") {
        let fromImage = document.getElementById("from-image");
        console.log(fromImage);
        fromImage.style.backgroundImage = `url(${flagURL})`;
    }

    else if (target.id == "to") {
        let toImage = document.getElementById("to-image");
        toImage.style.backgroundImage = `url(${flagURL})`;
    }
}

let btn = document.getElementById("convert_button");

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    let amountInput = document.getElementById("Amount_input");

    if (amountInput.value < 0) {
        let warning_text = document.querySelector(".warning h6");
        warning_text.innerText = "Negative entries not allowed";
    }
    else if (amountInput.value == "") {
        let warning_text = document.querySelector(".warning h6");
        warning_text.innerText = "Enter some value first";
    }

    else {
        convertCurrency(amountInput.value);
    }
});

async function convertCurrency(amount) {
    let loader = document.querySelector(".next-img");
    loader.classList.add("animate");
    let from = document.querySelector("#from").value;
    let to = document.querySelector("#to").value;

    let baseURL = `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`;
    let response = await fetch(baseURL);
    let result = await response.json();
    console.log(result.rates[to]);
    let answer = document.querySelector("#answer");
    answer.value = result.rates[to];
    loader.classList.remove("animate");
}