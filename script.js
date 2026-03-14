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

let aporteTotal = aporte * months;

let gananciaBanco = bankCapital - aporteTotal;
let gananciaMercado = marketCapital - aporteTotal;

let ahorroCard = document.getElementById("ahorroCard");
let bancoCard = document.getElementById("bancoCard");
let mercadoCard = document.getElementById("mercadoCard");

if(!ahorroCard || !bancoCard || !mercadoCard){
console.error("No se encontraron las tarjetas en el HTML");
return;
}
  
ahorroCard.innerHTML =
`<h3>Ahorro simple</h3>
<p>Total: ${formatoCLP(aporteTotal)}</p>`;

bancoCard.innerHTML =
`<h3>Banco</h3>
<p>Total: ${formatoCLP(bankCapital)}</p>
<p>Interés ganado: ${formatoCLP(gananciaBanco)}</p>`;

mercadoCard.innerHTML =
`<h3>Mercado</h3>
<p>Total: ${formatoCLP(marketCapital)}</p>
<p>Interés ganado: ${formatoCLP(gananciaMercado)}</p>`;
  
let ctx = document.getElementById("grafico").getContext("2d");

window.miGrafico = new Chart(ctx, {

type: "line",

data: {

labels: ahorroData.map((_,i)=>i+1),

datasets: [

{
label: "Ahorro sin interés",
data: ahorroData,
borderColor: "#ef4444",
backgroundColor: "#ef444420",
borderWidth: 3,
tension: 0.3
},

{
label: "Banco",
data: bankData,
borderColor: "#3b82f6",
backgroundColor: "#3b82f620",
borderWidth: 3,
tension: 0.3
},

{
label: "Mercado",
data: marketData,
borderColor: "#22c55e",
backgroundColor: "#22c55e20",
borderWidth: 3,
tension: 0.3
}

]

},

options: {

responsive:true,

plugins:{
legend:{
position:"top"
}
}

}

});

}
