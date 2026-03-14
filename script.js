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

let bankCapital = 0;
let marketCapital = 0;

let bankRate = bank / 100 / 12;
let marketRate = market / 100 / 12;

let ahorroData = [];
let bankData = [];
let marketData = [];

for(let i=0;i<months;i++){

bankCapital = bankCapital * (1 + bankRate) + aporte;
marketCapital = marketCapital * (1 + marketRate) + aporte;

ahorroData.push(aporte * (i+1));
bankData.push(bankCapital);
marketData.push(marketCapital);

}

let aporteTotal = aporte * months;

let gananciaBanco = bankCapital - aporteTotal;
let gananciaMercado = marketCapital - aporteTotal;

document.getElementById("ahorroCard").innerHTML =
`<h3>💰 Ahorro simple</h3>
<p>Total: <strong>${formatoCLP(aporteTotal)}</strong></p>`;

document.getElementById("bancoCard").innerHTML =
`<h3>🏦 Banco</h3>
<p>Total: <strong>${formatoCLP(bankCapital)}</strong></p>
<p>Interés ganado: ${formatoCLP(gananciaBanco)}</p>`;

document.getElementById("mercadoCard").innerHTML =
`<h3>📈 Mercado</h3>
<p>Total: <strong>${formatoCLP(marketCapital)}</strong></p>
<p>Interés ganado: ${formatoCLP(gananciaMercado)}</p>`;

let ctx = document.getElementById("grafico").getContext("2d");

if(window.miGrafico){
window.miGrafico.destroy();
}

window.miGrafico = new Chart(ctx,{

type:"line",

data:{
labels: ahorroData.map((_,i)=>i+1),

datasets:[

{
label:"Ahorro",
data: ahorroData
},

{
label:"Banco",
data: bankData
},

{
label:"Mercado",
data: marketData
}

]

},

options:{
responsive:true
}

});

}
