const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for(let select of dropdowns) {
    for(currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        select.append(newOption);
    }
    select.addEventListener("change", (evt)=>{
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
     let currCode = element.value;
     let countryCode = countryList[currCode];
     let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

const fetchExchangeRate = async (from, to) => {
    const apiKey = 'c07bad654877128c36774f07'; // API key
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${from}`;

    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    
    if(amtVal === "" || amtVal<1) {
        amtVal = 1;
        amount.value = "1";
        }

    const response = await fetch(url);
    const data = await response.json();
    const rate = data.conversion_rates[to];
    let finalAmount = amtVal * rate;
    console.log(finalAmount);
    msg.innerText = `${amtVal} ${from} = ${finalAmount} ${to}`;
    
    console.log(`1 ${from} = ${rate} ${to}`);
};

btn.addEventListener("click", async (evt)=> {
   evt.preventDefault();
   fetchExchangeRate(fromCurrency.value , toCurrency.value);
});

window.addEventListener("load" , () => {
    fetchExchangeRate(fromCurrency.value , toCurrency.value);
});