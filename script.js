function formatearInputCLP(input){

let valor = input.value.replace(/\./g,"").replace(/\D/g,"");

if(valor === ""){
input.value = "";
return;
}

input.value = Number(valor).toLocaleString("es-CL");

}

function formatoCLP(valor){

return new Intl.NumberFormat('es-CL', {
style: 'currency',
currency: 'CLP',
minimumFractionDigits: 0
}).format(valor);

}

function simular(){

let aporte = Number(
document.getElementById("monthly").value.replace(/\./g,"")
);
let years = Number(document.getElementById("years").value);
let bank = Number(document.getElementById("bank").value);
let market = Number(document.getElementById("market").value);

let months = years * 12;

let ahorro = aporte * months;

let bankCapital = 0;
let marketCapital = 0;

let bankRate = bank / 100 / 12;
let marketRate = market / 100 / 12;
let volatilidad = 0.02; // 2%

let marketUpperRate = (market/100 + volatilidad) / 12;
let marketLowerRate = (market/100 - volatilidad) / 12;

let marketUpperCapital = 0;
let marketLowerCapital = 0;

let ahorroData = [];
let bankData = [];
let marketData = [];
let marketUpper = [];
let marketLower = [];

for(let i=0; i<months; i++){

bankCapital = bankCapital * (1 + bankRate);
bankCapital = bankCapital + Number(aporte);

marketCapital = marketCapital * (1 + marketRate);
marketCapital = marketCapital + Number(aporte);

marketUpperCapital = marketUpperCapital * (1 + marketUpperRate);
marketUpperCapital = marketUpperCapital + aporte;

marketLowerCapital = marketLowerCapital * (1 + marketLowerRate);
marketLowerCapital = marketLowerCapital + aporte;

marketUpper.push(marketUpperCapital);
marketLower.push(marketLowerCapital);

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
`<h3>💰 Ahorro simple</h3>
<p>Total: <strong>${formatoCLP(aporteTotal)}</strong></p>`;

bancoCard.innerHTML =
`<h3>🏦 Banco</h3>
<p>Total: <strong>${formatoCLP(bankCapital)}</strong></p>
<p>Interés ganado: ${formatoCLP(gananciaBanco)}</p>`;

mercadoCard.innerHTML =
`<h3>📈 Mercado</h3>
<p>Total: <strong>${formatoCLP(marketCapital)}</strong></p>
<p>Interés ganado: ${formatoCLP(gananciaMercado)}</p>`;
  
let ctx = document.getElementById("grafico").getContext("2d");

if(window.miGrafico){
window.miGrafico.destroy();
}
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
},

{
label: "Mercado escenario alto",
data: marketUpper,
borderColor: "#22c55e66",
borderWidth: 2,
borderDash: [6,6],
tension: 0.3,
fill: {
target: 4,
above: "rgba(34,197,94,0.15)"
}
},
{
label: "Mercado escenario bajo",
data: marketLower,
borderColor: "#22c55e55",
borderWidth: 1,
tension: 0.3
}

]

},

options: {

responsive: true,

animation:{
duration:2000,
easing:"easeOutQuart"
},

interaction:{
mode: "index",
intersect: false
},

plugins:{

legend:{
position:"top",
labels:{
font:{
size:14
}
}
},

tooltip:{
callbacks:{
label:function(context){
return context.dataset.label + ": " + formatoCLP(context.raw);
}
}
}

},

scales: {

x: {
title: {
display: true,
text: "Meses de inversión"
},
grid:{
display:false
}
},

y: {
title: {
display: true,
text: "Capital acumulado"
},

ticks:{
callback: function(value){
return formatoCLP(value);
}
}
}

}

}

}
});
