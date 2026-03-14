function formatoCLP(valor){

return new Intl.NumberFormat('es-CL', {
style: 'currency',
currency: 'CLP',
minimumFractionDigits: 0
}).format(valor);

}

function simular(){

let aporte = Number(document.getElementById("monthly").value);
let years = Number(document.getElementById("years").value);
let bank = Number(document.getElementById("bank").value);
let market = Number(document.getElementById("market").value);

let months = years * 12;

let ahorro = aporte * months;

let bankCapital = 0;
let marketCapital = 0;

let bankRate = bank / 100 / 12;
let marketRate = market / 100 / 12;
  
let ahorroData = [];
let bankData = [];
let marketData = [];

for(let i=0; i<months; i++){

bankCapital = bankCapital * (1 + bankRate);
bankCapital = bankCapital + Number(aporte);

marketCapital = marketCapital * (1 + marketRate);
marketCapital = marketCapital + Number(aporte);

ahorroData.push(aporte * (i+1));
bankData.push(bankCapital);
marketData.push(marketCapital);

}

document.getElementById("ahorroCard").innerHTML =
`<h3>Ahorro</h3>${formatoCLP(ahorro)}`;

document.getElementById("bancoCard").innerHTML =
`<h3>Banco</h3>${formatoCLP(bankCapital)}`;

document.getElementById("mercadoCard").innerHTML =
`<h3>Mercado</h3>${formatoCLP(marketCapital)}`;

let ctx = document.getElementById("grafico").getContext("2d");

new Chart(ctx, {

type: "line",

data: {

labels: ahorroData.map((_,i)=>i+1),

datasets: [

{
label: "Ahorro sin interés",
data: ahorroData
},

{
label: "Banco",
data: bankData
},

{
label: "Mercado",
data: marketData
}

]

}

});
}
