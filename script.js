function formatoCLP(valor){

return new Intl.NumberFormat('es-CL', {
style: 'currency',
currency: 'CLP',
minimumFractionDigits: 0
}).format(valor);

}

function simular(){

let aporte = document.getElementById("monthly").value;
let years = document.getElementById("years").value;
let bank = document.getElementById("bank").value;
let market = document.getElementById("market").value;

let months = years * 12;

let ahorro = aporte * months;

let bankCapital = 0;
let marketCapital = 0;

let bankRate = bank / 100 / 12;
let marketRate = market / 100 / 12;

for(let i=0; i<months; i++){

bankCapital = bankCapital * (1 + bankRate);
bankCapital = bankCapital + Number(aporte);

marketCapital = marketCapital * (1 + marketRate);
marketCapital = marketCapital + Number(aporte);

}

document.getElementById("results").innerHTML =
`
Ahorro sin interés: ${formatoCLP(ahorro)} <br><br>
Banco: ${formatoCLP(bankCapital)} <br><br>
Mercado: ${formatoCLP(marketCapital)}
`;

}
